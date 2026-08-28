import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from './config';
import { decodeBlock } from './decoder/block';
import { FuelCoreClient } from './fuelcore/FuelCoreClient';
import { PriceClient } from './fuelcore/PriceClient';
import { Index } from './index/Index';
import { Indexer } from './index/Indexer';
import { TipTracker } from './index/TipTracker';
import { RpcBlockSource } from './rpc/RpcBlockSource';
import { S3BlockSource, createS3Fetcher } from './s3/S3BlockSource';
import { createApp } from './server';
import { BlockStore } from './store/BlockStore';

const CHAIN_PARAMS_RETRY_MAX_DELAY_MS = 30_000;
const PAUSE_BACKFILL_LAG_BLOCKS = 100;
const RESUME_BACKFILL_LAG_BLOCKS = 20;
const RESUMABLE_TIP_GAP_BLOCKS = 3600; // ~1h at 1s/block
const DISK_EVICT_INTERVAL_MS = 10 * 60 * 1000;
const RETENTION_SWEEP_INTERVAL_MS = 60 * 60 * 1000;
const HEALTH_LOG_INTERVAL_MS = 60 * 1000;

// Retries forever instead of exiting, so a fuel-core outage at boot doesn't
// crash-loop the container; once up, cached blocks can still be served while
// this keeps retrying in the background.
async function chainParamsWithRetry(
  client: FuelCoreClient,
): Promise<Awaited<ReturnType<FuelCoreClient['chainParams']>>> {
  let delayMs = 1000;
  for (;;) {
    try {
      return await client.chainParams();
    } catch (e) {
      console.error(`boot: chainParams failed, retrying in ${delayMs}ms`, e);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      delayMs = Math.min(delayMs * 2, CHAIN_PARAMS_RETRY_MAX_DELAY_MS);
    }
  }
}

async function main() {
  const cfg = loadConfig(process.env);
  mkdirSync(cfg.dataDir, { recursive: true });
  const client = new FuelCoreClient(cfg.fuelProvider);
  const params = await chainParamsWithRetry(client);
  console.log(`chainId=${params.chainId} baseAssetId=${params.baseAssetId}`);

  const index = new Index(join(cfg.dataDir, 'index.db'));
  const repaired = index.deleteOutsideRange();
  console.log(`index repair: deleted ${repaired} rows outside indexed range`);
  console.log(`block source: ${cfg.blockSource}`);
  const rpcSource =
    cfg.blockSource === 'rpc'
      ? new RpcBlockSource(client, cfg.rpcMaxBlocksPerSecond)
      : null;
  const store = new BlockStore(
    rpcSource
      ? {
          loader: (height) => rpcSource.load(height),
          dataDir: cfg.dataDir,
          memoryBytes: cfg.memoryCacheBytes,
          diskBytes: cfg.diskCacheBytes,
          concurrency: cfg.s3Concurrency,
        }
      : {
          source: new S3BlockSource(
            createS3Fetcher({
              bucket: cfg.s3Bucket!,
              region: cfg.awsRegion!,
              endpoint: cfg.s3Endpoint,
            }),
          ),
          decode: (bytes) =>
            decodeBlock(bytes, { chainId: params.chainId, fee: params.fee }),
          dataDir: cfg.dataDir,
          memoryBytes: cfg.memoryCacheBytes,
          diskBytes: cfg.diskCacheBytes,
          concurrency: cfg.s3Concurrency,
        },
  );
  const indexer = new Indexer({
    index,
    store,
    retentionDays: cfg.indexRetentionDays,
    maxBytes: cfg.indexMaxBytes,
    batch: cfg.backfillBatch,
    onLog: (m) => console.log(m),
  });
  store.opts.onDecoded = (b) => indexer.writeOnly(b);

  // A gap up to this size between the stored `to` and the live tip is walked
  // forward block-by-block by TipTracker. A larger gap means the index is
  // too stale to catch up that way, so the range is reset to start fresh at
  // the live tip; backfill then refills downward, which is cheap because
  // those blocks are still disk-cached.
  const r = index.range();
  let seed = 0;
  let tipNow: number | null = null;
  try {
    tipNow = await client.latestHeight();
  } catch {
    console.log('boot: fuel-core tip unavailable, seeding from stored range');
    seed = r.to ?? 0;
  }
  if (tipNow != null) {
    if (r.to != null && tipNow - r.to <= RESUMABLE_TIP_GAP_BLOCKS) {
      seed = r.to;
      console.log(`resuming tip from ${r.to}, gap ${tipNow - r.to}`);
    } else if (r.to != null) {
      index.clearRange();
      console.log(
        `index range reset: gap ${tipNow - r.to} blocks above stored to=${r.to}`,
      );
    }
  }
  const tip = new TipTracker({
    client,
    store,
    pollMs: cfg.tipPollMs,
    onBlock: (b) => indexer.indexBlock(b),
    initialServedTip: seed,
    // Backfill and forward catch-up share one CPU. When the tracker falls
    // far behind, pausing backfill gives catch-up the room to beat the
    // chain; resume only once the lag has come well back down, so the two
    // don't thrash pause/resume around one threshold.
    onLag: (lag) => {
      if (lag > PAUSE_BACKFILL_LAG_BLOCKS) indexer.pause();
      else if (lag <= RESUME_BACKFILL_LAG_BLOCKS) indexer.resume();
    },
  });
  const price = new PriceClient();

  const { server, health } = createApp({
    store,
    index,
    tip,
    client,
    chain: { chainId: params.chainId, baseAssetId: params.baseAssetId },
    price,
    indexer,
    blockSource: cfg.blockSource,
  });
  server.listen(cfg.port, () =>
    console.log(`api-lite listening on ${cfg.port}`),
  );

  tip.start();
  indexer.start();
  // Leading call so a disk overshoot from a previous run (or a diskBytes value
  // lowered since last boot) is corrected immediately instead of waiting for
  // the first interval tick.
  void store
    .evictDisk()
    .then((n) => n && console.log(`disk evict: ${n} files`));
  setInterval(
    () =>
      void store
        .evictDisk()
        .then((n) => n && console.log(`disk evict: ${n} files`)),
    DISK_EVICT_INTERVAL_MS,
  );
  setInterval(() => {
    const n = indexer.retention(Math.floor(Date.now() / 1000));
    if (n) console.log(`retention: ${n} rows`);
  }, RETENTION_SWEEP_INTERVAL_MS);
  setInterval(
    () =>
      console.log(
        JSON.stringify({ ...health(), backfillBps: indexer.backfillRate() }),
      ),
    HEALTH_LOG_INTERVAL_MS,
  );

  const shutdown = () => {
    tip.stop();
    indexer.stop();
    server.close();
    index.close();
    process.exit(0);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
