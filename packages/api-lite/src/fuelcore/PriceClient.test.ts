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
    const c = new PriceClient(fn);
    expect(await c.usd()).toBe(2500);
  });

  it('caches within the ttl and does not fetch again', async () => {
    const { fn, calls } = fakeFetch(() => ({ ethereum: { usd: 2500 } }));
    const c = new PriceClient(fn, 600_000);
    await c.usd();
    await c.usd();
    expect(calls()).toBe(1);
  });

  it('returns null and never throws when fetch fails', async () => {
    const failing = (async () => {
      throw new Error('network down');
    }) as unknown as typeof fetch;
    const c = new PriceClient(failing);
    await expect(c.usd()).resolves.toBeNull();
  });

  it('returns null when the response has no usable price', async () => {
    const { fn } = fakeFetch(() => ({}));
    const c = new PriceClient(fn);
    expect(await c.usd()).toBeNull();
  });

  it('sends a 15s AbortSignal timeout so a hung coingecko request cannot hang the caller', async () => {
    let seenSignal: AbortSignal | undefined;
    const f = (async (_url: string, init: any) => {
      seenSignal = init?.signal;
      return { ok: true, json: async () => ({ ethereum: { usd: 2500 } }) };
    }) as unknown as typeof fetch;
    await new PriceClient(f).usd();
    expect(seenSignal).toBeInstanceOf(AbortSignal);
  });

  it('keeps the last good price after a later transient failure instead of clobbering it with null', async () => {
    let fail = false;
    const f = (async () => {
      if (fail) throw new Error('network down');
      return { ok: true, json: async () => ({ ethereum: { usd: 2500 } }) };
    }) as unknown as typeof fetch;
    const c = new PriceClient(f, 0); // ttl 0: every call re-fetches
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
    const c = new PriceClient(f, 0);
    expect(await c.usd()).toBe(2500);
    good = false;
    expect(await c.usd()).toBe(2500);
  });
});
