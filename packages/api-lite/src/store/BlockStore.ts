import { promises as fs, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gunzipSync, gzipSync } from 'node:zlib';
import { LRUCache } from 'lru-cache';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import { BlockNotFound } from '../s3/S3BlockSource';

type Opts = {
  source?: { fetchRaw(height: number): Promise<Uint8Array> };
  decode?: (bytes: Uint8Array) => GQLBlock;
  loader?: (height: number) => Promise<GQLBlock | null>;
  normalize?: (block: GQLBlock) => GQLBlock;
  /**
   * Consulted only when `source` says the height is not there (BlockNotFound),
   * so a block the archive has not published yet -- the tip, most often, where
   * the recorder is still uploading -- is fetched from the live node instead
   * of becoming a gap that stops the index advancing. A read that fails for
   * any other reason still throws: a broken archive should surface as itself,
   * not as a silent switch to another source.
   */
  fallback?: (height: number) => Promise<GQLBlock | null>;
  dataDir: string;
  memoryBytes: number;
  diskBytes: number;
  concurrency: number;
  onDecoded?: (block: GQLBlock) => void;
  // Heights disk eviction must never remove even when they're the oldest
  // tracked entries (e.g. blocks referenced by hot accounts/txs); recomputed
  // by the caller on its own schedule, not cached here. A fully (or mostly)
  // pinned cache can therefore sit above `diskBytes` by up to the pinned
  // set's total size -- eviction skips those heights rather than deleting them.
  pinned?: () => Set<number>;
  /**
   * How long one load may hold its inflight slot before it is abandoned.
   * Default 30s; a test can lower it.
   */
  loadTimeoutMs?: number;
};

// A load that never settles used to keep its `inflight` entry forever, so
// every later request for that height was handed the same dead promise and
// the indexer could never make progress past it -- a retry asked for the same
// heights and hung identically. Bounding the slot turns "never settles" into
// "absent", which the callers already handle.
const DEFAULT_LOAD_TIMEOUT_MS = 30_000;

// A decoded GQLBlock's real V8 heap footprint (nested objects/arrays/strings
// for every tx, input, output, receipt) runs well above its
// JSON.stringify() byte length -- measured empirically at ~2.25x via
// scripts/measure-heap-multiplier.ts against real mainnet blocks fetched with
// `pnpm --filter api-lite fixture <height>` (200 held copies each,
// process.memoryUsage().heapUsed delta with --expose-gc). Rounded up to 2.5x
// for headroom. Without this, the LRU's `memoryBytes` budget bounds only the
// serialized size, not the real heap it costs to hold those objects, so a
// "128 MB" cache can retain several times that in actual heap -- this is
// what pushed the container over its --max-old-space-size during backfill
// (see docker/vps/Dockerfile.api-lite's comment for the full memory math).
const HEAP_BYTES_MULTIPLIER = 2.5;

// How often evictOverflow's "skipped N pinned height(s)" line may log. A
// pinned-heavy cache during heavy backfill calls writeDisk (and therefore
// evictOverflow) many times a second; without a rate limit each of those
// calls logs, flooding stdout for no added information (the pinned set
// barely changes between calls -- see PINNED_RECOMPUTE_INTERVAL_MS in
// main.ts, which only recomputes it once a minute).
const PINNED_SKIP_LOG_INTERVAL_MS = 60_000;

// The archive can be missing a run of heights -- a bucket that lags, or one
// misconfigured so that nothing is ever found, in which case every read falls
// back. A line per height drowns the service log, so fallbacks are summarised
// at most this often.
const FALLBACK_LOG_INTERVAL_MS = 60_000;

export class BlockStore {
  private readonly memory: LRUCache<number, GQLBlock>;
  private readonly memorySizes = new Map<number, number>();
  private readonly inflight = new Map<number, Promise<GQLBlock | null>>();
  private readonly blocksDir: string;
  // Insertion-ordered: oldest write is always first. Kept in sync with disk by
  // writeDisk (add/update) and evictOverflow/evictDisk (remove), so eviction
  // never needs to re-stat the directory on the hot path.
  private readonly diskSizes = new Map<number, number>();
  private diskBytesTotal = 0;
  private lastPinnedSkipLogAt = 0;
  private lastFallbackLogAt = 0;
  private fallbacksSinceLog = 0;

