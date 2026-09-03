import { z } from 'zod';

const num = (def: number) => z.coerce.number().int().positive().default(def);

const schema = z
  .object({
    BLOCK_SOURCE: z.enum(['s3', 'rpc']).default('s3'),
    S3_BUCKET: z.string().min(1).optional(),
    AWS_REGION: z.string().min(1).optional(),
    S3_ENDPOINT: z.string().optional(),
    FUEL_PROVIDER: z.string().url(),
    PORT: num(3000),
    DATA_DIR: z.string().default('/data'),
    DISK_CACHE_BYTES: num(5 * 1024 ** 3),
    // BlockStore's LRU sizeCalculation (src/store/BlockStore.ts) multiplies
    // every block's raw serialized size by HEAP_BYTES_MULTIPLIER (measured
    // ~2.25x, rounded to 2.5x) before comparing it to this budget, so this
    // number is a real-heap ceiling for the cache, not a serialized-bytes
    // one. Sized at 256 MB (holds ~40-47 blocks at the measured worst-case
    // ~5.9 MB/block real heap) because graphql/resolvers/charts.ts's
    // rollingStats60s reads a trailing ~60-second/~60-block window straight
    // off BlockStore.cached() -- the old 128 MB *serialized-bytes* default
    // was, not coincidentally, sized to hold about that many blocks raw
    // (~58 at ~2.2 MB/block JSON). 256 MB here, plus backfill's and
    // TipTracker's in-flight batches (both share BACKFILL_BATCH -- see
    // main.ts -- so up to 2 x 10 blocks x ~6 MB real heap each, measured
    // worst case, can be resident at once: after a large tip-gap reset both
    // run unpaused), plus base process/sqlite overhead (~80-100 MB), fits
    // the Dockerfile's 768 MB --max-old-space-size
    // (docker/vps/Dockerfile.api-lite) with ~35% headroom. This does NOT
    // fit the 384 MB VPS/DO compose profile alongside those batches, so
    // docker/vps/docker-compose.yml and docker-compose.prod.yml override it
    // back down (to 48 MB, trading rollingStats60s accuracy for safety on
    // that tier -- see their comments).
    MEMORY_CACHE_BYTES: num(256 * 1024 ** 2),
    INDEX_RETENTION_DAYS: num(3),
    INDEX_MAX_BYTES: num(15_000_000_000),
    TIP_POLL_MS: num(5000),
    // Blocks fetched per Indexer.backfillStep call, and (via main.ts, which
    // passes this same value through) per TipTracker tick. getRange holds
    // the whole batch's decoded blocks resident until every one of them
    // resolves; both can run unpaused at once (see MEMORY_CACHE_BYTES's
    // comment), so this bounds their *combined* peak transient heap at
    // ~2 x 10 x ~6 MB measured = ~120 MB, on top of the memory cache and
    // process baseline above.
    BACKFILL_BATCH: num(10),
    S3_CONCURRENCY: num(8),
    RPC_MAX_BLOCKS_PER_SECOND: num(5),
    // No static default: it depends on FUEL_PROVIDER's chain, resolved at
    // boot by cosmos/CosmosPoller.defaultCosmosRestUrl.
    COSMOS_REST_URL: z.string().url().optional(),
    COSMOS_START_HEIGHT: z.coerce.number().int().positive().optional(),
    ETH_RPC_URL: z.string().url().optional(),
    // No static default: it depends on FUEL_PROVIDER's host, resolved below.
    FUEL_CHAIN: z.enum(['mainnet', 'testnet']).optional(),
    L1_START_BLOCK: z.coerce.number().int().nonnegative().optional(),
    // No static default: it depends on FUEL_CHAIN, resolved at boot by
    // staking/proof.ts's defaultCosmosIndexerUrl.
    COSMOS_INDEXER_URL: z.string().url().optional(),
  })
  .superRefine((e, ctx) => {
    if (e.BLOCK_SOURCE !== 's3') return;
    if (!e.S3_BUCKET) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['S3_BUCKET'],
        message: 'Required',
      });
    }
    if (!e.AWS_REGION) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['AWS_REGION'],
        message: 'Required',
      });
    }
  });

export type Config = {
  blockSource: 's3' | 'rpc';
  s3Bucket?: string;
  awsRegion?: string;
  s3Endpoint?: string;
  fuelProvider: string;
  port: number;
  dataDir: string;
  diskCacheBytes: number;
  memoryCacheBytes: number;
  indexRetentionDays: number;
  indexMaxBytes: number;
  tipPollMs: number;
  backfillBatch: number;
  s3Concurrency: number;
  rpcMaxBlocksPerSecond: number;
  cosmosRestUrl?: string;
  cosmosStartHeight?: number;
  ethRpcUrl?: string;
  fuelChain: 'mainnet' | 'testnet';
  l1StartBlock?: number;
  cosmosIndexerUrl?: string;
};

export function loadConfig(env: NodeJS.ProcessEnv): Config {
  const cleanedEnv: NodeJS.ProcessEnv = { ...env };
  for (const key of Object.keys(cleanedEnv)) {
    if (cleanedEnv[key]?.trim() === '') {
      delete cleanedEnv[key];
    }
  }
  const parsed = schema.safeParse(cleanedEnv);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('; ');
    throw new Error(`invalid config: ${issues}`);
  }
  const e = parsed.data;
  return {
    blockSource: e.BLOCK_SOURCE,
    s3Bucket: e.S3_BUCKET,
    awsRegion: e.AWS_REGION,
    s3Endpoint: e.S3_ENDPOINT,
    fuelProvider: e.FUEL_PROVIDER,
    port: e.PORT,
    dataDir: e.DATA_DIR,
    diskCacheBytes: e.DISK_CACHE_BYTES,
    memoryCacheBytes: e.MEMORY_CACHE_BYTES,
    indexRetentionDays: e.INDEX_RETENTION_DAYS,
    indexMaxBytes: e.INDEX_MAX_BYTES,
    tipPollMs: e.TIP_POLL_MS,
    backfillBatch: e.BACKFILL_BATCH,
    s3Concurrency: e.S3_CONCURRENCY,
    rpcMaxBlocksPerSecond: e.RPC_MAX_BLOCKS_PER_SECOND,
    cosmosRestUrl: e.COSMOS_REST_URL,
    cosmosStartHeight: e.COSMOS_START_HEIGHT,
    ethRpcUrl: e.ETH_RPC_URL,
    fuelChain:
      e.FUEL_CHAIN ??
      (new URL(e.FUEL_PROVIDER).host.includes('testnet')
        ? 'testnet'
        : 'mainnet'),
    l1StartBlock: e.L1_START_BLOCK,
    cosmosIndexerUrl: e.COSMOS_INDEXER_URL,
  };
}
