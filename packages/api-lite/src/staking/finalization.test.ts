import { http, createPublicClient } from 'viem';
import { FinalizationPeriods } from './finalization';

// A real viem client pointed at an unreachable local port: cheap to
// construct (viem's http transport doesn't connect until a call is made),
// and any actual readContract call against it fails the same way a bad RPC
// URL would in production, without a network mock.
const unreachableClient = () =>
  createPublicClient({ transport: http('http://127.0.0.1:1') });

describe('FinalizationPeriods.unbondingTimeSeconds', () => {
  it('parses the cosmos duration string ("1814400s") into seconds', async () => {
    const fetchImpl = jest.fn(async () => ({
      json: async () => ({ params: { unbonding_time: '1814400s' } }),
    })) as unknown as typeof fetch;
    const fp = new FinalizationPeriods(
      unreachableClient(),
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
      unreachableClient(),
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
      unreachableClient(),
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
      unreachableClient(),
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
      unreachableClient(),
      'mainnet',
      'https://rest.seq.mainnet.fuel.network',
    );
    expect(await fp.timeToFinalizeStrict()).toBeNull();
    expect(await fp.timeToFinalize()).toBe(2880);
  });

  // The client is constructed once by the caller (main.ts, at wiring time)
  // and reused across calls -- this pins that FinalizationPeriods itself
  // never constructs a new client on a cache-miss, unlike before this fix.
  it('reuses the same injected client instance across repeated cache-miss calls', async () => {
    const client = unreachableClient();
    const readContractSpy = jest
      .spyOn(client, 'readContract')
      .mockRejectedValue(new Error('rpc down'));
    const fp = new FinalizationPeriods(
      client,
      'mainnet',
      'https://rest.seq.mainnet.fuel.network',
      fetch,
      0, // ttlMs=0 forces a fresh call (cache-miss) every time
    );
    await fp.timeToFinalizeStrict();
    await fp.timeToFinalizeStrict();
    expect(readContractSpy).toHaveBeenCalledTimes(2);
    // Both calls went through the one client instance passed in, not a
    // freshly constructed one -- there's nowhere else `readContract` could
    // have come from since none is constructed inside the class anymore.
  });
});
