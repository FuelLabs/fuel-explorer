import { setTimeout } from 'node:timers/promises';
import NewAddBlockRange from './application/uc/NewAddBlockRange';
import { logger } from './core/Logger';
import { client } from './graphql/GraphQLSDK';
import BlockDAO from './infra/dao/BlockDAO';

const FUEL_CORE_TIMEOUT_MS = 5000;
const BACKOFF_INITIAL_MS = 1000;
const BACKOFF_MAX_MS = 5000;
const BATCH_SIZE = 25;
const MAX_RANGE = 1000;
const CONCURRENCY = 6;

function createBatchEvents(idsRange: { from: number; to: number }) {
  const diff = idsRange.to - idsRange.from;
  const numberOfBatches = Math.ceil(diff / BATCH_SIZE);
  return Array.from({ length: numberOfBatches }).map((_, page) => {
    const from = idsRange.from + page * BATCH_SIZE;
    const to = from + BATCH_SIZE;
    return { from, to };
  });
}

async function main() {
  const addBlockRange = new NewAddBlockRange();
  const blockDAO = new BlockDAO();
  let backoffMs = BACKOFF_INITIAL_MS;

  while (true) {
    let blocks: any;
    const startTime = Date.now();
    try {
      logger.debug('Syncer', 'Fetching the latest block');
      const response = await Promise.race([
        client.sdk.blocks({ last: 1 }),
        setTimeout(FUEL_CORE_TIMEOUT_MS).then(() => null),
      ]);
      const latencyMs = Date.now() - startTime;
      if (!response || !response.data) {
        logger.warn(
          'Syncer',
          `Fuel core timeout after ${FUEL_CORE_TIMEOUT_MS}ms, backing off ${backoffMs}ms`,
        );
        await setTimeout(backoffMs);
        backoffMs = Math.min(backoffMs * 2, BACKOFF_MAX_MS);
        continue;
      }
      logger.debug('Syncer', `Fuel core response time: ${latencyMs}ms`);
      backoffMs = BACKOFF_INITIAL_MS;
      blocks = response.data.blocks;
    } catch (e: any) {
      const latencyMs = Date.now() - startTime;
      logger.error(
        'Syncer',
        `Could not fetch blocks from fuel core after ${latencyMs}ms, backing off ${backoffMs}ms`,
        e,
      );
      await setTimeout(backoffMs);
      backoffMs = Math.min(backoffMs * 2, BACKOFF_MAX_MS);
      continue;
    }

    const lastBlock = blocks.nodes[0];
    const height = Number(lastBlock?.header.height ?? '0');
    logger.debug('Syncer', `Fuel core height: ${height}`);

    const from = (await blockDAO.findLatestBlockHeight()) ?? 0;
    logger.debug('Syncer', `Indexer height: ${from}`);

    if (from >= height) {
      await setTimeout(500);
      continue;
    }

    const to = from + MAX_RANGE;
    const range = { from, to: Math.min(to, height) };
    const events = createBatchEvents(range);

    // Process batches sequentially in chunks of CONCURRENCY.
    // Each chunk processes contiguous ranges concurrently via Promise.all.
    // If any batch in a chunk fails, the entire chunk is considered failed
    // and the loop restarts — idempotency guards in NewAddBlockRange
    // safely skip already-indexed blocks on retry.
    let failed = false;
    for (let i = 0; i < events.length && !failed; i += CONCURRENCY) {
      const chunk = events.slice(i, i + CONCURRENCY);
      try {
        await Promise.all(
          chunk.map(async (event) => {
            logger.debug(
              'Syncer',
              `Processing blocks #${event.from} - #${event.to}`,
            );
            await addBlockRange.execute(event);
          }),
        );
      } catch (err: any) {
        const is429 = err?.status === 429 || /\b429\b/.test(err?.message);
        const errBackoff = is429 ? 10000 : 2000;
        logger.error(
          'Syncer',
          `Failed to process batch${is429 ? ' (rate limited)' : ''}: ${err.message}`,
        );
        await setTimeout(errBackoff);
        failed = true;
      }
    }
  }
}

main().catch(async (error: any) => {
  logger.error('Syncer', 'Uncaught error', error);
  logger.error('Syncer', 'Process exit');
  process.exit(1);
});
