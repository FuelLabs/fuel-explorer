import { setTimeout } from 'node:timers/promises';
import { env } from './config';
import { QueueNames, queue } from './infra/queue/Queue';
import { Server } from './infra/server/App';

const httpServer = new Server();
const app = httpServer.setup();

httpServer.listen(app, 3001).then(async () => {
  await queue.setupWorkers();
  console.log('📟 Sync running on http://localhost:3001');

  if (env.get('SYNC_MISSING')) {
    console.log('🕐 Syncing missing blocks in 5 seconds...');
    await setTimeout(5000);
    await queue.push(QueueNames.SYNC_MISSING, undefined);
  }

  const others = [
    'SIGINT',
    'SIGUSR1',
    'SIGUSR2',
    // 'uncaughtException',
    'SIGTERM',
    'exit',
  ];
  //biome-ignore lint/complexity/noForEach: <explanation>
  others.forEach((eventType) => {
    process.on(eventType, async (err) => {
      console.log('🛑 Queue stopped');
      console.error(err);
      await queue.stop();
    });
  });
});
