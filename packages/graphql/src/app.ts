import { setTimeout } from 'node:timers/promises';
import { env } from './config';
import { GraphQLServer } from './graphql/GraphQLServer';
import { db } from './infra/database/Db';
import { QueueNames, queue } from './infra/queue/Queue';
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

  if (env.get('DB_MIGRATE')) {
    console.log('📦 Running database migrations...');
    await db.migrate();
  }

  if (env.get('SYNC_MISSING')) {
    console.log('🕐 Syncing missing blocks in 5 seconds...');
    await setTimeout(5000);
    await queue.push(QueueNames.SYNC_MISSING, undefined);
  }
});
