import cors from 'cors';
import { Express } from 'express';
import express from 'express';
import { db } from './Database';
import { inngest } from './Inngest';

export class Server {
  setup() {
    const app = express();
    app.use(cors<cors.CorsRequest>());
    app.use(express.json());
    app.use('/api/inngest', inngest.setup());
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
