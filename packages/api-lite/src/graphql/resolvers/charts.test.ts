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
