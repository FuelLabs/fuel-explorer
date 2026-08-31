import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gunzipSync, gzipSync } from 'node:zlib';
import { BlockNotFound } from '../s3/S3BlockSource';
import { BlockStore } from './BlockStore';

function fakeBlock(height: number, pad = 0) {
  return {
    __typename: 'Block',
    id: `0x${height.toString(16).padStart(64, '0')}`,
    height: String(height),
    header: { height: String(height), time: '0' },
    transactions: [],
    pad: 'x'.repeat(pad),
  } as any;
}

function makeStore(
  overrides: Partial<ConstructorParameters<typeof BlockStore>[0]> = {},
) {
  const calls: number[] = [];
  const store = new BlockStore({
    source: {
      fetchRaw: async (h) => {
        calls.push(h);
        if (h === 404) throw new BlockNotFound(h);
        return new Uint8Array([h & 0xff]);
      },
    },
    decode: (bytes) => fakeBlock(bytes[0]),
    dataDir: mkdtempSync(join(tmpdir(), 'bs-')),
    memoryBytes: 10_000,
    diskBytes: 10_000_000,
    concurrency: 4,
    ...overrides,
  });
  return { store, calls };
}

describe('BlockStore', () => {
  it('fetches once then serves from memory', async () => {
    const { store, calls } = makeStore();
    expect((await store.get(7))?.height).toBe('7');
    expect((await store.get(7))?.height).toBe('7');
    expect(calls).toEqual([7]);
  });

  it('returns null for missing', async () => {
    const { store } = makeStore();
    expect(await store.get(404)).toBeNull();
  });

  it('serves from disk after memory eviction', async () => {
    const { store, calls } = makeStore({
      decode: (bytes) => fakeBlock(bytes[0], 6000),
    });
    await store.get(1);
    await store.get(2);
    await store.get(1);
    expect(calls).toEqual([1, 2]);
    expect(
      readdirSync(join((store as any).opts.dataDir, 'blocks')).sort(),
    ).toEqual(['1.json.gz', '2.json.gz']);
  });

  it('writeDisk gzips to <height>.json.gz and readDisk gunzips it back', async () => {
    const { store } = makeStore();
    const decoded = await store.get(42);
    expect(decoded?.height).toBe('42');
    const dataDir = (store as any).opts.dataDir;
    const blocksDir = join(dataDir, 'blocks');
    expect(readdirSync(blocksDir)).toEqual(['42.json.gz']);
    const raw = readFileSync(join(blocksDir, '42.json.gz'));
    expect(() => JSON.parse(raw.toString('utf8'))).toThrow();
    const gunzipped = JSON.parse(gunzipSync(raw).toString('utf8'));
    expect(gunzipped.height).toBe('42');
  });

  it('reads a legacy plain .json file from disk without refetching', async () => {
    const dataDir = mkdtempSync(join(tmpdir(), 'bs-legacy-'));
    mkdirSync(join(dataDir, 'blocks'), { recursive: true });
    writeFileSync(
      join(dataDir, 'blocks', '55.json'),
      JSON.stringify(fakeBlock(55)),
    );
    const { store } = makeStore({
      dataDir,
      source: {
        fetchRaw: async () => {
          throw new Error('should not refetch');
        },
      },
    });
    const block = await store.get(55);
    expect(block?.height).toBe('55');
  });

  it('evicts oldest-first across mixed .json and .json.gz extensions', async () => {
    const dataDir = mkdtempSync(join(tmpdir(), 'bs-mixed-'));
    const blocksDir = join(dataDir, 'blocks');
    mkdirSync(blocksDir, { recursive: true });
    writeFileSync(join(blocksDir, '1.json'), JSON.stringify(fakeBlock(1)));
    writeFileSync(
      join(blocksDir, '2.json.gz'),
      gzipSync(JSON.stringify(fakeBlock(2))),
    );
    const { store } = makeStore({ dataDir, diskBytes: 1 });
    await store.get(100);
    expect(readdirSync(blocksDir).sort()).toEqual(['100.json.gz']);
  });

  it('sums both files for a height that has both extensions on disk, and evicts them together', async () => {
    const dataDir = mkdtempSync(join(tmpdir(), 'bs-dup-'));
    const blocksDir = join(dataDir, 'blocks');
    mkdirSync(blocksDir, { recursive: true });
    writeFileSync(join(blocksDir, '5.json'), JSON.stringify(fakeBlock(5)));
    writeFileSync(
      join(blocksDir, '5.json.gz'),
      gzipSync(JSON.stringify(fakeBlock(5))),
    );
    const sum5 =
      statSync(join(blocksDir, '5.json')).size +
      statSync(join(blocksDir, '5.json.gz')).size;
    const { store } = makeStore({ dataDir, diskBytes: sum5 + 1 });
    expect((store as any).diskBytesTotal).toBe(sum5);
    await store.get(6); // pushes the total over cap, evicting height 5 (the only tracked entry)
    const files = readdirSync(blocksDir).sort();
    expect(files).not.toContain('5.json');
    expect(files).not.toContain('5.json.gz');
    expect(files).toEqual(['6.json.gz']);
  });

  it('evictOverflow skips a pinned height, evicting the next oldest unpinned entry instead, and logs how many were skipped', async () => {
    const dataDir = mkdtempSync(join(tmpdir(), 'bs-pinned-'));
    const blocksDir = join(dataDir, 'blocks');
    mkdirSync(blocksDir, { recursive: true });
    const gzSize = (h: number) => gzipSync(JSON.stringify(fakeBlock(h))).length;
    writeFileSync(
      join(blocksDir, '1.json.gz'),
      gzipSync(JSON.stringify(fakeBlock(1))),
    );
    writeFileSync(
      join(blocksDir, '2.json.gz'),
      gzipSync(JSON.stringify(fakeBlock(2))),
    );
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { store } = makeStore({
      dataDir,
      diskBytes: gzSize(1) + gzSize(100) + 5,
      pinned: () => new Set([1]),
    });
    await store.get(100);
    const files = readdirSync(blocksDir).sort();
    expect(files).toEqual(['1.json.gz', '100.json.gz']);
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('skipped 1 pinned'),
    );
    logSpy.mockRestore();
  });

  it('evictDisk backstop also honors pinned heights', async () => {
    const gzSize = (h: number) => gzipSync(JSON.stringify(fakeBlock(h))).length;
    const { store } = makeStore({
      diskBytes: gzSize(1) + gzSize(3) + 5,
      memoryBytes: 1,
      pinned: () => new Set([1]),
    });
    await store.get(1);
    await store.get(2);
    await store.get(3);
    await store.evictDisk();
    const files = readdirSync(
      join((store as any).opts.dataDir, 'blocks'),
    ).sort();
    expect(files).toContain('1.json.gz');
  });

  it('evictOverflow is a safe no-op when every cached height is pinned, even above diskBytes; unpinning one lets the next pass evict it', async () => {
    const dataDir = mkdtempSync(join(tmpdir(), 'bs-allpinned-'));
    const blocksDir = join(dataDir, 'blocks');
    mkdirSync(blocksDir, { recursive: true });
    writeFileSync(
      join(blocksDir, '1.json.gz'),
      gzipSync(JSON.stringify(fakeBlock(1))),
    );
    writeFileSync(
      join(blocksDir, '2.json.gz'),
      gzipSync(JSON.stringify(fakeBlock(2))),
    );
    writeFileSync(
      join(blocksDir, '3.json.gz'),
      gzipSync(JSON.stringify(fakeBlock(3))),
    );
    const pinnedSet = new Set([1, 2, 3]);
    const { store } = makeStore({
      dataDir,
      diskBytes: 1, // every entry is pinned, so the cache can never shrink to this
      pinned: () => pinnedSet,
    });

    const removed = await store.evictDisk();
    expect(removed).toBe(0);
    expect(readdirSync(blocksDir).sort()).toEqual([
      '1.json.gz',
      '2.json.gz',
      '3.json.gz',
    ]);
    expect((store as any).diskBytesTotal).toBeGreaterThan(
      (store as any).opts.diskBytes,
    );

    // Unpin height 1: the next eviction pass can now bring the cache down.
    pinnedSet.delete(1);
    await store.evictDisk();
    const files = readdirSync(blocksDir).sort();
    expect(files).not.toContain('1.json.gz');
  });

  it('getRange keeps order and fires onDecoded per decode', async () => {
    const seen: number[] = [];
    const { store } = makeStore({
      onDecoded: (b) => seen.push(Number(b.height)),
    });
    const blocks = await store.getRange(10, 13);
    expect(blocks.map((b) => b?.height)).toEqual(['10', '11', '12', '13']);
    expect(seen.sort()).toEqual([10, 11, 12, 13]);
    await store.get(10);
    expect(seen).toHaveLength(4);
  });

  // A crash between the index write (onDecoded) and the disk-cache write
  // (writeDisk) must leave "not yet indexed, not yet disk-cached" -- so the
  // next get() re-fetches and re-indexes -- rather than "disk-cached but
  // never indexed", which would be permanent for a pinned height (see the
  // disk-cache-hit test below: a disk hit never calls onDecoded again).
  it('onDecoded fires before the block is written to disk', async () => {
    const dataDir = mkdtempSync(join(tmpdir(), 'bs-order-'));
    const gzPath = join(dataDir, 'blocks', '9.json.gz');
    let existedAtOnDecoded: boolean | undefined;
    const { store } = makeStore({
      dataDir,
      onDecoded: () => {
        existedAtOnDecoded = existsSync(gzPath);
      },
    });
    await store.get(9);
    expect(existedAtOnDecoded).toBe(false);
    expect(existsSync(gzPath)).toBe(true);
  });

  // Documents an invariant the caller (Indexer.writeOnly, wired as
  // BlockStore's onDecoded) relies on: a disk-cache hit in load() returns
  // early and never calls onDecoded, since that height was already indexed
  // the first time it was fetched and decoded.
  it('does not fire onDecoded on a disk-cache hit, only on the fetch/decode that first wrote the file', async () => {
    const seen: number[] = [];
    const { store } = makeStore({
      decode: (bytes) => fakeBlock(bytes[0], 6000),
      onDecoded: (b) => seen.push(Number(b.height)),
    });
    await store.get(1);
    await store.get(2); // evicts 1 from the small in-memory cache
    expect(seen).toEqual([1, 2]);
    await store.get(1); // memory miss -> disk hit, must not re-fire onDecoded
    expect(seen).toEqual([1, 2]);
  });

  it('cached() is newest first', async () => {
    const { store } = makeStore();
    await store.getRange(1, 3);
    expect(store.cached().map((b) => b.height)).toEqual(['3', '2', '1']);
  });

  it('patchConsensus updates the cached block in memory and rewrites disk', async () => {
    const { store } = makeStore();
    await store.get(5);
    store.patchConsensus(5, '0xabc');
    expect((await store.get(5))?.consensus).toEqual({
      __typename: 'PoAConsensus',
      signature: '0xabc',
    });
    // Disk write is fire-and-forget; give it a tick before reading the file back via a fresh store.
    await new Promise((r) => setTimeout(r, 20));
    const dataDir = (store as any).opts.dataDir;
    const { store: reloaded } = makeStore({
      dataDir,
      source: {
        fetchRaw: async () => {
          throw new Error('should not refetch');
        },
      },
    });
    expect((await reloaded.get(5))?.consensus).toEqual({
      __typename: 'PoAConsensus',
      signature: '0xabc',
    });
  });

  it('patchConsensus is a no-op when the height is not cached', async () => {
    const { store } = makeStore();
    expect(() => store.patchConsensus(999, '0xabc')).not.toThrow();
  });

  describe('with a loader (rpc source)', () => {
    function makeLoaderStore(
      overrides: Partial<ConstructorParameters<typeof BlockStore>[0]> = {},
    ) {
      const calls: number[] = [];
      const store = new BlockStore({
        loader: async (h) => {
          calls.push(h);
          if (h === 404) return null;
          return fakeBlock(h);
        },
        dataDir: mkdtempSync(join(tmpdir(), 'bs-loader-')),
        memoryBytes: 10_000,
        diskBytes: 10_000_000,
        concurrency: 4,
        ...overrides,
      });
      return { store, calls };
    }

    it('uses the loader instead of source.fetchRaw + decode, caching to memory and disk', async () => {
      const { store, calls } = makeLoaderStore();
      expect((await store.get(7))?.height).toBe('7');
      expect((await store.get(7))?.height).toBe('7');
      expect(calls).toEqual([7]);
      expect(readdirSync(join((store as any).opts.dataDir, 'blocks'))).toEqual([
        '7.json.gz',
      ]);
    });

    it('returns null when the loader returns null', async () => {
      const { store } = makeLoaderStore();
      expect(await store.get(404)).toBeNull();
    });

    it('fires onDecoded when the loader supplies a block', async () => {
      const seen: number[] = [];
      const { store } = makeLoaderStore({
        onDecoded: (b) => seen.push(Number(b.height)),
      });
      await store.get(9);
      expect(seen).toEqual([9]);
    });
  });

  it('evictDisk is a no-op backstop once writeDisk has already kept the store under cap', async () => {
    // writeDisk evicts synchronously as it writes, so by the time an
    // interval/boot call to evictDisk() runs there is normally nothing left
    // to remove; this is exactly that steady-state case.
    const gzSize = (h: number) => gzipSync(JSON.stringify(fakeBlock(h))).length;
    const { store } = makeStore({
      diskBytes: gzSize(2) + gzSize(3) + 10,
      memoryBytes: 1,
    });
    await store.get(1);
    await store.get(2);
    await store.get(3);
    expect(
      readdirSync(join((store as any).opts.dataDir, 'blocks')),
    ).not.toContain('1.json.gz');
    const removed = await store.evictDisk();
    expect(removed).toBe(0);
  });

  it('evictDisk cleans up files that landed on disk outside the tracked store (drift backstop)', async () => {
    const gzSize = (h: number) => gzipSync(JSON.stringify(fakeBlock(h))).length;
    const { store } = makeStore({
      diskBytes: gzSize(1) + gzSize(2) + 5,
      memoryBytes: 1,
    });
    await store.get(1);
    await store.get(2); // store's own running total is now ~2 blocks, still under cap
    const dataDir = (store as any).opts.dataDir;
    const blocksDir = join(dataDir, 'blocks');
    // Simulate a file written by something other than this store's writeDisk
    // (e.g. left over from a previous process), so the running total never saw it;
    // it pushes the *actual* on-disk total over the cap even though the store
    // still thinks it's fine.
    writeFileSync(
      join(blocksDir, '999.json'),
      JSON.stringify(fakeBlock(999, 3000)),
    );
    const removed = await store.evictDisk();
    expect(removed).toBeGreaterThanOrEqual(1);
  });

  it('writeDisk evicts oldest-first synchronously so the disk total never overshoots diskBytes', async () => {
    const dataDir = mkdtempSync(join(tmpdir(), 'bs-overshoot-'));
    // Gzip output length can vary by a byte or two between otherwise
    // near-identical blocks, so the cap is sized from the actual gzip
    // size of the 3 heights expected to survive rather than assumed equal.
    const gzSize = (h: number) => gzipSync(JSON.stringify(fakeBlock(h))).length;
    const cap = gzSize(102) + gzSize(103) + gzSize(104);
    const { store } = makeStore({ dataDir, diskBytes: cap });
    for (let h = 100; h < 105; h++) await store.get(h);
    const files = readdirSync(join(dataDir, 'blocks'));
    expect(files.length).toBeLessThanOrEqual(3);
    // The 3 most recently written blocks (102, 103, 104) survive; the 2 oldest
    // (100, 101) are evicted as soon as the cap is exceeded, not after the fact.
    expect(files.sort()).toEqual(['102.json.gz', '103.json.gz', '104.json.gz']);
  });

  it('getRange stores null at a failing height and keeps the rest of the range', async () => {
    const { store } = makeStore({
      source: {
        fetchRaw: async (h) => {
          if (h === 12) throw new Error('boom');
          return new Uint8Array([h]);
        },
      },
    });
    const blocks = await store.getRange(10, 14);
    expect(blocks.map((b) => b?.height ?? null)).toEqual([
      '10',
      '11',
      null,
      '13',
      '14',
    ]);
  });
});

describe('BlockStore normalize', () => {
  it('applies normalize to disk hits', async () => {
    const { store } = makeStore();
    await store.get(3);
    const dir = (store as any).opts.dataDir;
    const fresh = new BlockStore({
      ...(store as any).opts,
      dataDir: dir,
      normalize: (b: any) => ({ ...b, normalized: true }),
    });
    const hit = (await fresh.get(3)) as any;
    expect(hit.normalized).toBe(true);
  });
});
