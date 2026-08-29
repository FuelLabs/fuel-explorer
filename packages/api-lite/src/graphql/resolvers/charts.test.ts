import DataCache from '~/infra/cache/DataCache';
import type { AppContext } from '../context';
import { buildCharts } from './charts';

function fakeCtx(): AppContext {
  return {
    index: {
      hourlySeries: jest.fn().mockReturnValue([]),
      minuteSeries: jest.fn().mockReturnValue([]),
    },
    store: {
      cached: jest.fn().mockReturnValue([]),
      sizeOf: jest.fn(),
    },
    price: { usd: jest.fn().mockResolvedValue(2000) },
  } as unknown as AppContext;
}

describe('buildCharts', () => {
  beforeEach(() => {
    // 'statistics'/'tps' are cached process-wide by key name; force a cold
    // cache for every test regardless of what ran before it.
    DataCache.getInstance().save('statistics', 0, undefined);
    DataCache.getInstance().save('tps', 0, undefined);
  });

  it('single-flights concurrent calls on a cold cache: the index/price are read once, not once per caller', async () => {
    const ctx = fakeCtx();
    const [a, b] = await Promise.all([buildCharts(ctx), buildCharts(ctx)]);

    expect(a).toEqual(b);
    // buildStatistics reads minuteSeries and price.usd() exactly once per
    // compute; without single-flight, two concurrent cold-cache callers
    // would each run their own compute, doubling these.
    expect(ctx.index.minuteSeries).toHaveBeenCalledTimes(1);
    expect(ctx.price.usd).toHaveBeenCalledTimes(1);
    // hourlySeries is read once by buildStatistics and once by buildTps
    // within a *single* compute, so 2 (not 4) proves the compute ran once.
    expect(ctx.index.hourlySeries).toHaveBeenCalledTimes(2);
  });

  it("maxTps and maxGasUsed pass through Index's per-bucket MAX columns, not the bucket's sum", async () => {
    // Index.hourlySeries now returns maxTxCount/maxGasUsed (MAX(tx_count)/
    // MAX(gas_used) per bucket) alongside the existing SUM columns
    // (txCount/gasUsed). buildStatistics must map maxTps/maxGasUsed from the
    // MAX columns, leaving totalTps/totalGasUsed on the SUM columns.
    const ctx = {
      index: {
        hourlySeries: jest.fn().mockReturnValue([
          {
            bucketStart: 0,
            txCount: 4,
            blocks: 2,
            gasUsed: '530',
            totalFee: '0',
            maxTxCount: 3,
            maxGasUsed: 500,
          },
        ]),
        minuteSeries: jest.fn().mockReturnValue([]),
      },
      store: {
        cached: jest.fn().mockReturnValue([]),
        sizeOf: jest.fn(),
      },
      price: { usd: jest.fn().mockResolvedValue(2000) },
    } as unknown as AppContext;

    const { statistics } = await buildCharts(ctx);

    expect(statistics.maxTps[0].value).toBe(3);
    expect(statistics.maxTps[0].value).not.toBe(4);
    expect(statistics.maxGasUsed[0].value).toBe(500);
    expect(statistics.maxGasUsed[0].value).not.toBe(530);
    // Sums must stay sums: unaffected by the max columns.
    expect(statistics.totalTps[0].value).toBe(4);
    expect(statistics.totalGasUsed[0].value).toBe(530);
  });

  it('a call after the in-flight compute settles takes the cache-hit path (no further index reads)', async () => {
    const ctx = fakeCtx();
    await buildCharts(ctx);
    (ctx.index.hourlySeries as jest.Mock).mockClear();
    (ctx.index.minuteSeries as jest.Mock).mockClear();
    (ctx.price.usd as jest.Mock).mockClear();

    await buildCharts(ctx);

    expect(ctx.index.hourlySeries).not.toHaveBeenCalled();
    expect(ctx.index.minuteSeries).not.toHaveBeenCalled();
    expect(ctx.price.usd).not.toHaveBeenCalled();
  });
});
