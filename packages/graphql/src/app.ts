import { env } from './config';
import { GraphQLServer } from './graphql/GraphQLServer';
import { db } from './infra/database/Db';
import { Server } from './infra/server/App';

const port = Number(env.get('SERVER_PORT'));
const graphQLServer = new GraphQLServer();

const schema = graphQLServer.schema();
const yoga = graphQLServer.setup(schema);
const httpServer = new Server();
const app = httpServer.setup();

app.use(yoga.graphqlEndpoint, yoga);
httpServer.listen(app, port).then(async () => {
  const client = await db.connect();
  console.log(
    `📟 GraphQL server is running on http://localhost:${port}${yoga.graphqlEndpoint}`,
  );

  process.on('SIGINT', async () => {
    await db.close(client);
    process.exit(0);
  });
});
