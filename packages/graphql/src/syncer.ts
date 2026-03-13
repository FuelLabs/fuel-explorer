import { setTimeout } from 'node:timers/promises';
import { logger } from './core/Logger';
import { client } from './graphql/GraphQLSDK';
import BlockDAO from './infra/dao/BlockDAO';
import { QueueNames, mq } from './infra/queue/Queue';

const FUEL_CORE_TIMEOUT_MS = 5000;
const BACKOFF_INITIAL_MS = 1000;
const BACKOFF_MAX_MS = 30000;

function createBatchEvents(idsRange: { from: number; to: number }) {
  const offset = 10;
  const diff = idsRange.to - idsRange.from;
  const numberOfBatches = Math.ceil(diff / offset);
  const events = Array.from({ length: numberOfBatches }).map((_, page) => {
    const from = idsRange.from + page * offset;
    const to = from + offset;
    return { from, to };
  });
  return events;
}

async function main() {
  await mq.connect();
  await mq.assert(QueueNames.ADD_BLOCK_RANGE);
  let backoffMs = BACKOFF_INITIAL_MS;
  while (true) {
    const total = await mq.getActive(QueueNames.ADD_BLOCK_RANGE);
    if (total > 50) {
      logger.debug(
        'Syncer',
        `Queue has ${total} messages, waiting for consumers to catch up`,
      );
      await setTimeout(500);
      continue;
    }
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
    const blockDAO = new BlockDAO();
    const latestBlock = await blockDAO.findLatestBlockAdded();
    const from = latestBlock ? latestBlock.id : 0;
    logger.debug('Syncer', `Indexer height: ${from}`);
    if (from >= height) {
      await setTimeout(500);
      continue;
    }
    const to = from + 1000;
    const range = { from, to: Math.min(to, height) };
    const events = createBatchEvents(range);
    for (const event of events) {
      logger.debug(
        'Syncer',
        `Sending message to indexer/add-block-range #${event.from} - #${event.to}`,
      );
      await mq.send('block', QueueNames.ADD_BLOCK_RANGE, event);
    }
  }
}

main().catch(async (error: any) => {
  logger.error('Syncer', 'Uncaught error', error);
  try {
    await mq.disconnect();
  } catch (_error: any) {
    logger.error('Syncer', 'Could not disconnect from RabbitMQ');
  }
  logger.error('Syncer', 'Process exit');
  process.exit(1);
});
