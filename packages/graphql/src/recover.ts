import { setTimeout } from 'node:timers/promises';
import { logger } from './core/Logger';
import { db } from './infra/database/Db';
import { QueueNames, mq } from './infra/queue/Queue';

async function main() {
  await mq.connect();
  await mq.assert(QueueNames.ADD_BLOCK_RANGE);
  while (true) {
    const res = (await db.execSQL(
      'select bs._id from (select generate_series(0, (select max(_id) from blocks)) as _id) as bs where bs._id not in (select _id from blocks)',
    )) as any;
    const { rows } = res;
    if (rows.length === 0) {
      logger.syncer.info('🔗 No blocks to recover');
    }
    rows.sort(() => Math.random() - 0.5);
    for (const row of rows.slice(0, 1000)) {
      await mq.send('block', QueueNames.ADD_BLOCK_RANGE, {
        from: row._id,
        to: row._id,
      });
      console.log(`Recovering block #${row._id}`);
    }
    await setTimeout(30000);
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
