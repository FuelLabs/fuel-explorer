import cors from 'cors';
import { Express } from 'express';
import express from 'express';
import { db } from './Database';

export class Server {
  setup() {
    const app = express();
    app.use(cors<cors.CorsRequest>());
    app.use(express.json());
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
