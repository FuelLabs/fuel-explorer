import cors from 'cors';
import { Express } from 'express';
import express from 'express';
import { serve } from 'inngest/express';
import { db } from '../database/Db';
import { inngest } from '../inngest/InngestClient';
import { inngestFunctions } from '../inngest/functions';

export class Server {
  setup() {
    const app = express();
    const inngestHandler = serve({
      client: inngest.client(),
      functions: inngestFunctions,
    });

    app.use(cors<cors.CorsRequest>());
    app.use(express.json());
    app.use('/api/inngest', inngestHandler);
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
