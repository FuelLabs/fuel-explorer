import { PriceClient } from './PriceClient';

function fakeFetch(handler: () => any) {
  let calls = 0;
  const fn = (async (_url: string) => {
    calls += 1;
    return { ok: true, json: async () => handler() };
  }) as unknown as typeof fetch;
  return { fn, calls: () => calls };
}

describe('PriceClient', () => {
  it('usd returns the ethereum price from coingecko', async () => {
    const { fn } = fakeFetch(() => ({ ethereum: { usd: 2500 } }));
    const c = new PriceClient({ fetchImpl: fn });
    expect(await c.usd()).toBe(2500);
  });

  it('caches within the ttl and does not fetch again', async () => {
    const { fn, calls } = fakeFetch(() => ({ ethereum: { usd: 2500 } }));
    const c = new PriceClient({ fetchImpl: fn, ttlMs: 600_000 });
    await c.usd();
    await c.usd();
    expect(calls()).toBe(1);
  });

  it('returns null and never throws when fetch fails', async () => {
    const failing = (async () => {
      throw new Error('network down');
    }) as unknown as typeof fetch;
    const c = new PriceClient({ fetchImpl: failing, log: () => {} });
    await expect(c.usd()).resolves.toBeNull();
  });

  it('returns null when the response has no usable price', async () => {
    const { fn } = fakeFetch(() => ({}));
    const c = new PriceClient({ fetchImpl: fn });
    expect(await c.usd()).toBeNull();
  });

  it('sends a 15s AbortSignal timeout so a hung coingecko request cannot hang the caller', async () => {
    let seenSignal: AbortSignal | undefined;
    const f = (async (_url: string, init: any) => {
      seenSignal = init?.signal;
      return { ok: true, json: async () => ({ ethereum: { usd: 2500 } }) };
    }) as unknown as typeof fetch;
    await new PriceClient({ fetchImpl: f }).usd();
    expect(seenSignal).toBeInstanceOf(AbortSignal);
  });

  it('keeps the last good price after a later transient failure instead of clobbering it with null', async () => {
    let fail = false;
    const f = (async () => {
      if (fail) throw new Error('network down');
      return { ok: true, json: async () => ({ ethereum: { usd: 2500 } }) };
    }) as unknown as typeof fetch;
    const c = new PriceClient({ fetchImpl: f, ttlMs: 0, log: () => {} });
    expect(await c.usd()).toBe(2500);
    fail = true;
    expect(await c.usd()).toBe(2500);
  });

  it('keeps the last good price when a later response has no usable price', async () => {
    let good = true;
    const f = (async () => ({
      ok: true,
      json: async () => (good ? { ethereum: { usd: 2500 } } : {}),
    })) as unknown as typeof fetch;
    const c = new PriceClient({ fetchImpl: f, ttlMs: 0, log: () => {} });
    expect(await c.usd()).toBe(2500);
    good = false;
    expect(await c.usd()).toBe(2500);
  });

  it('sends the demo api key header when one is configured', async () => {
    let seenHeaders: Record<string, string> | undefined;
    const f = (async (_url: string, init: any) => {
      seenHeaders = init?.headers;
      return { ok: true, json: async () => ({ ethereum: { usd: 2500 } }) };
    }) as unknown as typeof fetch;
    await new PriceClient({ fetchImpl: f, apiKey: 'demo-key' }).usd();
    expect(seenHeaders).toEqual({ 'x-cg-demo-api-key': 'demo-key' });
  });

  it('logs the http status of a rejected response and returns the last price', async () => {
    const lines: string[] = [];
    const f = (async () => ({
      ok: false,
      status: 429,
      json: async () => ({}),
    })) as unknown as typeof fetch;
    const c = new PriceClient({ fetchImpl: f, log: (l) => lines.push(l) });
    expect(await c.usd()).toBeNull();
    expect(lines).toEqual(['PriceClient: coingecko answered 429']);
  });
});
