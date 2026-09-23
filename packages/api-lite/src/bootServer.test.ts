import { request as httpRequest } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createBootServer } from './bootServer';

function get(
  port: number,
  path: string,
): Promise<{ status: number; body: unknown }> {
  return new Promise((resolve, reject) => {
    httpRequest({ port, path, method: 'GET' }, (res) => {
      let data = '';
      res.on('data', (c) => {
        data += c;
      });
      res.on('end', () =>
        resolve({ status: res.statusCode ?? 0, body: JSON.parse(data) }),
      );
    })
      .on('error', reject)
      .end();
  });
}

describe('createBootServer', () => {
  it('serves 503 booting responses before swap, then the real handler after', async () => {
    const { server, swap } = createBootServer();
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const port = (server.address() as AddressInfo).port;

    try {
      const health = await get(port, '/health');
      expect(health.status).toBe(503);
      expect(health.body).toEqual({ ok: false, booting: true });

      const other = await get(port, '/graphql');
      expect(other.status).toBe(503);
      expect(other.body).toEqual({ message: 'booting' });

      swap((_req, res) => {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ real: true }));
      });

      const afterHealth = await get(port, '/health');
      expect(afterHealth.status).toBe(200);
      expect(afterHealth.body).toEqual({ real: true });

      const afterOther = await get(port, '/anything');
      expect(afterOther.status).toBe(200);
      expect(afterOther.body).toEqual({ real: true });
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
});