  constructor(readonly opts: Opts) {
    this.memory = new LRUCache<number, GQLBlock>({
      maxSize: opts.memoryBytes,
      // Every call site that inserts into `memory` (load()'s two paths)
      // stringifies the block exactly once and records the byte length in
      // `memorySizes` before calling memory.set, so this just reads it back
      // instead of paying for a second JSON.stringify of the same block.
      // The `?? ...` fallback only matters if that invariant is ever broken;
      // it reproduces the old always-stringify behaviour rather than
      // silently under-counting the entry.
      sizeCalculation: (b, key) => {
        let raw = this.memorySizes.get(key);
        if (raw == null) {
          raw = Math.max(1, Buffer.byteLength(JSON.stringify(b)));
          this.memorySizes.set(key, raw);
        }
        // sizeOf() (and charts.ts's blockSize(), which falls back to it)
        // report the block's real serialized size to users, so the raw,
        // un-multiplied value is what's stored in `memorySizes` -- only the
        // value returned below (which the LRU compares against
        // `memoryBytes`) is heap-adjusted.
        return Math.max(1, Math.round(raw * HEAP_BYTES_MULTIPLIER));
      },
      dispose: (_v, key) => {
        this.memorySizes.delete(key);
      },
    });
    this.blocksDir = join(opts.dataDir, 'blocks');
    mkdirSync(this.blocksDir, { recursive: true });
    this.scanDiskBytesSync();
  }

  // Synchronous on-disk scan run once at construction so the running byte
  // total starts accurate for whatever the volume already holds (e.g. after
  // a restart). Only `<digits>.json` and `<digits>.json.gz` files count;
  // `.tmp` files from an interrupted write are ignored. A height can briefly
  // have both extensions on disk (a crash between writeDisk's rename and its
  // legacy unlink), so entries are grouped by height with sizes summed;
  // mtime is the max of the group so a just-rewritten height still sorts as
  // recent even though its stale legacy file is older.
  private scanDiskBytesSync(): void {
    let names: string[];
    try {
      names = readdirSync(this.blocksDir);
    } catch {
      return;
    }
    const groups = new Map<number, { size: number; mtime: number }>();
    for (const n of names) {
      const m = /^(\d+)\.json(\.gz)?$/.exec(n);
      if (!m) continue;
      try {
        const st = statSync(join(this.blocksDir, n));
        const height = Number(m[1]);
        const g = groups.get(height);
        if (g) {
          g.size += st.size;
          g.mtime = Math.max(g.mtime, st.mtimeMs);
        } else {
          groups.set(height, { size: st.size, mtime: st.mtimeMs });
        }
      } catch {
        /* removed between readdir and stat */
      }
    }
    const entries = [...groups.entries()]
      .map(([height, g]) => ({ height, ...g }))
      .sort((a, b) => a.mtime - b.mtime);
    for (const e of entries) {
      this.diskSizes.set(e.height, e.size);
      this.diskBytesTotal += e.size;
    }
  }

  /** Byte size of the cached in-memory copy of `height`, if any (backs analytics' size reporting). */
  sizeOf(height: number): number | undefined {
    return this.memorySizes.get(height);
  }

  cached(): GQLBlock[] {
    return [...this.memory.values()].sort(
      (a, b) => Number(b.height) - Number(a.height),
    );
  }

  async get(height: number): Promise<GQLBlock | null> {
    const hit = this.memory.get(height);
    if (hit) return hit;
    const pending = this.inflight.get(height);
    if (pending) return pending;
    const timeoutMs = this.opts.loadTimeoutMs ?? DEFAULT_LOAD_TIMEOUT_MS;
    let timer: NodeJS.Timeout | undefined;
    const p = Promise.race([
      this.load(height),
      new Promise<null>((resolve) => {
        timer = setTimeout(() => {
          console.error(
            `BlockStore: load of height ${height} exceeded ${timeoutMs}ms, abandoning it so a later request starts a fresh load`,
          );
          resolve(null);
        }, timeoutMs);
      }),
    ]).finally(() => {
      if (timer) clearTimeout(timer);
      // Only clear our own slot: a load that outlived its timeout and settles
      // late must not evict the fresh load a later caller has started.
      if (this.inflight.get(height) === p) this.inflight.delete(height);
    });
    this.inflight.set(height, p);
    return p;
  }

  async getRange(from: number, to: number): Promise<(GQLBlock | null)[]> {
    const heights: number[] = [];
    for (let h = from; h <= to; h++) heights.push(h);
    const out: (GQLBlock | null)[] = new Array(heights.length).fill(null);
    let next = 0;
    const worker = async () => {
      while (next < heights.length) {
        const i = next++;
        try {
          out[i] = await this.get(heights[i]);
        } catch (e) {
          console.error(
            `BlockStore.getRange: height ${heights[i]} failed, storing null`,
            e,
          );
          out[i] = null;
        }
      }
    };
    await Promise.all(
      Array.from(
        { length: Math.min(this.opts.concurrency, heights.length) },
        worker,
      ),
    );
    return out;
  }

