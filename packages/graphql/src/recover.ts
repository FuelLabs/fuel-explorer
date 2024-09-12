import { setTimeout } from 'node:timers/promises';
import { logger } from './core/Logger';
import { client } from './graphql/GraphQLSDK';
import { DatabaseConnection } from './infra/database/DatabaseConnection';
import { QueueNames, mq } from './infra/queue/Queue';

async function main() {
  await mq.connect();
  await mq.assert(QueueNames.ADD_BLOCK_RANGE);
  const databaseConnection = DatabaseConnection.getInstance();
  while (true) {
    const { data } = await client.sdk.blocks({ last: 1 });
    const lastBlock = data.blocks.nodes[0];
    const height = Number(lastBlock?.header.height ?? '0');
    const pages = height / 10000;
    let cursor = 0;
    for (let page = 1; page < pages; page++) {
      const from = cursor;
      const to = Math.min(cursor + 10000, height);
      cursor = to;
      const res = (await databaseConnection.query(
        `select seq from generate_series(${from}, ${to}) as seq left join blocks b on (b._id = seq) where b._id is null`,
        [],
      )) as any;
      const { rows } = res;
      if (rows.length === 0) {
        logger.info(`🔗 No blocks to recover between #${from} and #${to}`);
      } else {
        logger.info(
          `🔗 Recovering ${rows.length} blocks between #${from} and #${to}`,
        );
      }
      for (const row of rows) {
        await mq.send('block', QueueNames.ADD_BLOCK_RANGE, {
          from: row.seq,
          to: row.seq,
        });
        console.log(`Recovering block #${row.seq}`);
      }
      await setTimeout(5000);
    }
    await setTimeout(60000);
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
