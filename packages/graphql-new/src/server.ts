import { Server } from './core/Server';
import { requireEnv } from './utils/require-env';

const env = requireEnv([['SERVER_PORT', '4000']]);

const port = Number(env.SERVER_PORT);
const server = new Server();
const app = server.setup();

server.listen(app, port).then(() => {
  console.log(`📟 Server is running on http://localhost:${port}`);
});
