import { setTimeout } from 'node:timers/promises';
import NewAddBlockRange from './application/uc/NewAddBlockRange';
import { logger } from './core/Logger';
import { client } from './graphql/GraphQLSDK';
import type { GQLBlock } from './graphql/generated/sdk';
import BlockDAO from './infra/dao/BlockDAO';

const FUEL_CORE_TIMEOUT_MS = 5000;
const BACKOFF_INITIAL_MS = 1000;
const BACKOFF_MAX_MS = 5000;
const BATCH_SIZE = 10;
const MAX_RANGE = 1000;
const CONCURRENCY = 10;

function createBatchEvents(idsRange: { from: number; to: number }) {
  const diff = idsRange.to - idsRange.from;
  const numberOfBatches = Math.ceil(diff / BATCH_SIZE);
  return Array.from({ length: numberOfBatches }).map((_, page) => {
    const from = idsRange.from + page * BATCH_SIZE;
    const to = Math.min(from + BATCH_SIZE, idsRange.to);
    return { from, to };
  });
}

function fetchLatestHeight(): Promise<number | null> {
  const p = Promise.race([
    client.sdk.blocks({ last: 1 }),
    setTimeout(FUEL_CORE_TIMEOUT_MS).then(() => null),
  ]).then((response) => {
    if (!response || !response.data) return null;
    const lastBlock = response.data.blocks.nodes[0];
    return Number(lastBlock?.header.height ?? '0');
  });
  p.catch(() => {});
  return p;
}

async function main() {
  const addBlockRange = new NewAddBlockRange();
  const blockDAO = new BlockDAO();
  let backoffMs = BACKOFF_INITIAL_MS;
  let cursor = (await blockDAO.findLatestBlockHeight()) ?? 0;

  let prefetchedBlocks: Promise<{
    blocks: GQLBlock[];
    from: number;
    to: number;
  }> | null = null;
  let heightPromise: Promise<number | null> = fetchLatestHeight();

  let statsBlockCount = 0;
  let statsStartTime = Date.now();
  const STATS_INTERVAL_MS = 30_000;

  function startPrefetch(from: number, to: number) {
    const p = addBlockRange.getBlocks(from, to).then((blocks) => {
      return { blocks, from, to };
    });
    p.catch(() => {});
    return p;
  }

  while (true) {
    const startTime = Date.now();
    let height: number;
    try {
      const result = await heightPromise;
      const latencyMs = Date.now() - startTime;
      if (result === null) {
        logger.warn(
          'Syncer',
          `Fuel core timeout after ${latencyMs}ms, backing off ${backoffMs}ms`,
        );
        await setTimeout(backoffMs);
        backoffMs = Math.min(backoffMs * 2, BACKOFF_MAX_MS);
        prefetchedBlocks = null;
        heightPromise = fetchLatestHeight();
        continue;
      }
      logger.debug('Syncer', `Fuel core response time: ${latencyMs}ms`);
      backoffMs = BACKOFF_INITIAL_MS;
      height = result;
    } catch (e: any) {
      const latencyMs = Date.now() - startTime;
      logger.error(
        'Syncer',
        `Could not fetch blocks from fuel core after ${latencyMs}ms, backing off ${backoffMs}ms`,
        e,
      );
      await setTimeout(backoffMs);
      backoffMs = Math.min(backoffMs * 2, BACKOFF_MAX_MS);
      prefetchedBlocks = null;
      heightPromise = fetchLatestHeight();
      continue;
    }

    logger.debug('Syncer', `Fuel core height: ${height}`);
    logger.debug('Syncer', `Indexer height: ${cursor}`);

    if (cursor >= height) {
      if (height < cursor) {
        logger.warn(
          'Syncer',
          `Fuel core is behind indexer (${height} < ${cursor}), waiting for node to catch up`,
        );
        await setTimeout(5000);
      } else {
        await setTimeout(100);
      }
      prefetchedBlocks = null;
      heightPromise = fetchLatestHeight();
      continue;
    }

    const to = cursor + MAX_RANGE;
    const range = { from: cursor, to: Math.min(to, height) };
    const events = createBatchEvents(range);

    let failed = false;
    for (let i = 0; i < events.length && !failed; i += CONCURRENCY) {
      const chunk = events.slice(i, i + CONCURRENCY);

      // Fetch all batches in this chunk concurrently
      // Reuse prefetched data only if its range covers the event's range
      const fetchPromises = chunk.map(async (event, idx) => {
        if (idx === 0 && prefetchedBlocks) {
          const p = prefetchedBlocks;
          prefetchedBlocks = null;
          try {
            const prefetched = await p;
            if (prefetched.from === event.from && prefetched.to >= event.to) {
              return prefetched;
            }
          } catch {}
        }
        return startPrefetch(event.from, event.to);
      });

      const fetched = await Promise.allSettled(fetchPromises);

      // Start prefetching the NEXT chunk's first batch while we process this one
      // Also prefetch the height check concurrently
      heightPromise = fetchLatestHeight();
      const nextChunkStart = i + CONCURRENCY;
      if (nextChunkStart < events.length) {
        prefetchedBlocks = startPrefetch(
          events[nextChunkStart].from,
          events[nextChunkStart].to,
        );
      } else {
        // Speculatively prefetch next 2 blocks (small window — large ranges
        // past the tip make Fuel Core very slow)
        const nextFrom = chunk[chunk.length - 1].to;
        const nextTo = nextFrom + 2;
        prefetchedBlocks = startPrefetch(nextFrom, nextTo);
      }

      // Process all fetched batches concurrently
      const results = await Promise.allSettled(
        fetched.map(async (fetchResult) => {
          if (fetchResult.status === 'rejected') throw fetchResult.reason;
          const { blocks, from: bFrom, to: bTo } = fetchResult.value;
          logger.debug('Syncer', `Processing blocks #${bFrom} - #${bTo}`);
          return addBlockRange.processBlocks(blocks, bFrom, bTo);
        }),
      );

      let hasFailure = false;
      for (let j = 0; j < results.length; j++) {
        if (results[j].status === 'fulfilled') {
          const highest = (results[j] as PromiseFulfilledResult<number | null>)
            .value;
          const prevCursor = cursor;
          if (!hasFailure) cursor = highest ?? chunk[j].to;
          statsBlockCount += cursor - prevCursor;
        } else {
          hasFailure = true;
          const err = (results[j] as PromiseRejectedResult).reason;
          const is429 = err?.status === 429 || /\b429\b/.test(err?.message);
          logger.error(
            'Syncer',
            `Failed batch #${chunk[j].from}-#${chunk[j].to}${is429 ? ' (rate limited)' : ''}: ${err?.message}`,
          );
        }
      }

      const now = Date.now();
      if (now - statsStartTime >= STATS_INTERVAL_MS) {
        const elapsed = (now - statsStartTime) / 1000;
        const bps = (statsBlockCount / elapsed).toFixed(1);
        logger.info(
          'Syncer',
          `[stats] blocks=${statsBlockCount} elapsed=${elapsed.toFixed(0)}s throughput=${bps} blocks/sec cursor=${cursor} behind=${height - cursor}`,
        );
        statsBlockCount = 0;
        statsStartTime = now;
      }

      if (hasFailure) {
        await setTimeout(2000);
        failed = true;
        prefetchedBlocks = null;
        heightPromise = fetchLatestHeight();
      }
    }
  }
}

main().catch(async (error: any) => {
  logger.error('Syncer', 'Uncaught error', error);
  logger.error('Syncer', 'Process exit');
  process.exit(1);
});
