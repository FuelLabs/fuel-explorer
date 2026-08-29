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
    MEMORY_CACHE_BYTES: num(128 * 1024 ** 2),
    INDEX_RETENTION_DAYS: num(3),
    INDEX_MAX_BYTES: num(15_000_000_000),
    TIP_POLL_MS: num(5000),
    BACKFILL_BATCH: num(20),
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
  const parsed = schema.safeParse(env);
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
