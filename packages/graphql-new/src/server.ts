import { GraphQLServer } from './core/GraphQLServer';
import { Server } from './core/Server';
import { requireEnv } from './utils/require-env';

const env = requireEnv([['SERVER_PORT', '4000']]);
const port = Number(env.SERVER_PORT);

const graphQLServer = new GraphQLServer();
const schema = graphQLServer.schema();
const yoga = graphQLServer.setup(schema);

const httpServer = new Server();
const app = httpServer.setup();

app.use(yoga.graphqlEndpoint, yoga);
httpServer.listen(app, port).then(() => {
  console.log(`📟 Server is running on http://localhost:${port}`);
});
