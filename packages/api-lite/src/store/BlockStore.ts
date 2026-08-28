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
  dataDir: string;
  memoryBytes: number;
  diskBytes: number;
  concurrency: number;
  onDecoded?: (block: GQLBlock) => void;
};

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

  constructor(readonly opts: Opts) {
    this.memory = new LRUCache<number, GQLBlock>({
      maxSize: opts.memoryBytes,
      sizeCalculation: (b, key) => {
        const size = Math.max(1, Buffer.byteLength(JSON.stringify(b)));
        this.memorySizes.set(key, size);
        return size;
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
    const p = this.load(height).finally(() => this.inflight.delete(height));
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
    this.writeDisk(height, block).catch((e) =>
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
  private async evictOverflow(): Promise<void> {
    while (
      this.diskBytesTotal > this.opts.diskBytes &&
      this.diskSizes.size > 1
    ) {
      const oldest = this.diskSizes.keys().next();
      if (oldest.done) break;
      const height = oldest.value;
      const size = this.diskSizes.get(height)!;
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
  }

  private gzPath(height: number) {
    return join(this.blocksDir, `${height}.json.gz`);
  }

  private legacyPath(height: number) {
    return join(this.blocksDir, `${height}.json`);
  }

  private async load(height: number): Promise<GQLBlock | null> {
    const fromDisk = await this.readDisk(height);
    if (fromDisk) {
      this.memory.set(height, fromDisk);
      return fromDisk;
    }
    const block = this.opts.loader
      ? await this.opts.loader(height)
      : await this.loadFromSource(height);
    if (!block) return null;
    this.memory.set(height, block);
    await this.writeDisk(height, block);
    this.opts.onDecoded?.(block);
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
      if (e instanceof BlockNotFound) return null;
      throw e;
    }
    if (process.env.LOG_S3 === '1')
      console.log(`s3 GET ${height} ${Date.now() - s3Start}ms`);
    return decode(bytes);
  }

  private async readDisk(height: number): Promise<GQLBlock | null> {
    try {
      const gz = await fs.readFile(this.gzPath(height));
      return JSON.parse(gunzipSync(gz).toString('utf8')) as GQLBlock;
    } catch {
      /* fall through to the legacy uncompressed path */
    }
    try {
      return JSON.parse(
        await fs.readFile(this.legacyPath(height), 'utf8'),
      ) as GQLBlock;
    } catch {
      return null;
    }
  }

  private async writeDisk(height: number, block: GQLBlock) {
    const gz = gzipSync(JSON.stringify(block));
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
