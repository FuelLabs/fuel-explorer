import { setTimeout } from 'node:timers/promises';
import { env } from './config';
import { logger } from './core/Logger';
import { QueueNames, mq } from './infra/queue/Queue';
import { Server } from './infra/server/App';

const httpServer = new Server();
const app = httpServer.setup();
const port = Number(env.get('SYNCER_PORT'));

httpServer.listen(app, port).then(async () => {
  await mq.setup();
  logger.info(`📟 Sync running on http://localhost:${port}`);

  if (env.get('SYNC_MISSING')) {
    logger.info('🕐 Syncing missing blocks in 5 seconds...');
    await setTimeout(5000);
    await mq.send('main', QueueNames.SYNC_MISSING);
    logger.info('📝 Syncer logs will be available in logs/syncer.log file');
  }

  const others = ['SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'];
  //biome-ignore lint/complexity/noForEach: <explanation>
  others.forEach((eventType) => {
    process.on(eventType, async (err) => {
      await mq.disconnect();
      logger.error('Syncer shutdown error', err);
      process.exit(1);
    });
  });
});
