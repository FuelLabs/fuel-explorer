import { FinalizationPeriods } from './finalization';

describe('FinalizationPeriods.unbondingTimeSeconds', () => {
  it('parses the cosmos duration string ("1814400s") into seconds', async () => {
    const fetchImpl = jest.fn(async () => ({
      json: async () => ({ params: { unbonding_time: '1814400s' } }),
    })) as unknown as typeof fetch;
    const fp = new FinalizationPeriods(
      'http://127.0.0.1:1',
      'mainnet',
      'https://rest.seq.mainnet.fuel.network',
      fetchImpl,
    );
    expect(await fp.unbondingTimeSeconds()).toBe(1_814_400);
  });

  it('caches the result for the TTL instead of refetching', async () => {
    const fetchImpl = jest.fn(async () => ({
      json: async () => ({ params: { unbonding_time: '100s' } }),
    })) as unknown as typeof fetch;
    const fp = new FinalizationPeriods(
      'http://127.0.0.1:1',
      'mainnet',
      'https://rest.seq.mainnet.fuel.network',
      fetchImpl,
      60_000,
    );
    await fp.unbondingTimeSeconds();
    await fp.unbondingTimeSeconds();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('returns null when the response has no parseable unbonding_time', async () => {
    const fetchImpl = jest.fn(async () => ({
      json: async () => ({ params: {} }),
    })) as unknown as typeof fetch;
    const fp = new FinalizationPeriods(
      'http://127.0.0.1:1',
      'mainnet',
      'https://rest.seq.mainnet.fuel.network',
      fetchImpl,
    );
    expect(await fp.unbondingTimeSeconds()).toBeNull();
  });

  it('returns null on a fetch failure instead of throwing', async () => {
    const fetchImpl = jest.fn(async () => {
      throw new Error('network down');
    }) as unknown as typeof fetch;
    const fp = new FinalizationPeriods(
      'http://127.0.0.1:1',
      'mainnet',
      'https://rest.seq.mainnet.fuel.network',
      fetchImpl,
    );
    expect(await fp.unbondingTimeSeconds()).toBeNull();
  });
});

describe('FinalizationPeriods.timeToFinalize', () => {
  it('falls back to the current mainnet value when the contract read fails', async () => {
    const fp = new FinalizationPeriods(
      'http://127.0.0.1:1',
      'mainnet',
      'https://rest.seq.mainnet.fuel.network',
    );
    expect(await fp.timeToFinalizeStrict()).toBeNull();
    expect(await fp.timeToFinalize()).toBe(2880);
  });
});
