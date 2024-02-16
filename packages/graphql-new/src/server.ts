import { GraphQLServer } from './core/GraphQLServer';
import { Server } from './core/Server';
import { EnvHelper } from './helpers/env';

const env = EnvHelper.requireEnv([['SERVER_PORT', '3002']]);
const port = Number(env.SERVER_PORT);

const graphQLServer = new GraphQLServer();
const schema = graphQLServer.schema();
const yoga = graphQLServer.setup(schema);

const httpServer = new Server();
const app = httpServer.setup();

app.use(yoga.graphqlEndpoint, yoga);
httpServer.listen(app, port).then(() => {
  console.log(
    `📟 GraphQL server is running on http://localhost:${port}${yoga.graphqlEndpoint}`,
  );
});
