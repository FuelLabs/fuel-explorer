import cors from 'cors';
import { Express } from 'express';
import express from 'express';
import { serve } from 'inngest/express';
import { functions } from '~/application/functions';
import { db } from '../database/Db';
import { inngest } from '../inngest/InngestClient';

export class Server {
  setup() {
    const app = express();
    app.use(cors<cors.CorsRequest>());
    app.use(express.json());
    app.use('/api/inngest', serve({ client: inngest.client(), functions }));
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
