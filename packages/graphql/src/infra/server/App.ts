import cors from 'cors';
import express from 'express';

export class Server {
  setup() {
    const app = express();
    app.use(cors<cors.CorsRequest>());
    app.use(express.json());
    return app;
  }

  async listen(app: any, port: number) {
    return new Promise((resolve) => {
      app.listen(port, async () => {
        resolve(null);
      });
    });
  }
}
