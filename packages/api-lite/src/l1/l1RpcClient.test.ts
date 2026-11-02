import { type Server, createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { L1RpcHealth, createL1RpcClient } from './l1RpcClient';

type Rpc = { url: string; calls: number; status: number; close: () => void };

async function rpcServer(status: number): Promise<Rpc> {
  const rpc = { url: '', calls: 0, status, close: () => {} };
  const server: Server = createServer((req, res) => {
    let body = '';
    req.on('data', (c) => {
      body += c;
    });
    req.on('end', () => {
      rpc.calls++;
      const { id } = JSON.parse(body);
      if (rpc.status !== 200) {
        res.writeHead(rpc.status, { 'content-type': 'application/json' });
        res.end(
          JSON.stringify({
            jsonrpc: '2.0',
            id,
            error: { code: 429, message: 'Monthly capacity limit exceeded' },
          }),
        );
        return;
      }
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ jsonrpc: '2.0', id, result: '0x1' }));
    });
  });
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
  const { port } = server.address() as AddressInfo;
  rpc.url = `http://127.0.0.1:${port}/secret-key/`;
  rpc.close = () => server.close();
  return rpc;
}

describe('createL1RpcClient', () => {
  const servers: Rpc[] = [];
  afterEach(() => {
    for (const s of servers.splice(0)) s.close();
  });

  it('uses the primary while it answers and never calls the fallback', async () => {
    const primary = await rpcServer(200);
    const backup = await rpcServer(200);
    servers.push(primary, backup);
    const { client, health } = createL1RpcClient(primary.url, backup.url);

    expect(await client.getChainId()).toBe(1);
    expect(primary.calls).toBe(1);
    expect(backup.calls).toBe(0);
    expect(health.status()).toMatchObject({
      fallbackConfigured: true,
      servedBy: 'primary',
      primary: { ok: true, downSeconds: 0, lastError: null },
    });
  });

  it('serves from the fallback when the primary fails and reports it without the key', async () => {
    const primary = await rpcServer(429);
    const backup = await rpcServer(200);
    servers.push(primary, backup);
    const { client, health } = createL1RpcClient(primary.url, backup.url);

    expect(await client.getChainId()).toBe(1);
    expect(backup.calls).toBe(1);
    const status = health.status();
    expect(status.servedBy).toBe('fallback');
    expect(status.primary.ok).toBe(false);
    expect(status.primary.lastError).toContain('429');
    expect(JSON.stringify(status)).not.toContain('secret-key');
  });

  it('reports the primary as recovered once it answers again', async () => {
    const primary = await rpcServer(429);
    const backup = await rpcServer(200);
    servers.push(primary, backup);
    const { client, health } = createL1RpcClient(primary.url, backup.url);

    await client.getChainId();
    primary.status = 200;
    await client.getChainId();
    expect(health.status()).toMatchObject({
      servedBy: 'primary',
      primary: { ok: true, lastError: null },
    });
  });

  it('throws when the primary fails and no fallback is configured', async () => {
    const primary = await rpcServer(429);
    servers.push(primary);
    const { client, health } = createL1RpcClient(primary.url);

    await expect(client.getChainId()).rejects.toThrow();
    expect(health.status()).toMatchObject({
      fallbackConfigured: false,
      servedBy: null,
      primary: { ok: false },
      lastSuccessAt: null,
    });
  });
});

describe('L1RpcHealth', () => {
  it('counts downtime from the first failure, not the latest one', () => {
    let now = 1_000_000;
    const health = new L1RpcHealth(
      true,
      () => {},
      () => now,
    );
    health.recordPrimary(false, new Error('boom'));
    now += 60_000;
    health.recordPrimary(false, new Error('boom'));
    now += 240_000;
    expect(health.status().primary.downSeconds).toBe(300);
  });

  it('logs only on transitions', () => {
    const log = jest.fn();
    const health = new L1RpcHealth(true, log);
    health.recordPrimary(false, new Error('a'));
    health.recordPrimary(false, new Error('b'));
    health.recordPrimary(true);
    health.recordPrimary(true);
    expect(log.mock.calls.map((c) => c[0])).toEqual([
      'L1 RPC: primary failing (Error), serving from fallback',
      'L1 RPC: primary recovered',
    ]);
  });
});
