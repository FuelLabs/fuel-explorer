import { logger } from './core/Logger';
import { QueueNames, mq } from './infra/queue/Queue';

async function main() {
  await mq.connect();
  await mq.assert(QueueNames.ADD_BLOCK_RANGE);
  await mq.setup();
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
