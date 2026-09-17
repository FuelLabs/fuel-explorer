import { promises as fsp, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { monitorEventLoopDelay } from 'node:perf_hooks';
import { http, createPublicClient } from 'viem';
import VerifiedAssets from '~/infra/cache/VerifiedAssets';
import { seedVerifiedAssets } from './assets/seedVerifiedAssets';
import { type RequestHandler, createBootServer } from './bootServer';
import { BridgeStore } from './bridge/BridgeStore';
import { loadConfig } from './config';
import { CosmosIndex } from './cosmos/CosmosIndex';
import { CosmosPoller, defaultCosmosRestUrl } from './cosmos/CosmosPoller';
import { decodeBlock } from './decoder/block';
import { FuelCoreClient } from './fuelcore/FuelCoreClient';
import { PriceClient } from './fuelcore/PriceClient';
import { FallbackHeights } from './hot/FallbackHeights';
import { HotKeys } from './hot/HotKeys';
import { makePinnedHeights } from './hot/pinnedHeights';
import { Index } from './index/Index';
import { Indexer } from './index/Indexer';
import { TipTracker } from './index/TipTracker';
import { L1Index } from './l1/L1Index';
import { L1Poller } from './l1/L1Poller';
import { createL1Client } from './l1/createL1Client';
import type { BridgeRouteDeps, StakingRouteDeps } from './rest/router';
import { RpcBlockSource, withStatusBlock } from './rpc/RpcBlockSource';
import { S3BlockSource, createS3Fetcher } from './s3/S3BlockSource';
import { createApp } from './server';
import { StakingStore } from './staking/StakingStore';
import { StakingAPY } from './staking/apy';
import { FinalizationPeriods } from './staking/finalization';
import { WithdrawProofCache, defaultCosmosIndexerUrl } from './staking/proof';
import { BlockStore } from './store/BlockStore';
import { DecodeWorkerPool } from './store/DecodeWorkerPool';

const CHAIN_PARAMS_RETRY_MAX_DELAY_MS = 30_000;
const PAUSE_BACKFILL_LAG_BLOCKS = 100;
const RESUME_BACKFILL_LAG_BLOCKS = 20;
const RESUMABLE_TIP_GAP_BLOCKS = 3600; // ~1h at 1s/block
const DISK_EVICT_INTERVAL_MS = 10 * 60 * 1000;
const RETENTION_SWEEP_INTERVAL_MS = 60 * 60 * 1000;
const HEALTH_LOG_INTERVAL_MS = 60 * 1000;
const HOT_DECAY_INTERVAL_MS = 60 * 60 * 1000;
const DISK_PROBE_INTERVAL_MS = 15 * 1000;
const SLOW_DISK_PROBE_MS = 1000;
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
  const INDEX_DB_PATH = join(cfg.dataDir, 'index.db');
  const client = new FuelCoreClient(cfg.fuelProvider);
  // Listen before chainParamsWithRetry so the healthcheck gets a 503 while
  // fuel-core is still unreachable.
  const { server: bootHttpServer, swap: swapHandler } = createBootServer();
  bootHttpServer.listen(cfg.port, () =>
    console.log(`boot: listening on ${cfg.port}, waiting for fuel-core`),
  );
  const params = await chainParamsWithRetry(client);
  console.log(`chainId=${params.chainId} baseAssetId=${params.baseAssetId}`);

  const index = new Index(INDEX_DB_PATH);
  const repaired = index.deleteAboveRange();
  console.log(`index repair: deleted ${repaired} rows above indexed_to`);
  // Fire-and-forget: backfills registry-known SRC20 assets for this chain so
  // assetsByContract/asset can serve a contract deployed before this process
  // ever started, without blocking boot on a verified-assets.fuel.network fetch.
  void seedVerifiedAssets(index, VerifiedAssets.getInstance(), params.chainId)
    .then((n) => console.log(`asset seed: ${n} registry assets seeded`))
    .catch((e) => console.error('asset seed failed, boot continuing', e));
  console.log(`block source: ${cfg.blockSource}`);
  const hot = new HotKeys(INDEX_DB_PATH);
  const fallbackHeights = new FallbackHeights();
  const pinned = makePinnedHeights(hot, index, fallbackHeights);
  // Under s3 the rpc source only serves heights the archive lacks, so it
  // gets its own, higher budget.
  const rpcSource = new RpcBlockSource(
    client,
    cfg.blockSource === 'rpc'
      ? cfg.rpcMaxBlocksPerSecond
      : cfg.rpcFallbackMaxBlocksPerSecond,
  );
  // Only the archive path decodes protobuf; the rpc loader gets GQL-shaped
  // blocks from the node.
  const pool =
    cfg.blockSource === 's3' && cfg.decodeWorkers > 0
      ? new DecodeWorkerPool({
          size: cfg.decodeWorkers,
          chainId: params.chainId,
          fee: params.fee,
        })
      : undefined;
  console.log(`decode workers: ${pool ? cfg.decodeWorkers : 'inline'}`);
  const store = new BlockStore(
    cfg.blockSource === 'rpc'
      ? {
          loader: (height) => rpcSource.load(height),
          normalize: withStatusBlock,
          dataDir: cfg.dataDir,
          memoryBytes: cfg.memoryCacheBytes,
          diskBytes: cfg.diskCacheBytes,
          concurrency: cfg.s3Concurrency,
          pinned,
        }
      : {
          source: new S3BlockSource(
            createS3Fetcher({
              bucket: cfg.s3Bucket,
              region: cfg.awsRegion,
              endpoint: cfg.s3Endpoint,
            }),
          ),
          decode: (bytes) =>
            decodeBlock(bytes, { chainId: params.chainId, fee: params.fee }),
          pool,
          fallback: (height) => rpcSource.load(height),
          dataDir: cfg.dataDir,
          memoryBytes: cfg.memoryCacheBytes,
          diskBytes: cfg.diskCacheBytes,
          concurrency: cfg.s3Concurrency,
          pinned,
        },
  );
  // batch bounds backfillStep's peak transient heap: BlockStore.getRange
  // holds every block in the batch decoded and resident until all of them
  // resolve, on top of whatever's already in the memory cache -- see
  // config.ts's comments on BACKFILL_BATCH and MEMORY_CACHE_BYTES for the
  // measured memory math this default was sized against.
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
    // Shares cfg.backfillBatch with the Indexer above (default 10, not
    // TipTracker's own default of 20): after a large tip-gap reset
    // (index.clearRange() above), lag is 0 and backfill is not paused, so
    // this tracker's getRange batch and backfillStep's getRange batch can
    // both be in flight at once. Leaving this unset let peak resident
    // decoded blocks reach batch(backfill) + TipTracker's own hardcoded 20,
    // silently exceeding the memory math documented in config.ts.
    batch: cfg.backfillBatch,
    // Backfill and forward catch-up share one CPU. When the tracker falls
    // far behind, pausing backfill gives catch-up the room to beat the
    // chain; resume only once the lag has come well back down, so the two
    // don't thrash pause/resume around one threshold.
    onLag: (lag) => {
      if (lag > PAUSE_BACKFILL_LAG_BLOCKS) indexer.pause();
      else if (lag <= RESUME_BACKFILL_LAG_BLOCKS) indexer.resume();
    },
  });
  const price = new PriceClient({ apiKey: cfg.coingeckoApiKey });

  const cosmosIndex = new CosmosIndex(INDEX_DB_PATH);
  const cosmosRestBase =
    cfg.cosmosRestUrl ?? defaultCosmosRestUrl(cfg.fuelProvider);
  console.log(`cosmos rest: ${cosmosRestBase}`);
  const cosmosPoller = new CosmosPoller({
    index: cosmosIndex,
    restBase: cosmosRestBase,
    startHeight: cfg.cosmosStartHeight,
    onLog: (m) => console.log(m),
  });

  // /staking/apy only needs the sequencer's cosmos REST API, not L1
  // ingestion, so it's constructed unconditionally instead of gated behind
  // ETH_RPC_URL like the rest of `staking` below.
  const apy = new StakingAPY(cosmosRestBase);

  // Without ETH_RPC_URL the L1 poller is disabled; staking/bridge endpoints
  // built on top of it are expected to 503.
  let l1Index: L1Index | null = null;
  let l1Poller: L1Poller | null = null;
  let l1Health: { enabled: boolean; cursors: () => Record<string, number> } = {
    enabled: false,
    cursors: () => ({}),
  };
  // Gates /staking/events, /staking/events/:id and /staking/finalization-period/*:
  // without ETH_RPC_URL there's no L1 index to serve staking history from,
  // so the router returns 503 for those instead of wiring this up.
  let staking: StakingRouteDeps | null = null;
  // Gates /bridge/deposit/logs, /bridge/block/hashes and
  // /bridge/message/relayed/hash: same L1 index as staking, so the same
  // ETH_RPC_URL gate applies.
  let bridge: BridgeRouteDeps | null = null;
  if (cfg.ethRpcUrl) {
    const idx = new L1Index(INDEX_DB_PATH);
    idx.seed(cfg.fuelChain, cfg.l1StartBlock);
    l1Index = idx;
    // One long-lived viem client for the whole process, shared by every
    // consumer that talks to L1 (L1Poller here, FinalizationPeriods below)
    // instead of each constructing its own -- FinalizationPeriods used to
    // rebuild one on every cache-miss call.
    const l1Client = createPublicClient({ transport: http(cfg.ethRpcUrl) });
    l1Poller = new L1Poller({
      index: idx,
      client: createL1Client(l1Client),
      network: cfg.fuelChain,
      onLog: (m) => console.log(m),
    });
    l1Health = {
      enabled: true,
      cursors: () =>
        Object.fromEntries(
          idx.contracts(cfg.fuelChain).map((c) => [c.name, c.block_height]),
        ),
    };
    console.log(`l1 poller: enabled, chain=${cfg.fuelChain}`);

    const finalization = new FinalizationPeriods(
      l1Client,
      cfg.fuelChain,
      cosmosRestBase,
    );
    const proofCache = new WithdrawProofCache(
      cfg.cosmosIndexerUrl ?? defaultCosmosIndexerUrl(cfg.fuelChain),
    );
    const stakingStore = new StakingStore({
      l1Index: idx,
      cosmosIndex,
      finalization,
      proofCache,
    });
    staking = { enabled: true, store: stakingStore, finalization };

    const bridgeStore = new BridgeStore({ l1Index: idx });
    bridge = { enabled: true, store: bridgeStore };
  }

  const { server: appServer, health } = createApp({
    store,
    index,
    tip,
    client,
    chain: { chainId: params.chainId, baseAssetId: params.baseAssetId },
    price,
    hot,
    fallbackHeights,
    indexer,
    blockSource: cfg.blockSource,
    cosmos: cosmosPoller,
    l1: l1Health,
    staking,
    apy,
    bridge,
    publicUrl: cfg.publicUrl,
  });
  swapHandler(appServer.listeners('request')[0] as RequestHandler);
  console.log(`api-lite listening on ${cfg.port}`);

  tip.start();
  indexer.start();
  cosmosPoller.start();
  l1Poller?.start();
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
    void indexer
      .retention()
      .then((n) => n && console.log(`retention: ${n} rows`))
      .catch((e) => console.error('retention sweep failed', e));
  }, RETENTION_SWEEP_INTERVAL_MS);
  setInterval(() => hot.decay(), HOT_DECAY_INTERVAL_MS);
  const loopDelay = monitorEventLoopDelay({ resolution: 20 });
  loopDelay.enable();
  setInterval(() => {
    console.log(
      JSON.stringify({
        ...health(),
        backfillBps: indexer.backfillRate(),
        loopMaxMs: Math.round(loopDelay.max / 1e6),
      }),
    );
    loopDelay.reset();
  }, HEALTH_LOG_INTERVAL_MS);
  setInterval(
    () => void probeDisk(join(cfg.dataDir, '.probe')),
    DISK_PROBE_INTERVAL_MS,
  );

  const shutdown = () => {
    tip.stop();
    indexer.stop();
    cosmosPoller.stop();
    l1Poller?.stop();
    bootHttpServer.close();
    index.close();
    hot.close();
    cosmosIndex.close();
    l1Index?.close();
    process.exit(0);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

// Times a 4 KB write plus fsync on the data volume, off the event loop, so a
// stalled volume shows up in the logs next to the loopMaxMs status field.
async function probeDisk(path: string) {
  const t = performance.now();
  try {
    const fh = await fsp.open(path, 'w');
    try {
      await fh.write(Buffer.alloc(4096, 1));
      await fh.sync();
    } finally {
      await fh.close();
    }
  } catch (e) {
    console.log(`disk probe failed: ${(e as Error).message}`);
    return;
  }
  const ms = Math.round(performance.now() - t);
  if (ms >= SLOW_DISK_PROBE_MS)
    console.log(`disk probe: 4 KB write+fsync took ${ms}ms`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
