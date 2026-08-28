import { mkdtempSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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
    ).toEqual(['1.json', '2.json']);
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
        '7.json',
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
    const { store } = makeStore({
      decode: (bytes) => fakeBlock(bytes[0], 3000),
      diskBytes: 7000,
      memoryBytes: 1,
    });
    await store.get(1);
    await store.get(2);
    await store.get(3);
    expect(
      readdirSync(join((store as any).opts.dataDir, 'blocks')),
    ).not.toContain('1.json');
    const removed = await store.evictDisk();
    expect(removed).toBe(0);
  });

  it('evictDisk cleans up files that landed on disk outside the tracked store (drift backstop)', async () => {
    const { store } = makeStore({
      decode: (bytes) => fakeBlock(bytes[0], 3000),
      diskBytes: 7000,
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
    // All heights share the same digit count (3) so every block serializes to
    // the exact same byte length, making the cap-in-blocks math exact.
    const probeSize = Buffer.byteLength(JSON.stringify(fakeBlock(100)));
    const { store } = makeStore({ dataDir, diskBytes: probeSize * 3 });
    for (let h = 100; h < 105; h++) await store.get(h);
    const files = readdirSync(join(dataDir, 'blocks'));
    expect(files.length).toBeLessThanOrEqual(3);
    // The 3 most recently written blocks (102, 103, 104) survive; the 2 oldest
    // (100, 101) are evicted as soon as the cap is exceeded, not after the fact.
    expect(files.sort()).toEqual(['102.json', '103.json', '104.json']);
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