  patchConsensus(height: number, signature: string): void {
    const block = this.memory.get(height);
    if (!block) return;
    (
      block as unknown as {
        consensus: { __typename: string; signature: string };
      }
    ).consensus = {
      __typename: 'PoAConsensus',
      signature,
    };
    this.writeDisk(height, JSON.stringify(block)).catch((e) =>
      console.error('BlockStore.patchConsensus: writeDisk failed', e),
    );
  }

  // Backstop: re-derives the tracked total from what's actually on disk (in
  // case anything drifted) before evicting. Safe to call on an interval and
  // once at boot; the hot path (writeDisk) evicts synchronously on its own
  // and does not depend on this running.
  async evictDisk(): Promise<number> {
    const names = await fs.readdir(this.blocksDir);
    const stats = await Promise.all(
      names.map(async (n) => {
        const m = /^(\d+)\.json(\.gz)?$/.exec(n);
        if (!m) return null;
        try {
          const st = await fs.stat(join(this.blocksDir, n));
          return { height: Number(m[1]), size: st.size, mtime: st.mtimeMs };
        } catch {
          return null;
        }
      }),
    );
    // A height can briefly have both `.json` and `.json.gz` on disk (a crash
    // between writeDisk's rename and its legacy unlink), so group by height
    // with sizes summed rather than letting the second entry overwrite the
    // first; mtime is the max of the group.
    const groups = new Map<number, { size: number; mtime: number }>();
    for (const e of stats) {
      if (!e) continue;
      const g = groups.get(e.height);
      if (g) {
        g.size += e.size;
        g.mtime = Math.max(g.mtime, e.mtime);
      } else {
        groups.set(e.height, { size: e.size, mtime: e.mtime });
      }
    }
    const entries = [...groups.entries()]
      .map(([height, g]) => ({ height, ...g }))
      .sort((a, b) => a.mtime - b.mtime);
    this.diskSizes.clear();
    this.diskBytesTotal = 0;
    for (const e of entries) {
      this.diskSizes.set(e.height, e.size);
      this.diskBytesTotal += e.size;
    }
    const before = this.diskSizes.size;
    await this.evictOverflow();
    return before - this.diskSizes.size;
  }

  // Evicts the oldest tracked disk entries (insertion order in `diskSizes`)
  // until the running total is back under `diskBytes`. Never evicts down to
  // zero entries, so a single block larger than `diskBytes` is still kept.
  // Heights in `opts.pinned()` are skipped in place (eviction moves on to the
  // next-oldest unpinned entry) rather than being counted toward the floor.
  private async evictOverflow(): Promise<void> {
    const pinned = this.opts.pinned?.();
    let skipped = 0;
    // Deleting the current key mid-iteration is safe: Map's iterator still
    // visits every not-yet-seen key in insertion order.
    for (const [height, size] of this.diskSizes) {
      if (
        this.diskBytesTotal <= this.opts.diskBytes ||
        this.diskSizes.size <= 1
      )
        break;
      if (pinned?.has(height)) {
        skipped += 1;
        continue;
      }
      this.diskSizes.delete(height);
      this.diskBytesTotal -= size;
      try {
        await fs.unlink(this.gzPath(height));
      } catch {
        /* already gone */
      }
      try {
        await fs.unlink(this.legacyPath(height));
      } catch {
        /* already gone */
      }
    }
    if (skipped > 0) {
      const now = Date.now();
      if (now - this.lastPinnedSkipLogAt >= PINNED_SKIP_LOG_INTERVAL_MS) {
        this.lastPinnedSkipLogAt = now;
        console.log(
          `BlockStore: eviction pass skipped ${skipped} pinned height(s)`,
        );
      }
    }
  }

  private gzPath(height: number) {
    return join(this.blocksDir, `${height}.json.gz`);
  }

  private legacyPath(height: number) {
    return join(this.blocksDir, `${height}.json`);
  }

