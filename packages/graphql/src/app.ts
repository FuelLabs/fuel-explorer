import { env } from './config';
import { logger } from './core/Logger';
import { GraphQLServer } from './graphql/GraphQLServer';
import { DatabaseConnection } from './infra/database/DatabaseConnection';
import { DatabaseConnectionReplica } from './infra/database/DatabaseConnectionReplica';
import { Server } from './infra/server/App';

(async () => {
  const port = Number(env.get('SERVER_PORT'));
  const graphQLServer = new GraphQLServer();
  const schema = graphQLServer.schema();
  const yoga = graphQLServer.setup(schema);
  const httpServer = new Server();
  const app = await httpServer.setup();
  DatabaseConnection.getInstance();
  DatabaseConnectionReplica.getInstance();

  app.use(yoga.graphqlEndpoint, yoga);
  httpServer.listen(app, port).then(async () => {
    logger.info(
      'GraphQL',
      `Server is running on http://localhost:${port}${yoga.graphqlEndpoint}`,
    );

    const others = ['SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'];
    //biome-ignore lint/complexity/noForEach: <explanation>
    others.forEach((eventType) => {
      process.on(eventType, async (err) => {
        logger.error('GraphQL', 'GraphQL shutdown error', err);
        process.exit(1);
      });
    });
  });
})();
