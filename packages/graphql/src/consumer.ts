import { logger } from './core/Logger';
import { QueueNames, mq } from './infra/queue/Queue';

async function main() {
  await mq.connect();
  await mq.assert(QueueNames.ADD_BLOCK_RANGE);
  await mq.setup();
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
