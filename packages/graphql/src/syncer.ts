import { setTimeout } from 'node:timers/promises';
import { logger } from './core/Logger';
import { BlockRepository } from './domain/Block/BlockRepository';
import { client } from './graphql/GraphQLSDK';
import { db } from './infra/database/Db';
import { QueueNames, mq } from './infra/queue/Queue';

function createBatchEvents(idsRange: any, lastHeight: any) {
  const offset = 10;
  const diff = idsRange.to - idsRange.from;
  const numberOfBatches = Math.ceil(diff / offset);
  const events = Array.from({ length: numberOfBatches }).map((_, page) => {
    const from = idsRange.from + page * offset;
    let to = from + offset;
    to = to > lastHeight ? lastHeight : to;
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
      console.log('messages', total);
      await setTimeout(5000);
      continue;
    }
    const { data } = await client.sdk.blocks({ last: 1 });
    const lastBlock = data.blocks.nodes[0];
    const height = Number(lastBlock?.header.height ?? '0');
    const conn = await db.conn();
    const repo = new BlockRepository(conn);
    const latest = await repo.findLatestAdded();
    const cursor = latest ? Number(latest.data.header.height) : 0;
    const from = cursor;
    const to = cursor + 10000;
    const range = { from, to: to > height ? height : to };
    const events = createBatchEvents(range, height);
    for (const event of events) {
      await mq.send('block', QueueNames.ADD_BLOCK_RANGE, event);
    }
    await setTimeout(5000);
  }
}

(async () => {
  await main();

  const others = ['SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'];
  //biome-ignore lint/complexity/noForEach: <explanation>
  others.forEach((eventType) => {
    process.on(eventType, async (err) => {
      await mq.disconnect();
      logger.error('❌ GraphQL shutdown error', err);
      process.exit(1);
    });
  });
})();
