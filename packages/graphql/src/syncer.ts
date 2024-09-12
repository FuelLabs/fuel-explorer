import { setTimeout } from 'node:timers/promises';
import { logger } from './core/Logger';
import { client } from './graphql/GraphQLSDK';
import BlockDAO from './infra/dao/BlockDAO';
import { QueueNames, mq } from './infra/queue/Queue';

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
  while (true) {
    const total = await mq.getActive(QueueNames.ADD_BLOCK_RANGE);
    if (total > 0) {
      logger.info(
        `⌛️ Waiting messages to be consume: ${total} messages left logger`,
      );
      await setTimeout(5000);
      continue;
    }
    let blocks: any;
    try {
      const { data } = await client.sdk.blocks({ last: 1 });
      blocks = data.blocks;
    } catch (e: any) {
      logger.error('❌ Error fetching blocks from fuel core', e);
      await setTimeout(5000);
      continue;
    }
    const lastBlock = blocks.nodes[0];
    const height = Number(lastBlock?.header.height ?? '0');
    const blockDAO = new BlockDAO();
    const latestBlock = await blockDAO.findLatestBlockAdded();
    const from = latestBlock ? latestBlock.id : 0;
    const to = from + 10000;
    const range = { from, to: Math.min(to, height) };
    const events = createBatchEvents(range);
    for (const event of events) {
      await mq.send('block', QueueNames.ADD_BLOCK_RANGE, event);
    }
    await setTimeout(5000);
  }
}

main().catch(async (error: any) => {
  logger.error('❌ Uncaught error', error);
  try {
    await mq.disconnect();
  } catch (_error: any) {
    logger.error('❌ Could not disconnect from RabbitMQ');
  }
  process.exit(1);
});
