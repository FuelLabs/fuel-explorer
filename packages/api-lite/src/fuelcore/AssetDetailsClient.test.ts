import {
  AssetDetailsClient,
  AssetDetailsUnavailableError,
} from './AssetDetailsClient';

// Trimmed from a real CoinGecko /coins/ethereum response.
const ETHEREUM = {
  id: 'ethereum',
  description: { en: 'Ethereum is a smart contract platform.' },
  links: {
    homepage: ['https://www.ethereum.org/', '', ''],
    whitepaper: 'https://github.com/ethereum/wiki/wiki/White-Paper',
    repos_url: { github: ['https://github.com/ethereum/go-ethereum'] },
    subreddit_url: 'https://www.reddit.com/r/ethereum',
    twitter_screen_name: 'ethereum',
    official_forum_url: ['https://ethresear.ch/'],
  },
  block_time_in_minutes: 0,
  hashing_algorithm: 'Ethash',
  genesis_date: '2015-07-30',
  market_data: {
    market_cap: { usd: 400_000_000_000 },
    fully_diluted_valuation: { usd: 400_000_000_000 },
    circulating_supply: 120_000_000,
    total_supply: 120_000_000,
    max_supply: null,
  },
};

function fakeFetch(handler: (url: string) => { status: number; body?: any }) {
  const urls: string[] = [];
  const fn = (async (url: string) => {
    urls.push(url);
    const { status, body } = handler(url);
    return { ok: status < 400, status, json: async () => body };
  }) as unknown as typeof fetch;
  return { fn, urls };
}

const ok = () => ({ status: 200, body: ETHEREUM });

describe('AssetDetailsClient', () => {
  it('maps a CoinGecko coin to the shape o2 reads', async () => {
    const { fn, urls } = fakeFetch(ok);
    const c = new AssetDetailsClient({ fetchImpl: fn });
    expect(await c.get('ETH')).toEqual({
      market_cap: 400_000_000_000,
      circulating_supply: 120_000_000,
      total_supply: 120_000_000,
      max_supply: 0,
      fully_diluted_valuation: 400_000_000_000,
      description: 'Ethereum is a smart contract platform.',
      links: {
        homepage: ['https://www.ethereum.org/', '', ''],
        whitepaper: 'https://github.com/ethereum/wiki/wiki/White-Paper',
        github: ['https://github.com/ethereum/go-ethereum'],
        reddit: 'https://www.reddit.com/r/ethereum',
        twitter: 'ethereum',
        official_forum: ['https://ethresear.ch/'],
      },
      block_time_in_minutes: 0,
      hashing_algorithm: 'Ethash',
      genesis_date: '2015-07-30',
    });
    expect(urls).toHaveLength(1);
    expect(urls[0]).toMatch(
      /^https:\/\/api\.coingecko\.com\/api\/v3\/coins\/ethereum\?/,
    );
  });

  it('fills missing fields with the old zero and empty defaults', async () => {
    const { fn } = fakeFetch(() => ({ status: 200, body: {} }));
    const c = new AssetDetailsClient({ fetchImpl: fn });
    expect(await c.get('ETH')).toEqual({
      market_cap: 0,
      circulating_supply: 0,
      total_supply: 0,
      max_supply: 0,
      fully_diluted_valuation: 0,
      description: '',
      links: {
        homepage: [],
        whitepaper: '',
        github: [],
        reddit: '',
        twitter: '',
        official_forum: [],
      },
      block_time_in_minutes: 0,
      hashing_algorithm: '',
      genesis_date: '',
    });
  });

  it('returns null without a request for a symbol with no CoinGecko id', async () => {
    const { fn, urls } = fakeFetch(ok);
    const c = new AssetDetailsClient({ fetchImpl: fn });
    expect(await c.get('NOPE')).toBeNull();
    expect(await c.get('MOOR')).toBeNull();
    expect(await c.get('__proto__')).toBeNull();
    expect(await c.get('constructor')).toBeNull();
    expect(urls).toHaveLength(0);
  });

  it('sends the demo api key and a timeout signal', async () => {
    let init: any;
    const fn = (async (_url: string, i: any) => {
      init = i;
      return { ok: true, status: 200, json: async () => ETHEREUM };
    }) as unknown as typeof fetch;
    await new AssetDetailsClient({ fetchImpl: fn, apiKey: 'k' }).get('ETH');
    expect(init.headers).toEqual({ 'x-cg-demo-api-key': 'k' });
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it('serves from cache within the ttl', async () => {
    const { fn, urls } = fakeFetch(ok);
    let now = 0;
    const c = new AssetDetailsClient({
      fetchImpl: fn,
      ttlMs: 1000,
      now: () => now,
    });
    await c.get('ETH');
    now = 999;
    await c.get('ETH');
    expect(urls).toHaveLength(1);
    now = 1000;
    await c.get('ETH');
    expect(urls).toHaveLength(2);
  });

  it('shares one request between concurrent callers', async () => {
    const { fn, urls } = fakeFetch(ok);
    const c = new AssetDetailsClient({ fetchImpl: fn });
    const [a, b] = await Promise.all([c.get('ETH'), c.get('ETH')]);
    expect(a).toEqual(b);
    expect(urls).toHaveLength(1);
  });

  it('serves the last good value when a refresh fails', async () => {
    let status = 200;
    const { fn } = fakeFetch(() => ({ status, body: ETHEREUM }));
    let now = 0;
    const c = new AssetDetailsClient({
      fetchImpl: fn,
      ttlMs: 1000,
      now: () => now,
      log: () => {},
    });
    const first = await c.get('ETH');
    status = 429;
    now = 5000;
    expect(await c.get('ETH')).toEqual(first);
  });

  it('throws when nothing is cached and backs off before retrying', async () => {
    let status = 500;
    const { fn, urls } = fakeFetch(() => ({ status, body: ETHEREUM }));
    let now = 0;
    const log = jest.fn();
    const c = new AssetDetailsClient({
      fetchImpl: fn,
      failureBackoffMs: 60_000,
      now: () => now,
      log,
    });
    await expect(c.get('ETH')).rejects.toBeInstanceOf(
      AssetDetailsUnavailableError,
    );
    expect(log).toHaveBeenCalledWith(
      'AssetDetailsClient: ethereum fetch failed: coingecko answered 500',
    );
    now = 59_999;
    await expect(c.get('ETH')).rejects.toBeInstanceOf(
      AssetDetailsUnavailableError,
    );
    expect(urls).toHaveLength(1);
    status = 200;
    now = 60_000;
    await expect(c.get('ETH')).resolves.toMatchObject({
      genesis_date: '2015-07-30',
    });
    expect(urls).toHaveLength(2);
  });

  it('turns a network error into AssetDetailsUnavailableError', async () => {
    const fn = (async () => {
      throw new Error('network down');
    }) as unknown as typeof fetch;
    const c = new AssetDetailsClient({ fetchImpl: fn, log: () => {} });
    await expect(c.get('ETH')).rejects.toBeInstanceOf(
      AssetDetailsUnavailableError,
    );
  });
});
