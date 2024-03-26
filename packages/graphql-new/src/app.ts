import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';
import { env } from './config';
import { GraphQLServer } from './graphql/GraphQLServer';
import { db } from './infra/database/Db';
import { inngest } from './infra/inngest/InngestClient';
import { Server } from './infra/server/App';

const port = Number(env.get('SERVER_PORT'));
const graphQLServer = new GraphQLServer();

const schema = graphQLServer.schema();
const yoga = graphQLServer.setup(schema);
const httpServer = new Server();
const app = httpServer.setup();

app.use(yoga.graphqlEndpoint, yoga);
httpServer.listen(app, port).then(async () => {
  console.log(
    `📟 GraphQL server is running on http://localhost:${port}${yoga.graphqlEndpoint}`,
  );

  if (process.env.START_INNGEST_SERVER) {
    console.log('🔗 Starting Inngest server');
    const ingestProcess = spawn('pnpm', [
      'inngest-cli',
      'dev',
      `-u http://localhost:${port}/api/inngest`,
    ]);
    ingestProcess.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    ingestProcess.stderr.on('data', (data) => {
      process.stdout.write(data);
    });
  }

  if (process.env.DB_MIGRATE) {
    console.log('📦 Running database migrations...');
    await db.migrate();
  }

  if (process.env.SYNC_MISSING) {
    console.log('🕐 Syncing missing blocks in 5 seconds...');
    await setTimeout(5000);
    await inngest.syncMissing();
  }
});
