import { setTimeout } from 'node:timers/promises';
import { env } from './config';
import { logger } from './core/Logger';
import { QueueNames, mq } from './infra/queue/Queue';

async function main() {
  await mq.setup();
  logger.info('🚀 Syncer is running');
  logger.info('----');

  if (env.get('SYNC_MISSING')) {
    logger.info('🕐 Syncing missing blocks in 5 seconds...');
    await setTimeout(5000);
    await mq.send('main', QueueNames.SYNC_MISSING);
    logger.info('📝 Syncer logs will be available in logs/syncer.log file');
  }
}

(async () => {
  await main();
})();
