import { CosmosIndex } from './CosmosIndex';
import { CosmosPoller, defaultCosmosRestUrl } from './CosmosPoller';

const REST_BASE = 'https://rest.seq.testnet.fuel.network';

function tipResponse(height: number) {
  return { block: { header: { height: String(height) } } };
}

function txsResponse(txResponses: unknown[]) {
  return { total: String(txResponses.length), tx_responses: txResponses };
}

function tx(height: number, txhash: string, events: unknown[]) {
  return {
    height: String(height),
    txhash,
    data: '0A',
    timestamp: '2026-01-01T00:00:00Z',
    events,
  };
}

function fakeFetch(routes: Record<string, unknown>) {
  const calls: string[] = [];
  const impl = jest.fn(async (url: string) => {
    calls.push(url);
    const key = Object.keys(routes).find((k) => url.includes(k));
    if (!key) throw new Error(`unexpected fetch: ${url}`);
    return {
      ok: true,
      json: async () => routes[key],
    } as Response;
  });
  return { impl, calls };
}

describe('CosmosPoller', () => {
  let index: CosmosIndex;

  beforeEach(() => {
    index = new CosmosIndex(':memory:');
  });
  afterEach(() => {
    index.close();
  });

  it('seeds the cursor at tip - 200000 when no COSMOS_START_HEIGHT is given', async () => {
    const { impl } = fakeFetch({
      'blocks/latest': tipResponse(200_100),
      'tx.height=100': txsResponse([]),
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.tick();
    // start = tip - 200000 = 100; that height is empty and below tip, so the
    // cursor advances past it once.
    expect(index.cursor()).toBe(100);
  });

  it('uses the given start height as cursor + 1 for the first fetch', async () => {
    const { impl, calls } = fakeFetch({
      'blocks/latest': tipResponse(50),
      'tx.height=10': txsResponse([]),
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      startHeight: 10,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.tick();
    expect(calls.some((c) => c.includes('tx.height=10'))).toBe(true);
  });

  it('flattens tx_responses[].events[].attributes[] into cosmos_events with per-event index, and advances past a later empty height', async () => {
    const { impl } = fakeFetch({
      'blocks/latest': tipResponse(3),
      'tx.height=1': txsResponse([
        tx(1, 'HASH1', [
          {
            type: 'delegate',
            attributes: [
              { key: 'delegator', value: 'fuel1abc' },
              { key: 'amount', value: '100ufuel' },
            ],
          },
          {
            type: 'message',
            attributes: [
              { key: 'action', value: '/cosmos.staking.v1beta1.MsgDelegate' },
            ],
          },
        ]),
      ]),
      'tx.height=2': txsResponse([]),
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      startHeight: 1,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.tick();

    const events = index.queryEvents({});
    expect(events).toHaveLength(3);
    expect(events[0]).toMatchObject({
      type: 'delegate',
      key: 'delegator',
      value: 'fuel1abc',
      index: 0,
      blockHeight: 1,
      txHash: 'HASH1',
    });
    expect(events[1]).toMatchObject({
      type: 'delegate',
      key: 'amount',
      value: '100ufuel',
      index: 0,
    });
    expect(events[2]).toMatchObject({
      type: 'message',
      key: 'action',
      value: '/cosmos.staking.v1beta1.MsgDelegate',
      index: 1,
    });
    // Height 1 had txs (cursor -> 1), height 2 was empty but tip (3) is above
    // it, so the cursor advances past it too.
    expect(index.cursor()).toBe(2);
  });

  it('advances the cursor through an empty height immediately, including one at the tip', async () => {
    const { impl } = fakeFetch({
      'blocks/latest': tipResponse(5),
      'tx.height=5': txsResponse([]),
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      startHeight: 5,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.tick();
    expect(index.cursor()).toBe(5);
  });

  it('processes up to 50 consecutive heights per tick regardless of empty responses, splitting only when the height cap is hit', async () => {
    const nonEmptyHeights = new Set([10, 60]);
    const calls: string[] = [];
    const impl = jest.fn(async (url: string) => {
      calls.push(url);
      if (url.includes('blocks/latest')) {
        return { ok: true, json: async () => tipResponse(60) } as Response;
      }
      const match = url.match(/tx\.height=(\d+)/);
      const height = match ? Number(match[1]) : Number.NaN;
      const responses = nonEmptyHeights.has(height)
        ? [
            tx(height, `HASH${height}`, [
              {
                type: 'delegate',
                attributes: [{ key: 'delegator', value: `d${height}` }],
              },
            ]),
          ]
        : [];
      return { ok: true, json: async () => txsResponse(responses) } as Response;
    });

    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      startHeight: 1,
      fetchImpl: impl as unknown as typeof fetch,
    });

    await poller.tick();
    expect(index.cursor()).toBe(50);
    expect(index.queryEvents({})).toHaveLength(1);
    expect(calls.filter((c) => c.includes('tx.height=')).length).toBe(50);

    await poller.tick();
    expect(index.cursor()).toBe(60);
    expect(index.queryEvents({})).toHaveLength(2);
  });

  it('does not fetch past the tip', async () => {
    const { impl, calls } = fakeFetch({
      'blocks/latest': tipResponse(2),
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      startHeight: 3,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.tick();
    expect(calls.some((c) => c.includes('tx.height'))).toBe(false);
  });

  it('does not advance the cursor past a height whose txs fetch returned a non-2xx response', async () => {
    const impl = jest.fn(async (url: string) => {
      if (url.includes('blocks/latest')) {
        return { ok: true, json: async () => tipResponse(3) } as Response;
      }
      // A 5xx sequencer REST error still returns a JSON body without
      // tx_responses -- treating it like an empty block would silently
      // advance the cursor past this height.
      return {
        ok: false,
        status: 503,
        json: async () => ({ error: 'upstream unavailable' }),
      } as Response;
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      startHeight: 1,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.tick();
    // Cursor stays at startHeight - 1: height 1 was never successfully
    // processed, so it must not be marked done.
    expect(index.cursor()).toBe(0);
    expect(index.queryEvents({})).toHaveLength(0);
  });

  it('does not advance the cursor past a height whose 200 response body is missing tx_responses', async () => {
    const impl = jest.fn(async (url: string) => {
      if (url.includes('blocks/latest')) {
        return { ok: true, json: async () => tipResponse(3) } as Response;
      }
      // A 200 whose body has no tx_responses at all -- e.g. a proxy hiccup
      // or a malformed pagination response -- is the same cursor-poisoning
      // risk as a non-2xx, just through the other door: treating it like an
      // empty block would silently advance the cursor past this height.
      return { ok: true, json: async () => ({}) } as Response;
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      startHeight: 1,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.tick();
    expect(index.cursor()).toBe(0);
    expect(index.queryEvents({})).toHaveLength(0);
  });

  it('does not advance the cursor past a height whose 200 response body has a non-array tx_responses', async () => {
    const impl = jest.fn(async (url: string) => {
      if (url.includes('blocks/latest')) {
        return { ok: true, json: async () => tipResponse(3) } as Response;
      }
      return {
        ok: true,
        json: async () => ({ tx_responses: { error: 'not paginated yet' } }),
      } as Response;
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      startHeight: 1,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.tick();
    expect(index.cursor()).toBe(0);
    expect(index.queryEvents({})).toHaveLength(0);
  });

  it('advances the cursor past a height with a legitimately empty tx_responses: []', async () => {
    const { impl } = fakeFetch({
      'blocks/latest': tipResponse(3),
      'tx.height=1': txsResponse([]),
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      startHeight: 1,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.tick();
    expect(index.cursor()).toBe(1);
  });

  it('is idempotent across ticks (no duplicate events on the same height)', async () => {
    const { impl } = fakeFetch({
      'blocks/latest': tipResponse(10),
      'tx.height=1': txsResponse([
        tx(1, 'HASH1', [
          { type: 'delegate', attributes: [{ key: 'delegator', value: 'x' }] },
        ]),
      ]),
      'tx.height=2': txsResponse([]),
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      startHeight: 1,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.tick();
    const cursorAfterFirst = index.cursor();
    // Force a re-run over the same range to simulate a crash-recovery replay.
    index.setCursor(0);
    await poller.tick();
    expect(index.cursor()).toBe(cursorAfterFirst);
    expect(index.queryEvents({ type: 'delegate' })).toHaveLength(1);
  });
});

describe('defaultCosmosRestUrl', () => {
  it('resolves to testnet when the provider host contains testnet', () => {
    expect(
      defaultCosmosRestUrl('https://testnet.fuel.network/v1/graphql'),
    ).toBe('https://rest.seq.testnet.fuel.network');
  });

  it('resolves to mainnet otherwise', () => {
    expect(
      defaultCosmosRestUrl('https://mainnet.fuel.network/v1/graphql'),
    ).toBe('https://rest.seq.mainnet.fuel.network');
  });
});
