import { DateHelper } from '~/core/Date';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import DataCache from '~/infra/cache/DataCache';
import { convertToUsd } from '~/infra/dao/utils';
import type { SeriesRow } from '../../index/Index';
import type { AppContext } from '../context';

const DAY_SECONDS = 86_400;
const HOUR_SECONDS = 3_600;
const MINUTE_SECONDS = 60;
export const CACHE_TTL_MS = 30_000;

// The first full bucket boundary at or after `now - 24h`, so the 24h series
// never starts with a partial (and therefore artificially low) bucket.
function fullBucketSince(bucketSeconds: number): number {
  const now = Date.now() / 1000;
  return Math.ceil((now - DAY_SECONDS) / bucketSeconds) * bucketSeconds;
}

export function sum(block: GQLBlock, key: 'totalFee' | 'totalGas') {
  return block.transactions.reduce(
    (s, t) => s + BigInt((t.status as any)?.[key] ?? '0'),
    0n,
  );
}
export function unix(block: GQLBlock) {
  return DateHelper.tai64toDate((block.header as any).time).unix();
}

// Chart data is parsed on the frontend as `dayjs(Number(x))`, so every date/start/end
// must be an epoch-millisecond string.
const msOf = (bucketStart: number) => String(bucketStart * 1000);

function detailsSeries(rows: SeriesRow[], value: (r: SeriesRow) => number) {
  return rows.map((r) => ({ date: msOf(r.bucketStart), value: value(r) }));
}

function feeInUsd(
  feeBaseUnits: string | bigint,
  usd: number | null,
): string | null {
  // convertToUsd itself falls back to '$0' when rate is falsy/undefined, so
  // treat a missing/zero price as "unavailable" rather than surfacing that.
  if (!usd) return null;
  return convertToUsd(String(feeBaseUnits), 9, usd).formatted;
}

// Falls back to JSON.stringify only when the block isn't in the memory cache
// (sizeOf backs onto BlockStore's LRU sizeCalculation, so it's usually a hit
// here since these are the most recently served blocks).
export function blockSize(ctx: AppContext, block: GQLBlock): number {
  return (
    ctx.store.sizeOf(Number(block.height)) ??
    Buffer.byteLength(JSON.stringify(block))
  );
}

async function buildStatistics(ctx: AppContext) {
  const hourly = ctx.index.hourlySeries(fullBucketSince(HOUR_SECONDS));
  const minute = ctx.index.minuteSeries(fullBucketSince(MINUTE_SECONDS));
  const usd = await ctx.price.usd();

  const cached = ctx.store.cached();
  const last60 = cached.filter(
    (b) => unix(b) >= (cached[0] ? unix(cached[0]) - 60 : 0),
  );
  const txs = last60.reduce((s, b) => s + b.transactions.length, 0);

  const totalFeeBase = hourly.reduce((s, r) => s + BigInt(r.totalFee), 0n);

  return {
    totalTps: detailsSeries(hourly, (r) => r.txCount),
    averageTps: detailsSeries(hourly, (r) =>
      Number((r.txCount / 3600).toFixed(2)),
    ),
    // Prod's maxTps (packages/graphql BlockDAO.getHourlyStatistics) is
    // MAX(transactions_count) per hour bucket, i.e. the single busiest
    // block, not the bucket's sum. Index.hourlySeries now carries that
    // column directly (maxTxCount) from the same bucketed SQL query.
    maxTps: detailsSeries(hourly, (r) => r.maxTxCount),
    averageTpsPerMinute: detailsSeries(minute, (r) =>
      Number((r.txCount / MINUTE_SECONDS).toFixed(2)),
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
    totalGasUsed: detailsSeries(hourly, (r) => Number(r.gasUsed)),
    averageGasUsed: detailsSeries(hourly, (r) =>
      r.blocks ? Number(BigInt(r.gasUsed) / BigInt(r.blocks)) : 0,
    ),
    // Same as maxTps above: the busiest single block's gas, from Index's
    // maxGasUsed column, not the bucket's SUM (totalGasUsed above).
    maxGasUsed: detailsSeries(hourly, (r) => r.maxGasUsed),
    totalFee: hourly.map((r) => ({
      date: msOf(r.bucketStart),
      value: Number(r.totalFee),
      valueInUsd: feeInUsd(r.totalFee, usd),
    })),
    totalFee24hrs: feeInUsd(totalFeeBase, usd),
  };
}

function buildTps(ctx: AppContext) {
  const hourly = ctx.index.hourlySeries(fullBucketSince(HOUR_SECONDS));
  return hourly.map((r) => ({
    start: msOf(r.bucketStart),
    end: msOf(r.bucketStart + HOUR_SECONDS),
    txCount: r.txCount,
    totalGas: Number(r.gasUsed),
  }));
}

type ChartsResult = {
  statistics: Awaited<ReturnType<typeof buildStatistics>>;
  tps: ReturnType<typeof buildTps>;
};

// Single-flight guard: concurrent GET /charts (and statistics/tps GraphQL)
// requests during a cold cache would otherwise each run their own hourly/
// minute SQL scans and price fetch. Every caller while one compute is in
// flight shares that same promise instead of starting a duplicate.
let inflight: Promise<ChartsResult> | null = null;

async function computeCharts(ctx: AppContext): Promise<ChartsResult> {
  const cache = DataCache.getInstance();
  let statistics = cache.get('statistics');
  if (!statistics) {
    statistics = await buildStatistics(ctx);
    cache.save('statistics', CACHE_TTL_MS, statistics);
  }
  let tps = cache.get('tps');
  if (!tps) {
    tps = buildTps(ctx);
    cache.save('tps', CACHE_TTL_MS, tps);
  }
  return { statistics, tps };
}

// Shared by the `statistics`/`tps` GraphQL resolvers and the `GET /charts`
// REST route, so both surfaces compute (and DataCache-cache, under the same
// 'statistics'/'tps' keys the GraphQL resolvers always used) identical
// payloads.
export async function buildCharts(ctx: AppContext): Promise<ChartsResult> {
  if (inflight) return inflight;
  inflight = computeCharts(ctx).finally(() => {
    inflight = null;
  });
  return inflight;
}
