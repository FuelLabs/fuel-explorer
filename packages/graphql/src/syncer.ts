import { setTimeout } from 'node:timers/promises';
import { QueueNames, queue } from './infra/queue/Queue';
import { Server } from './infra/server/App';

const httpServer = new Server();
const app = httpServer.setup();

httpServer.listen(app, 3001).then(async () => {
  await queue.setupWorkers();
  console.log('📟 Sync running on http://localhost:3001');

  console.log('🕐 Syncing missing blocks in 5 seconds...');
  await setTimeout(5000);
  await queue.push(QueueNames.SYNC_MISSING, undefined);
});
