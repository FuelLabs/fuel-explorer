import { Server, env } from '@fuel-indexer/core';
import { syncLastNodes } from './application/uc/SyncLastNodes';
import { syncMissingNodes } from './application/uc/SyncMissingNodes';
import { syncNode } from './application/uc/SyncNode';
import { syncNodes } from './application/uc/SyncNodes';
import { db } from './db';
import { QueueNames, queue } from './queue';

const httpServer = new Server();
const app = httpServer.setup();
const port = Number(env.get('SERVER_PORT'));

httpServer.listen(app, port).then(async () => {
  await db.connect();
  console.log(`📟 Server is running on http://localhost:${port}`);

  if (env.get('DB_MIGRATE')) {
    console.log('📦 Running database migrations...');
    await db.migrate();
    console.log('✅ Database migrations completed');
  }

  await queue.start();
  queue.setWorkOpts('teamSize', 250);

  await queue.work(QueueNames.SYNC_NODE, queue.workOpts, syncNode);
  await queue.work(QueueNames.SYNC_NODES, queue.workOpts, syncNodes);
  await queue.work(QueueNames.SYNC_MISSING, queue.workOpts, syncMissingNodes);
  await queue.work(QueueNames.SYNC_LAST, queue.workOpts, syncLastNodes);
  console.log('⚡️ Queue is running');
});
