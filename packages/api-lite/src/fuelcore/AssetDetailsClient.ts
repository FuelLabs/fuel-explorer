import { COINGECKO_IDS } from './PriceClient';

const COINGECKO_COINS_URL = 'https://api.coingecko.com/api/v3/coins';
const QUERY =
  'localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';
const TIMEOUT_MS = 15_000;
const CACHE_TTL_MS = 600_000;
const FAILURE_BACKOFF_MS = 60_000;

// o2's market Info tab parses this shape; keep every field and its zero/empty default.
export type AssetDetails = {
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  fully_diluted_valuation: number;
  description: string;
  links: {
    homepage: string[];
    whitepaper: string;
    github: string[];
    reddit: string;
    twitter: string;
    official_forum: string[];
  };
  block_time_in_minutes: number;
  hashing_algorithm: string;
  genesis_date: string;
};

function toDetails(raw: any): AssetDetails {
  const market = raw?.market_data;
  const links = raw?.links;
  return {
    market_cap: market?.market_cap?.usd || 0,
    circulating_supply: market?.circulating_supply || 0,
    total_supply: market?.total_supply || 0,
    max_supply: market?.max_supply || 0,
    fully_diluted_valuation: market?.fully_diluted_valuation?.usd || 0,
    description: raw?.description?.en || '',
    links: {
      homepage: links?.homepage || [],
      whitepaper: links?.whitepaper || '',
      github: links?.repos_url?.github || [],
      reddit: links?.subreddit_url || '',
      twitter: links?.twitter_screen_name || '',
      official_forum: links?.official_forum_url || [],
    },
    block_time_in_minutes: raw?.block_time_in_minutes || 0,
    hashing_algorithm: raw?.hashing_algorithm || '',
    genesis_date: raw?.genesis_date || '',
  };
}

// o2 testnet's faucet tokens prefix the real symbol with `f` (fETH, fwBTC).
const TESTNET_FAUCET_PREFIX = 'f';

function coingeckoIdFor(symbol: string): string | undefined {
  if (Object.hasOwn(COINGECKO_IDS, symbol)) return COINGECKO_IDS[symbol];
  const unprefixed = symbol.slice(TESTNET_FAUCET_PREFIX.length);
  if (
    symbol.startsWith(TESTNET_FAUCET_PREFIX) &&
    Object.hasOwn(COINGECKO_IDS, unprefixed)
  ) {
    return COINGECKO_IDS[unprefixed];
  }
  return undefined;
}

export class AssetDetailsUnavailableError extends Error {}

type Opts = {
  fetchImpl?: typeof fetch;
  ttlMs?: number;
  // How long a failed id is not refetched, so an outage or 429 isn't hammered.
  failureBackoffMs?: number;
  apiKey?: string;
  log?: (line: string) => void;
  now?: () => number;
};

type Entry = { value: AssetDetails; fetchedAt: number };

// Only symbols in COINGECKO_IDS reach CoinGecko, so request paths can't fan out upstream.
export class AssetDetailsClient {
  private readonly cache = new Map<string, Entry>();
  private readonly failedAt = new Map<string, number>();
  private readonly inflight = new Map<string, Promise<AssetDetails>>();
  private readonly fetchImpl: typeof fetch;
  private readonly ttlMs: number;
  private readonly failureBackoffMs: number;
  private readonly apiKey?: string;
  private readonly log: (line: string) => void;
  private readonly now: () => number;

  constructor(opts: Opts = {}) {
    this.fetchImpl = opts.fetchImpl ?? fetch;
    this.ttlMs = opts.ttlMs ?? CACHE_TTL_MS;
    this.failureBackoffMs = opts.failureBackoffMs ?? FAILURE_BACKOFF_MS;
    this.apiKey = opts.apiKey;
    this.log = opts.log ?? console.error;
    this.now = opts.now ?? Date.now;
  }

  // null when unlisted; on CoinGecko failure serves a stale entry, else throws.
  async get(symbol: string): Promise<AssetDetails | null> {
    const id = coingeckoIdFor(symbol);
    if (!id) return null;

    const cached = this.cache.get(id);
    const now = this.now();
    if (cached && now - cached.fetchedAt < this.ttlMs) return cached.value;

    const failedAt = this.failedAt.get(id);
    if (failedAt !== undefined && now - failedAt < this.failureBackoffMs) {
      if (cached) return cached.value;
      throw new AssetDetailsUnavailableError(`no details for ${id}`);
    }

    let pending = this.inflight.get(id);
    if (!pending) {
      pending = this.fetchDetails(id).finally(() => this.inflight.delete(id));
      this.inflight.set(id, pending);
    }
    try {
      return await pending;
    } catch (e) {
      if (cached) return cached.value;
      throw e;
    }
  }

  private async fetchDetails(id: string): Promise<AssetDetails> {
    try {
      const res = await this.fetchImpl(
        `${COINGECKO_COINS_URL}/${encodeURIComponent(id)}?${QUERY}`,
        {
          signal: AbortSignal.timeout(TIMEOUT_MS),
          headers: this.apiKey ? { 'x-cg-demo-api-key': this.apiKey } : {},
        },
      );
      if (!res.ok) {
        throw new AssetDetailsUnavailableError(
          `coingecko answered ${res.status}`,
        );
      }
      const value = toDetails(await res.json());
      this.cache.set(id, { value, fetchedAt: this.now() });
      this.failedAt.delete(id);
      return value;
    } catch (e) {
      this.failedAt.set(id, this.now());
      const message = (e as Error).message;
      this.log(`AssetDetailsClient: ${id} fetch failed: ${message}`);
      throw e instanceof AssetDetailsUnavailableError
        ? e
        : new AssetDetailsUnavailableError(message);
    }
  }
}
