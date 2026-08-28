import { DateHelper } from '~/core/Date';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import DataCache from '~/infra/cache/DataCache';
import type { SeriesRow } from '../../index/Index';
import type { AppContext } from '../context';

const DAY_SECONDS = 86_400;
const CACHE_TTL_MS = 30_000;
const DASHBOARD_CACHE_TTL_MS = 5_000;

function sum(block: GQLBlock, key: 'totalFee' | 'totalGas') {
  return block.transactions.reduce(
    (s, t) => s + BigInt((t.status as any)?.[key] ?? '0'),
    0n,
  );
}
function unix(block: GQLBlock) {
  return DateHelper.tai64toDate((block.header as any).time).unix();
}

// Chart data is parsed on the frontend as `dayjs(Number(x))`, so every date/start/end
// must be an epoch-millisecond string.
const msOf = (bucketStart: number) => String(bucketStart * 1000);

function detailsSeries(rows: SeriesRow[], value: (r: SeriesRow) => string) {
  return rows.map((r) => ({ date: msOf(r.bucketStart), value: value(r) }));
}

function feeInUsd(
  feeBaseUnits: string | bigint,
  usd: number | null,
): string | null {
  if (usd == null) return null;
  return ((Number(feeBaseUnits) / 1e9) * usd).toFixed(2);
}

// Falls back to JSON.stringify only when the block isn't in the memory cache
// (sizeOf backs onto BlockStore's LRU sizeCalculation, so it's usually a hit
// here since these are the most recently served blocks).
function blockSize(ctx: AppContext, block: GQLBlock): number {
  return (
    ctx.store.sizeOf(Number(block.height)) ??
    Buffer.byteLength(JSON.stringify(block))
  );
}

async function buildStatistics(ctx: AppContext) {
  const since = Math.floor(Date.now() / 1000) - DAY_SECONDS;
  const hourly = ctx.index.hourlySeries(since);
  const tenMinute = ctx.index.tenMinuteSeries(since);
  const usd = await ctx.price.usd();

  const cached = ctx.store.cached();
  const last60 = cached.filter(
    (b) => unix(b) >= (cached[0] ? unix(cached[0]) - 60 : 0),
  );
  const txs = last60.reduce((s, b) => s + b.transactions.length, 0);

  const totalFeeBase = hourly.reduce((s, r) => s + BigInt(r.totalFee), 0n);

  return {
    totalTps: detailsSeries(hourly, (r) => String(r.txCount)),
    averageTps: detailsSeries(hourly, (r) => (r.txCount / 3600).toFixed(2)),
    maxTps: detailsSeries(hourly, (r) => String(r.txCount)),
    averageTpsPerMinute: detailsSeries(tenMinute, (r) =>
      (r.txCount / 600).toFixed(2),
    ),
    rollingStats60s: {
      tps: last60.length ? txs / 60 : 0,
      avgTxPerBlock: last60.length ? txs / last60.length : 0,
      avgGasPerBlock: last60.length
        ? Number(last60.reduce((s, b) => s + sum(b, 'totalGas'), 0n)) /
          last60.length
        : 0,
      avgBlockSize: last60.length
        ? last60.reduce((s, b) => s + blockSize(ctx, b), 0) / last60.length
        : 0,
      peakTps: last60.length
        ? Math.max(...last60.map((b) => b.transactions.length))
        : 0,
    },
    totalGasUsed: detailsSeries(hourly, (r) => r.gasUsed),
    averageGasUsed: detailsSeries(hourly, (r) =>
      r.blocks ? (BigInt(r.gasUsed) / BigInt(r.blocks)).toString() : '0',
    ),
    maxGasUsed: detailsSeries(hourly, (r) => r.gasUsed),
    totalFee: hourly.map((r) => ({
      date: msOf(r.bucketStart),
      value: r.totalFee,
      valueInUsd: feeInUsd(r.totalFee, usd),
    })),
    totalFee24hrs: feeInUsd(totalFeeBase, usd),
  };
}

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
        timestamp: String(unix(b)),
        gasUsed: sum(b, 'totalGas').toString(),
        gasUsedInUsd: null,
        totalFee: sum(b, 'totalFee').toString(),
        totalFeeInUsd: null,
        blockNo: b.height,
        producer: null,
        blockHash: b.id,
        transactionsCount: String(b.transactions.length),
        blockSize: String(blockSize(ctx, b)),
      }));
      cache.save('getBlocksDashboard', DASHBOARD_CACHE_TTL_MS, nodes);
      return { nodes };
    },
    tps(_: unknown, __: unknown, ctx: AppContext) {
      const cache = DataCache.getInstance();
      const hit = cache.get('tps');
      if (hit) return { nodes: hit };
      const since = Math.floor(Date.now() / 1000) - DAY_SECONDS;
      const hourly = ctx.index.hourlySeries(since);
      const nodes = hourly.map((r) => ({
        start: msOf(r.bucketStart),
        end: msOf(r.bucketStart + 3600),
        txCount: String(r.txCount),
        totalGas: r.gasUsed,
      }));
      cache.save('tps', CACHE_TTL_MS, nodes);
      return { nodes };
    },
    async statistics(_: unknown, __: unknown, ctx: AppContext) {
      const cache = DataCache.getInstance();
      const hit = cache.get('statistics');
      if (hit) return { nodes: hit };
      const nodes = await buildStatistics(ctx);
      cache.save('statistics', CACHE_TTL_MS, nodes);
      return { nodes };
    },
  },
};
