import { Index } from './Index';
import { Indexer } from './Indexer';

const hex = (n: number) => `0x${n.toString(16).padStart(64, '0')}`;
const T0 = 4611686020140000000n;
const blk = (h: number) =>
  ({
    id: hex(1000 + h),
    height: String(h),
    header: { height: String(h), time: (T0 + BigInt(h)).toString() },
    transactions: [
      {
        id: hex(h),
        inputs: [{ __typename: 'InputCoin', owner: hex(1), predicate: '0x' }],
        outputs: [],
        status: { __typename: 'SuccessStatus', receipts: [] },
      },
    ],
  }) as any;

function make(retentionDays = 1) {
  const index = new Index(':memory:');
  const store = {
    get: async (h: number) => (h >= 0 ? blk(h) : null),
    getRange: async (a: number, b: number) => {
      const out = [];
      for (let h = a; h <= b; h++) out.push(blk(h));
      return out;
    },
  } as any;
  const indexer = new Indexer({
    index,
    store,
    retentionDays,
    maxBytes: 1e12,
    batch: 5,
  });
  return { index, store, indexer };
}

describe('Indexer', () => {
  it('forward indexing sets range', () => {
    const { index, indexer } = make();
    indexer.indexBlock(blk(200));
    indexer.indexBlock(blk(201));
    expect(index.range()).toEqual({ from: 200, to: 201 });
    expect(index.heightForTx(hex(201))).toEqual({ height: 201, txIndex: 0 });
  });

  it('indexBlock(to+1) extends to', () => {
    const { index, indexer } = make();
    indexer.indexBlock(blk(200));
    indexer.indexBlock(blk(201));
    expect(index.range()).toEqual({ from: 200, to: 201 });
  });

  it('indexBlock(from-1) extends from', () => {
    const { index, indexer } = make();
    indexer.indexBlock(blk(200));
    indexer.indexBlock(blk(199));
    expect(index.range()).toEqual({ from: 199, to: 200 });
  });

  it('indexBlock with a non-contiguous height leaves range unchanged but still indexes the block', () => {
    const { index, indexer } = make();
    indexer.indexBlock(blk(200));
    indexer.indexBlock(blk(201));
    indexer.indexBlock(blk(0));
    expect(index.range()).toEqual({ from: 200, to: 201 });
    expect(index.heightForTx(hex(0))).toEqual({ height: 0, txIndex: 0 });
  });

  it('writeOnly never touches meta', () => {
    const { index, indexer } = make();
    indexer.indexBlock(blk(200));
    indexer.writeOnly(blk(0));
    expect(index.range()).toEqual({ from: 200, to: 200 });
    expect(index.heightForTx(hex(0))).toEqual({ height: 0, txIndex: 0 });
  });

  it('backfillStep walks down in batches to the floor', async () => {
    const { index, indexer } = make(1);
    indexer.indexBlock(blk(100000));
    expect(indexer.floorHeight()).toBe(100000 - 86400);
    expect(await indexer.backfillStep()).toBe(true);
    expect(index.range()).toEqual({ from: 99995, to: 100000 });
    expect(index.heightForTx(hex(99995))).not.toBeNull();
  });

  it('backfillStep returns false at the floor', async () => {
    const { indexer } = make(1);
    indexer.indexBlock(blk(10));
    expect(indexer.floorHeight()).toBe(0);
    let steps = 0;
    while (await indexer.backfillStep()) steps++;
    expect(steps).toBe(2);
    expect(await indexer.backfillStep()).toBe(false);
  });

  it('retention deletes below the floor', async () => {
    const { index, indexer } = make(1);
    // Written directly (bypassing indexBlock's contiguity check) to set up a
    // range that spans a retention floor without indexing every block in between.
    for (let h = 0; h <= 3; h++) index.writeBlock(blk(h));
    index.writeBlock(blk(86402));
    index.setRange(0, 86402);
    expect(indexer.retention(0)).toBeGreaterThan(0);
    expect(index.heightForTx(hex(1))).toBeNull();
    expect(index.heightForTx(hex(86402))).not.toBeNull();
  });

  it('backfillStep does not clobber to when the tracker extends it during the batch fetch', async () => {
    const index = new Index(':memory:');
    index.writeBlock(blk(100000));
    index.setRange(100000, 100000);
    const store = {
      getRange: async (from: number, to: number) => {
        // Simulate TipTracker extending `to` forward with contiguous blocks
        // while this backfill fetch is still in flight.
        index.setRange(index.range().from!, to + 5);
        const out = [];
        for (let h = from; h <= to; h++) out.push(blk(h));
        return out;
      },
    } as any;
    const indexer = new Indexer({
      index,
      store,
      retentionDays: 1,
      maxBytes: 1e12,
      batch: 5,
    });
    expect(await indexer.backfillStep()).toBe(true);
    // to = r.from - 1 = 99999, so the fake extends indexed_to to 99999 + 5 = 100004.
    // The fix must preserve that extension instead of writing the stale to=100000 back.
    expect(index.range()).toEqual({ from: 99995, to: 100004 });
  });

  it('pause makes backfillStep return false immediately without touching the store; resume re-enables it', async () => {
    const index = new Index(':memory:');
    index.writeBlock(blk(100000));
    index.setRange(100000, 100000);
    let calls = 0;
    const store = {
      getRange: async (from: number, to: number) => {
        calls++;
        const out = [];
        for (let h = from; h <= to; h++) out.push(blk(h));
        return out;
      },
    } as any;
    const indexer = new Indexer({
      index,
      store,
      retentionDays: 1,
      maxBytes: 1e12,
      batch: 5,
    });
    indexer.pause();
    expect(indexer.backfillPaused).toBe(true);
    expect(await indexer.backfillStep()).toBe(false);
    expect(calls).toBe(0);
    indexer.resume();
    expect(indexer.backfillPaused).toBe(false);
    expect(await indexer.backfillStep()).toBe(true);
    expect(calls).toBe(1);
  });

  it('backfillStep skips a permanently missing block after 3 consecutive no-progress calls at the same from', async () => {
    const index = new Index(':memory:');
    index.writeBlock(blk(100));
    index.setRange(100, 100);
    const logs: string[] = [];
    // Every height is "missing" (S3/RPC never has it), so backfillStep can never progress.
    const store = {
      getRange: async (from: number, to: number) =>
        new Array(to - from + 1).fill(null),
    } as any;
    const indexer = new Indexer({
      index,
      store,
      retentionDays: 1,
      maxBytes: 1e12,
      batch: 5,
      onLog: (m) => logs.push(m),
    });

    expect(await indexer.backfillStep()).toBe(false);
    expect(index.range().from).toBe(100);
    expect(await indexer.backfillStep()).toBe(false);
    expect(index.range().from).toBe(100);
    // Third consecutive no-progress call at from=100: skips past the missing
    // block (99 = from - 1) and records the gap instead of retrying forever.
    expect(await indexer.backfillStep()).toBe(true);
    expect(index.range().from).toBe(98);
    expect(index.getMeta('gaps')).toBe('99');
    expect(logs).toContain('backfill: skipping missing block 99');
  });

  it('backfillStep resets the no-progress counter once progress resumes', async () => {
    const index = new Index(':memory:');
    index.writeBlock(blk(100));
    index.setRange(100, 100);
    let missing = true;
    const store = {
      getRange: async (from: number, to: number) => {
        if (missing) return new Array(to - from + 1).fill(null);
        const out = [];
        for (let h = from; h <= to; h++) out.push(blk(h));
        return out;
      },
    } as any;
    const indexer = new Indexer({
      index,
      store,
      retentionDays: 1,
      maxBytes: 1e12,
      batch: 5,
    });

    expect(await indexer.backfillStep()).toBe(false);
    expect(await indexer.backfillStep()).toBe(false);
    missing = false;
    expect(await indexer.backfillStep()).toBe(true); // progress before the 3rd no-progress call would have skipped
    expect(index.range().from).toBe(95);
    expect(index.getMeta('gaps')).toBeNull();
  });

  it('retention while loop thrashes until under maxBytes', () => {
    const deleteBelow_calls: number[] = [];
    const vacuum_calls: number[] = [];
    let deleteBelow_max_call = 0;

    const fakeIndex = {
      writeBlock: () => {},
      range: () => ({ from: 0, to: 5000 }),
      setRange: () => {},
      deleteBelow: (h: number) => {
        deleteBelow_calls.push(h);
        deleteBelow_max_call = Math.max(deleteBelow_max_call, h);
        return h >= 2000 ? 0 : 100;
      },
      fileBytes: () => (deleteBelow_max_call >= 2000 ? 0 : 100),
      vacuum: () => {
        vacuum_calls.push(Date.now());
      },
    } as any as Pick<
      Index,
      | 'writeBlock'
      | 'range'
      | 'setRange'
      | 'deleteBelow'
      | 'fileBytes'
      | 'vacuum'
    >;

    const indexer = new Indexer({
      index: fakeIndex as unknown as Index,
      store: {} as any,
      retentionDays: 1,
      maxBytes: 50,
      batch: 5,
    });

    const deleted = indexer.retention(0);
    expect(deleted).toBeGreaterThan(0);
    expect(deleteBelow_calls).toContain(1000);
    expect(deleteBelow_calls).toContain(2000);
    expect(vacuum_calls.length).toBeGreaterThan(0);
  });
});
