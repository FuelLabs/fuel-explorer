import cors from 'cors';
import type { Express } from 'express';
import express from 'express';

export class Server {
  setup() {
    const app = express();
    app.use(cors<cors.CorsRequest>());
    app.use(express.json());
    return app;
  }

  async listen(app: Express, port: number) {
    return new Promise((resolve) => {
      app.listen(port, async () => {
        resolve(null);
      });
    });
  }
}
