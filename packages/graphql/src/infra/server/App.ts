import cors from 'cors';
import express, { Request, Response } from 'express';
import GetMetrics from '~/application/uc/GetMetrics';

export class Server {
  setup() {
    const app = express();
    app.use(cors<cors.CorsRequest>());
    app.use(express.json());

    app.get('/metrics', async (_req: Request, res: Response) => {
      const getMetrics = new GetMetrics();
      const output = await getMetrics.execute();
      const lines: any = [];
      for (const element in output) {
        lines.push(`${element} ${output[element]}`);
      }
      res.setHeader('content-type', 'text/plain');
      res.send(lines.join('\n'));
    });
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