  private async load(height: number): Promise<GQLBlock | null> {
    const disk = await this.readDisk(height);
    if (disk) {
      if (this.opts.normalize) {
        // normalize can grow the block (e.g. withStatusBlock adds a `block`
        // ref to every tx status), so the pre-normalize disk string no
        // longer describes the cached object's size -- this is the first
        // stringify of the normalized object, not a second one.
        const fromDisk = this.opts.normalize(disk.block);
        const json = JSON.stringify(fromDisk);
        this.memorySizes.set(height, Buffer.byteLength(json));
        this.memory.set(height, fromDisk);
        return fromDisk;
      }
      // Already decompressed to a string in readDisk -- reuse its byte
      // length instead of stringifying the parsed object again.
      this.memorySizes.set(height, Buffer.byteLength(disk.json));
      this.memory.set(height, disk.block);
      return disk.block;
    }
    const block = this.opts.loader
      ? await this.opts.loader(height)
      : await this.loadFromSource(height);
    if (!block) return null;
    // Stringified once and reused for both size accounting and the disk
    // write below, instead of once per use on the request thread.
    const json = JSON.stringify(block);
    this.memorySizes.set(height, Buffer.byteLength(json));
    this.memory.set(height, block);
    // onDecoded (index write) runs before writeDisk (disk cache write) so a
    // crash in between leaves the safe failure mode: no disk-cached file, so
    // the next `get(height)` re-fetches and re-indexes -- rather than a
    // disk-cached file with no index row, which would never be retried for a
    // pinned height (readDisk hits on disk-cache below, which never calls
    // onDecoded), permanently skipping that height's index. writeBlock is
    // INSERT OR IGNORE per row (see index/Index.ts), so re-indexing the same
    // block on a later re-fetch is a no-op, not a duplicate.
    this.opts.onDecoded?.(block);
    await this.writeDisk(height, json);
    return block;
  }

  private async loadFromSource(height: number): Promise<GQLBlock | null> {
    const { source, decode } = this.opts;
    if (!source || !decode) {
      throw new Error('BlockStore needs a loader or a source and a decoder');
    }
    let bytes: Uint8Array;
    const s3Start = process.env.LOG_S3 === '1' ? Date.now() : 0;
    try {
      bytes = await source.fetchRaw(height);
    } catch (e) {
      if (process.env.LOG_S3 === '1')
        console.log(`s3 GET ${height} ${Date.now() - s3Start}ms (error)`);
      if (e instanceof BlockNotFound) {
        if (!this.opts.fallback) return null;
        this.noteFallback(height);
        return this.opts.fallback(height);
      }
      throw e;
    }
    if (process.env.LOG_S3 === '1')
      console.log(`s3 GET ${height} ${Date.now() - s3Start}ms`);
    return decode(bytes);
  }

  /**
   * Summarises fallbacks rather than logging one per block: a lagging bucket,
   * or a misconfigured one where nothing is ever found, misses a whole run of
   * heights, and a line each would drown the service log without adding
   * anything the count does not already say.
   */
  private noteFallback(height: number) {
    const now = Date.now();
    this.fallbacksSinceLog++;
    if (now - this.lastFallbackLogAt < FALLBACK_LOG_INTERVAL_MS) return;
    const sinceLast = this.fallbacksSinceLog - 1;
    console.log(
      `archive missing block ${height}${sinceLast > 0 ? ` (and ${sinceLast} more)` : ''}, falling back to the node`,
    );
    this.lastFallbackLogAt = now;
    this.fallbacksSinceLog = 0;
  }

  // Returns both the parsed block and the exact JSON string it was parsed
  // from, so a disk-hit caller with no normalize step can reuse that string
  // for size accounting instead of stringifying the parsed object again.
  private async readDisk(
    height: number,
  ): Promise<{ block: GQLBlock; json: string } | null> {
    try {
      const gz = await fs.readFile(this.gzPath(height));
      const json = gunzipSync(gz).toString('utf8');
      return { block: JSON.parse(json) as GQLBlock, json };
    } catch {
      /* fall through to the legacy uncompressed path */
    }
    try {
      const json = await fs.readFile(this.legacyPath(height), 'utf8');
      return { block: JSON.parse(json) as GQLBlock, json };
    } catch {
      return null;
    }
  }

  private async writeDisk(height: number, json: string) {
    // Level 1 (fastest, least compression): this runs synchronously on the
    // request thread for every new block, and the size difference against
    // the default level 6 does not justify the CPU it costs here.
    const gz = gzipSync(json, { level: 1 });
    const size = gz.length;
    const tmp = `${this.gzPath(height)}.tmp`;
    await fs.writeFile(tmp, gz);
    await fs.rename(tmp, this.gzPath(height));
    try {
      await fs.unlink(this.legacyPath(height));
    } catch {
      /* no legacy file for this height */
    }
    // Re-inserting on an existing key moves it to the end (most-recently-written)
    // so oldest-first eviction below stays accurate for rewrites (e.g. patchConsensus).
    const prevSize = this.diskSizes.get(height);
    if (prevSize != null) {
      this.diskSizes.delete(height);
      this.diskBytesTotal -= prevSize;
    }
    this.diskSizes.set(height, size);
    this.diskBytesTotal += size;
    await this.evictOverflow();
  }
}
