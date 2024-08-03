import { setTimeout } from 'node:timers/promises';
import { logger } from './core/Logger';
import { QueueNames, mq } from './infra/queue/Queue';

async function main() {
  await mq.connect();
  await mq.assert(QueueNames.ADD_BLOCK_RANGE);
  await mq.send('block', QueueNames.ADD_BLOCK_RANGE, {
    from: 2921976,
    to: 2921976,
  });
  await setTimeout(5000);
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
