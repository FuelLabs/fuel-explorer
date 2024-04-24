import { Server, env } from '@fuel-indexer/core';
import { db } from './db';
import { queue } from './queue';

const port = Number(env.get('SERVER_PORT'));

const httpServer = new Server();
const app = httpServer.setup();

httpServer.listen(app, port).then(async () => {
  await db.connect();
  await queue.setupWorkers();
  console.log(`📟 Server is running on http://localhost:${port}`);

  if (env.get('DB_MIGRATE')) {
    console.log('📦 Running database migrations...');
    await db.migrate();
  }
});
