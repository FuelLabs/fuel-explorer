import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import DataCache from '~/infra/cache/DataCache';
import type { AppContext } from '../context';
import { blockSize, buildCharts, sum, unix } from './charts';

const DASHBOARD_CACHE_TTL_MS = 5_000;

export const analyticsResolvers = {
  Query: {
    async getBlocksDashboard(_: unknown, __: unknown, ctx: AppContext) {
      const cache = DataCache.getInstance();
      const hit = cache.get('getBlocksDashboard');
      if (hit) return { nodes: hit };
      const tip = ctx.tip.servedTip;
      const blocks = (await ctx.store.getRange(Math.max(0, tip - 5), tip))
        .filter((b): b is GQLBlock => b != null)
        .reverse();
      const nodes = blocks.map((b) => ({
        // Prod serves epoch milliseconds; unix(b) is seconds.
        timestamp: unix(b) * 1000,
        gasUsed: Number(sum(b, 'totalGas')),
        gasUsedInUsd: null,
        totalFee: Number(sum(b, 'totalFee')),
        totalFeeInUsd: null,
        blockNo: Number(b.height),
        producer: null,
        blockHash: b.id,
        transactionsCount: b.transactions.length,
        blockSize: blockSize(ctx, b),
      }));
      cache.save('getBlocksDashboard', DASHBOARD_CACHE_TTL_MS, nodes);
      return { nodes };
    },
    async tps(_: unknown, __: unknown, ctx: AppContext) {
      const { tps } = await buildCharts(ctx);
      return { nodes: tps };
    },
    async statistics(_: unknown, __: unknown, ctx: AppContext) {
      const { statistics } = await buildCharts(ctx);
      return { nodes: statistics };
    },
  },
};
