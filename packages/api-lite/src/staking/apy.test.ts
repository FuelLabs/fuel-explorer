import { StakingAPY } from './apy';

function fetchImpl(pool: string, inflation: string): typeof fetch {
  return jest.fn(async (url: string | URL) => {
    const path = url.toString();
    if (path.includes('/pool')) {
      return {
        json: async () => ({ pool: { bonded_tokens: pool } }),
      } as Response;
    }
    return { json: async () => ({ inflation }) } as Response;
  }) as unknown as typeof fetch;
}

describe('StakingAPY', () => {
  it('computes APY from pool bonded_tokens and mint inflation', async () => {
    const apy = new StakingAPY(
      'https://rest.seq.mainnet.fuel.network',
      fetchImpl('1000000000000000000', '0.05'),
    );
    const amount = await apy.amount();
    // INITIAL_SUPPLY = 1e19; inflation = 5; totalInflation = (1e19/100)*5 = 5e17
    // APY = totalInflation*100 / bonded_tokens(1e18) = 5e19/1e18 = 50
    expect(amount).toBe('50');
  });

  it('caches the result for the TTL instead of refetching', async () => {
    const fetchMock = fetchImpl('1000000000000000000', '0.05');
    const apy = new StakingAPY(
      'https://rest.seq.mainnet.fuel.network',
      fetchMock,
      60_000,
    );
    await apy.amount();
    await apy.amount();
    expect(fetchMock).toHaveBeenCalledTimes(2); // one pool + one inflation call, once
  });
});
