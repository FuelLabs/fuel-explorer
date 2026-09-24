import { CosmosIndex } from './CosmosIndex';
import { CosmosPoller, defaultCosmosRestUrl } from './CosmosPoller';

const REST_BASE = 'https://rest.seq.testnet.fuel.network';

function tipResponse(height: number) {
  return { block: { header: { height: String(height) } } };
}

function blockResponse(txCount: number) {
  return {
    block: { data: { txs: Array.from({ length: txCount }, () => 'tx') } },
  };
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
    if (!key && /\/blocks\/\d+$/.test(url)) {
      return { ok: true, json: async () => blockResponse(0) } as Response;
    }
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

  describe('when a response never settles', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    const never = () => new Promise<never>(() => {});

    it('ends the tick on a tip body that never arrives, and the next tick runs', async () => {
      const logs: string[] = [];
      let hang = true;
      const impl = jest.fn(async (url: string) => ({
        ok: true,
        json: () => {
          if (url.includes('blocks/latest')) {
            return hang ? never() : Promise.resolve(tipResponse(1));
          }
          return Promise.resolve(txsResponse([]));
        },
      }));
      const poller = new CosmosPoller({
        index,
        restBase: REST_BASE,
        startHeight: 1,
        fetchImpl: impl as unknown as typeof fetch,
        onLog: (m) => logs.push(m),
      });

      const first = poller.tick();
      await jest.advanceTimersByTimeAsync(60_000);
      await first;
      expect(logs.join('\n')).toContain('tip fetch failed');
      expect(poller.tipAt).toBeNull();

      hang = false;
      await poller.tick();
      expect(index.cursor()).toBe(1);
      expect(poller.tipAt).not.toBeNull();
    });

    it('ends the tick on a txs body that never arrives, without advancing the cursor', async () => {
      const logs: string[] = [];
      const impl = jest.fn(async (url: string) => ({
        ok: true,
        json: () =>
          url.includes('blocks/latest')
            ? Promise.resolve(tipResponse(5))
            : never(),
      }));
      const poller = new CosmosPoller({
        index,
        restBase: REST_BASE,
        startHeight: 1,
        fetchImpl: impl as unknown as typeof fetch,
        onLog: (m) => logs.push(m),
      });

      const first = poller.tick();
      await jest.advanceTimersByTimeAsync(60_000);
      await first;
      expect(logs.join('\n')).toContain('txs fetch failed at height 1');
      expect(index.cursor()).toBe(0);
    });
  });
  it('holds the cursor when the tx search returns nothing for a block that has txs', async () => {
    const { impl } = fakeFetch({
      'blocks/latest': tipResponse(10),
      'tx.height=5': txsResponse([]),
      'blocks/5': blockResponse(2),
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      startHeight: 5,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.tick();
    expect(index.cursor()).toBe(4);
  });

  it('repairs the sequencer block that synced an L1 block, once per height', async () => {
    const { impl, calls } = fakeFetch({
      'EventEthereumBlockSynced.block_number': txsResponse([{ height: '777' }]),
      'tx.height=777': txsResponse([
        tx(777, 'SYNC', [
          {
            type: 'fuelsequencer.bridge.EventEthereumBlockSynced',
            attributes: [{ key: 'block_number', value: '"123"' }],
          },
        ]),
      ]),
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await Promise.all([
      poller.repairEthBlockSync(123),
      poller.repairEthBlockSync(123),
    ]);
    expect(index.ethBlockSyncRecorded(123)).toBe(true);
    expect(
      calls.filter((c) => c.includes('EventEthereumBlockSynced')),
    ).toHaveLength(1);
    expect(index.cursor()).toBeNull();
  });

  it('indexes every sequencer block that synced the L1 block', async () => {
    const syncTx = (height: number, hash: string) =>
      tx(height, hash, [
        {
          type: 'fuelsequencer.bridge.EventEthereumBlockSynced',
          attributes: [{ key: 'block_number', value: '"123"' }],
        },
      ]);
    const { impl, calls } = fakeFetch({
      'EventEthereumBlockSynced.block_number': txsResponse([
        { height: '777' },
        { height: '778' },
      ]),
      'tx.height=777': txsResponse([syncTx(777, 'SYNC1')]),
      'tx.height=778': txsResponse([syncTx(778, 'SYNC2')]),
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.repairEthBlockSync(123);
    expect(calls.some((c) => c.includes('tx.height=777'))).toBe(true);
    expect(calls.some((c) => c.includes('tx.height=778'))).toBe(true);
  });

  it('stores nothing when one of the sync blocks fails to fetch', async () => {
    const { impl } = fakeFetch({
      'EventEthereumBlockSynced.block_number': txsResponse([
        { height: '777' },
        { height: '778' },
      ]),
      'tx.height=777': txsResponse([
        tx(777, 'SYNC1', [
          {
            type: 'fuelsequencer.bridge.EventEthereumBlockSynced',
            attributes: [{ key: 'block_number', value: '"123"' }],
          },
        ]),
      ]),
      'tx.height=778': { message: 'rate limited' },
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await expect(poller.repairEthBlockSync(123)).rejects.toThrow();
    expect(index.ethBlockSyncRecorded(123)).toBe(false);
  });

  it('runs at most two repairs at a time', async () => {
    let active = 0;
    let peak = 0;
    const impl = jest.fn(async () => {
      active++;
      peak = Math.max(peak, active);
      await new Promise((resolve) => setTimeout(resolve, 10));
      active--;
      return { ok: true, json: async () => txsResponse([]) } as Response;
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await Promise.all([1, 2, 3, 4].map((h) => poller.repairEthBlockSync(h)));
    expect(impl).toHaveBeenCalledTimes(4);
    expect(peak).toBe(2);
  });

  it('waits before retrying a repair that failed', async () => {
    const impl = jest.fn(async () => ({ ok: false, status: 429 }) as Response);
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await expect(poller.repairEthBlockSync(789)).rejects.toThrow('HTTP 429');
    await poller.repairEthBlockSync(789);
    expect(impl).toHaveBeenCalledTimes(1);
  });

  it('remembers an L1 block the sequencer never synced instead of asking again', async () => {
    const { impl, calls } = fakeFetch({
      'EventEthereumBlockSynced.block_number': txsResponse([]),
    });
    const poller = new CosmosPoller({
      index,
      restBase: REST_BASE,
      fetchImpl: impl as unknown as typeof fetch,
    });
    await poller.repairEthBlockSync(456);
    await poller.repairEthBlockSync(456);
    expect(calls).toHaveLength(1);
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
