import cors from 'cors';
import { Express } from 'express';
import express from 'express';
import { db } from './Database';
import { GraphQLServer } from './GraphQLServer';

export class Server {
  setup() {
    const app = express();
    const graphQLServer = new GraphQLServer();
    const schema = graphQLServer.schema();
    const server = graphQLServer.setup(schema);

    app.use(cors<cors.CorsRequest>());
    app.use(express.json());
    app.use(server.graphqlEndpoint, server);

    return app;
  }

  async listen(app: Express, port: number) {
    await db.connect();
    return new Promise((resolve) => {
      app.listen(port, () => {
        resolve(null);
      });
    });
  }
}
