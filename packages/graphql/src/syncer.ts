import { setTimeout } from 'node:timers/promises';
import { env } from './config';
import { QueueNames, mq } from './infra/queue/Queue';
import { Server } from './infra/server/App';

const httpServer = new Server();
const app = httpServer.setup();
const port = Number(env.get('SYNCER_PORT'));

httpServer.listen(app, port).then(async () => {
  await mq.setup();
  console.log(`📟 Sync running on http://localhost:${port}`);

  if (env.get('SYNC_MISSING')) {
    console.log('🕐 Syncing missing blocks in 5 seconds...');
    await setTimeout(5000);
    await mq.send('main', QueueNames.SYNC_MISSING);
  }

  const others = ['SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM', 'beforeExit'];
  //biome-ignore lint/complexity/noForEach: <explanation>
  others.forEach((eventType) => {
    process.on(eventType, async (err) => {
      await mq.disconnect();
      console.error(err);
    });
  });
});
