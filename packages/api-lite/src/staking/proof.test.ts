import { WithdrawProofCache, defaultCosmosIndexerUrl } from './proof';

describe('WithdrawProofCache', () => {
  it('fetches /seq/proof?nonce= and returns the parsed JSON', async () => {
    const fetchImpl = jest.fn(async (url: string) => {
      expect(url).toBe(
        'https://index-api.sequencer.mainnet.fuel.network/seq/proof?nonce=7',
      );
      return { json: async () => ({ ok: true }) } as Response;
    }) as unknown as typeof fetch;
    const cache = new WithdrawProofCache(
      'https://index-api.sequencer.mainnet.fuel.network',
      fetchImpl,
    );
    expect(await cache.get('7')).toEqual({ ok: true });
  });

  it('caches per nonce for the TTL', async () => {
    const fetchImpl = jest
      .fn()
      .mockResolvedValue({ json: async () => ({ ok: true }) });
    const cache = new WithdrawProofCache(
      'https://index-api.sequencer.mainnet.fuel.network',
      fetchImpl as unknown as typeof fetch,
      60_000,
    );
    await cache.get('7');
    await cache.get('7');
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('returns null on a fetch failure instead of throwing', async () => {
    const fetchImpl = jest.fn(async () => {
      throw new Error('down');
    }) as unknown as typeof fetch;
    const cache = new WithdrawProofCache(
      'https://index-api.sequencer.mainnet.fuel.network',
      fetchImpl,
    );
    expect(await cache.get('7')).toBeNull();
  });
});

describe('defaultCosmosIndexerUrl', () => {
  it('builds the per-network index-api host', () => {
    expect(defaultCosmosIndexerUrl('mainnet')).toBe(
      'https://index-api.sequencer.mainnet.fuel.network',
    );
    expect(defaultCosmosIndexerUrl('testnet')).toBe(
      'https://index-api.sequencer.testnet.fuel.network',
    );
  });
});
