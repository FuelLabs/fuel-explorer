import { TipTracker } from './TipTracker';

function rangeStore(
  present: (h: number) => boolean,
  calls?: [number, number][],
) {
  return {
    getRange: async (from: number, to: number) => {
      calls?.push([from, to]);
      const out: ({ height: string } | null)[] = [];
      for (let h = from; h <= to; h++)
        out.push(present(h) ? { height: String(h) } : null);
      return out;
    },
  } as any;
}

describe('TipTracker', () => {
  it('advances servedTip only for blocks that exist in the store', async () => {
    let tip = 100;
    const have = new Set([100, 101]);
    const seen: number[] = [];
    const store = rangeStore((h) => have.has(h));
    const t = new TipTracker({
      client: { latestHeight: async () => tip },
      store,
      pollMs: 1000,
      onBlock: (b) => seen.push(Number(b.height)),
    });
    await t.tick();
    expect(t.fuelCoreTip).toBe(100);
    expect(t.servedTip).toBe(100);
    tip = 103;
    await t.tick();
    expect(t.servedTip).toBe(101);
    expect(seen).toEqual([100, 101]);
    have.add(102);
    have.add(103);
    await t.tick();
    expect(t.servedTip).toBe(103);
  });

  it('initialServedTip resumes from a seeded height, never re-fetching it', async () => {
    const calls: [number, number][] = [];
    const seen: number[] = [];
    const t = new TipTracker({
      client: { latestHeight: async () => 103 },
      store: rangeStore(() => true, calls),
      pollMs: 1000,
      initialServedTip: 100,
      onBlock: (b) => seen.push(Number(b.height)),
    });
    expect(t.servedTip).toBe(100);
    await t.tick();
    expect(calls).toEqual([[101, 103]]);
    expect(seen).toEqual([101, 102, 103]);
    expect(t.servedTip).toBe(103);
  });

  it('marks fuel-core down on error and keeps the last tip', async () => {
    let fail = false;
    const t = new TipTracker({
      client: {
        latestHeight: async () => {
          if (fail) throw new Error('x');
          return 5;
        },
      },
      store: rangeStore(() => true),
      pollMs: 1000,
    });
    await t.tick();
    fail = true;
    await t.tick();
    expect(t.fuelCoreUp).toBe(false);
    expect(t.servedTip).toBe(5);
  });

  it('batches through a 100-block gap in one tick, calling onBlock in ascending order', async () => {
    const calls: [number, number][] = [];
    const seen: number[] = [];
    const t = new TipTracker({
      client: { latestHeight: async () => 1100 },
      store: rangeStore(() => true, calls),
      pollMs: 1000,
      batch: 20,
      initialServedTip: 1000,
      onBlock: (b) => seen.push(Number(b.height)),
    });
    await t.tick();
    expect(t.servedTip).toBe(1100);
    expect(calls).toEqual([
      [1001, 1020],
      [1021, 1040],
      [1041, 1060],
      [1061, 1080],
      [1081, 1100],
    ]);
    expect(seen).toEqual(Array.from({ length: 100 }, (_, i) => 1001 + i));
  });

  it('stops at the first missing block and does not fetch further batches', async () => {
    const calls: [number, number][] = [];
    const seen: number[] = [];
    const t = new TipTracker({
      client: { latestHeight: async () => 1100 },
      store: rangeStore((h) => h !== 1015, calls),
      pollMs: 1000,
      batch: 20,
      initialServedTip: 1000,
      onBlock: (b) => seen.push(Number(b.height)),
    });
    await t.tick();
    expect(t.servedTip).toBe(1014);
    expect(calls).toEqual([[1001, 1020]]);
    expect(seen).toEqual(Array.from({ length: 14 }, (_, i) => 1001 + i));
  });

  it('caps at 10 batches per tick even with a larger gap', async () => {
    const calls: [number, number][] = [];
    const t = new TipTracker({
      client: { latestHeight: async () => 1500 },
      store: rangeStore(() => true, calls),
      pollMs: 1000,
      batch: 20,
      initialServedTip: 1000,
    });
    await t.tick();
    expect(calls.length).toBe(10);
    expect(t.servedTip).toBe(1200);
  });

  it('onLag fires at the end of every tick with fuelCoreTip - servedTip', async () => {
    const lags: number[] = [];
    const t = new TipTracker({
      client: { latestHeight: async () => 105 },
      store: rangeStore(() => true),
      pollMs: 1000,
      initialServedTip: 100,
      onLag: (lag) => lags.push(lag),
    });
    await t.tick();
    expect(lags).toEqual([0]);
  });

  it('onLag still fires when fuel-core is down, using the last known tip', async () => {
    const lags: number[] = [];
    let fail = false;
    const t = new TipTracker({
      client: {
        latestHeight: async () => {
          if (fail) throw new Error('x');
          return 10;
        },
      },
      store: rangeStore(() => true),
      pollMs: 1000,
      onLag: (lag) => lags.push(lag),
    });
    await t.tick();
    fail = true;
    await t.tick();
    expect(lags).toEqual([0, 0]);
  });
});
