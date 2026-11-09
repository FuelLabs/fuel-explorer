import { COINGECKO_IDS } from './PriceClient';

const COINGECKO_COINS_URL = 'https://api.coingecko.com/api/v3/coins';
const QUERY =
  'localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';
const TIMEOUT_MS = 15_000;

// The o2 web app's market Info tab (packages/web-services/src/services/assets/
// getAssetInfo.ts in o2) reads this shape from GET /assets/:symbol/details.
// It is the shape the Postgres indexer served before #700, so keep every
// field and its zero/empty default as is.
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

export class AssetDetailsUnavailableError extends Error {}

type Opts = {
  fetchImpl?: typeof fetch;
  ttlMs?: number;
  // After a failed fetch with nothing cached, callers get an error without a
  // new request for this long, so a CoinGecko outage or 429 isn't hammered.
  failureBackoffMs?: number;
  apiKey?: string;
  log?: (line: string) => void;
  now?: () => number;
};

type Entry = { value: AssetDetails; fetchedAt: number };

// Serves o2's market Info tab (market cap, supply, description, asset links).
// Only symbols in COINGECKO_IDS ever reach CoinGecko, so request paths can't
// fan out upstream and the cache holds at most one entry per mapped symbol.
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
    this.ttlMs = opts.ttlMs ?? 600_000;
    this.failureBackoffMs = opts.failureBackoffMs ?? 60_000;
    this.apiKey = opts.apiKey;
    this.log = opts.log ?? console.error;
    this.now = opts.now ?? Date.now;
  }

  // null for a symbol with no CoinGecko listing. Throws
  // AssetDetailsUnavailableError when CoinGecko fails and nothing is cached;
  // a stale entry is served instead of an error.
  async get(symbol: string): Promise<AssetDetails | null> {
    if (!Object.hasOwn(COINGECKO_IDS, symbol)) return null;
    const id = COINGECKO_IDS[symbol];

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
