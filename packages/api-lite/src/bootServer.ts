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

// Served before createApp() exists: chainParamsWithRetry in main.ts can
// block boot on fuel-core for up to CHAIN_PARAMS_RETRY_MAX_DELAY_MS (30s),
// and Railway's healthcheck needs a 503 to poll before then.
function bootingHandler(req: IncomingMessage, res: ServerResponse): void {
  if (req.url === '/health') {
    res.writeHead(503, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: false, booting: true }));
    return;
  }
  res.writeHead(503, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ message: 'booting' }));
}

// One http.Server whose request listener delegates to a mutable handler, so
// main.ts can start listening on cfg.port immediately and later swap in the
// real app's listener once createApp() returns -- closing and reopening the
// port instead could drop a healthcheck request that races the handover.
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
