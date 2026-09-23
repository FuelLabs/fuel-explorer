import {
  type IncomingMessage,
  type Server,
  type ServerResponse,
  createServer,
} from 'node:http';

export type RequestHandler = (
  req: IncomingMessage,
  res: ServerResponse,
) => void;

function bootingHandler(req: IncomingMessage, res: ServerResponse): void {
  if (req.url === '/health') {
    res.writeHead(503, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: false, booting: true }));
    return;
  }
  res.writeHead(503, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ message: 'booting' }));
}

// Answers 503 until swap() installs the real handler; the port never closes
// between boot and app, so a healthcheck cannot land in the gap.
export function createBootServer(): {
  server: Server;
  swap: (handler: RequestHandler) => void;
} {
  let current: RequestHandler = bootingHandler;
  const server = createServer((req, res) => current(req, res));
  return {
    server,
    swap: (handler) => {
      current = handler;
    },
  };
}
