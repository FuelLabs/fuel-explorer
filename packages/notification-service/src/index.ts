import type { Request, Response } from 'express';
import express from 'express';

const notificationServer = express();
const port = 3005;

notificationServer.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

notificationServer.listen(port, () => {
  console.log(`Notification server running at http://localhost:${port}`);
});
