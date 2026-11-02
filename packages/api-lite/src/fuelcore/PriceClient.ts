const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price';

const ETH_SYMBOL = 'ETH';

// Keyed by verified-assets symbol. Verify a new id against the token's address
// in CoinGecko's coin list: delisted ids still answer with a stale price.
const COINGECKO_IDS: Record<string, string> = {
  [ETH_SYMBOL]: 'ethereum',
  FUEL: 'fuel-network',
  WETH: 'weth',
  weETH: 'wrapped-eeth',
  rsETH: 'kelp-dao-restaked-eth',
  rETH: 'rocket-pool-eth',
  wbETH: 'wrapped-beacon-eth',
  pumpBTC: 'pumpbtc',
  FBTC: 'ignition-fbtc',
  SolvBTC: 'solv-btc',
  'SolvBTC.BBN': 'solv-protocol-solvbtc-bbn',
  'Mantle mETH': 'mantle-staked-ether',
  sDAI: 'savings-dai',
  USDT: 'tether',
  USDC: 'usd-coin',
  XAUT: 'tether-gold',
  USDe: 'ethena-usde',
  sUSDe: 'ethena-staked-usde',
  wstETH: 'wrapped-steth',
  ezETH: 'renzo-restaked-eth',
  pzETH: 'renzo-restaked-lst',
  UNI: 'uniswap',
  AAVE: 'aave',
  LINK: 'chainlink',
  ONDO: 'ondo-finance',
  ENA: 'ethena',
  PYUSD: 'paypal-usd',
  WLD: 'worldcoin-wld',
};

// MOOR has no CoinGecko listing; CoinMarketCap prices it from its Fuel DEX pool.
const MOOR_CANDLE_URL =
  'https://dapi.coinmarketcap.com/u-kline/v1/k-line/candles?platform=Fuel%20Network&address=0xa9d7987a3f2c2fb02b287c3a2ef619046e930848c6050d31efef48ad6d3bdee8&unit=usd&pm=p&interval=1h&limit=1';
const CANDLE_CLOSE_INDEX = 3;

const TIMEOUT_MS = 15_000;

type Opts = {
  fetchImpl?: typeof fetch;
  ttlMs?: number;
  apiKey?: string;
  log?: (line: string) => void;
};

export class PriceClient {
  private readonly prices = new Map<string, number>();
  private fetchedAt = 0;
  private inflight: Promise<void> | null = null;
  private readonly fetchImpl: typeof fetch;
  private readonly ttlMs: number;
  private readonly apiKey?: string;
  private readonly log: (line: string) => void;

  constructor(opts: Opts = {}) {
    this.fetchImpl = opts.fetchImpl ?? fetch;
    this.ttlMs = opts.ttlMs ?? 600_000;
    this.apiKey = opts.apiKey;
    this.log = opts.log ?? console.error;
  }

  // A fetch runs at most once per ttlMs, so a failure logs at most that often.
  // The last good price of each asset survives a failed or empty response.
  refresh(): Promise<void> {
    if (this.inflight) return this.inflight;
    const now = Date.now();
    if (now - this.fetchedAt < this.ttlMs) return Promise.resolve();
    this.fetchedAt = now;
    this.inflight = Promise.all([this.fetchCoingecko(), this.fetchMoor()]).then(
      () => {
        this.inflight = null;
      },
    );
    return this.inflight;
  }

  async usd(): Promise<number | null> {
    const refreshing = this.refresh();
    if (!this.prices.has(ETH_SYMBOL)) await refreshing;
    return this.prices.get(ETH_SYMBOL) ?? null;
  }

  // Synchronous because fuels-wallet times out GET /assets/:assetId after 2s.
  rate(symbol: string): number | null {
    void this.refresh();
    return this.prices.get(symbol) ?? null;
  }

  private async fetchCoingecko(): Promise<void> {
    try {
      const ids = Object.values(COINGECKO_IDS).join(',');
      const res = await this.fetchImpl(
        `${COINGECKO_URL}?ids=${ids}&vs_currencies=usd`,
        {
          signal: AbortSignal.timeout(TIMEOUT_MS),
          headers: this.apiKey ? { 'x-cg-demo-api-key': this.apiKey } : {},
        },
      );
      if (!res.ok) {
        this.log(`PriceClient: coingecko answered ${res.status}`);
        return;
      }
      const json = (await res.json()) as Record<string, { usd?: number }>;
      for (const [symbol, id] of Object.entries(COINGECKO_IDS)) {
        this.remember(symbol, json[id]?.usd);
      }
      if (typeof json.ethereum?.usd !== 'number') {
        this.log('PriceClient: coingecko response has no ethereum.usd');
      }
    } catch (e) {
      this.log(`PriceClient: coingecko fetch failed: ${(e as Error).message}`);
    }
  }

  private async fetchMoor(): Promise<void> {
    try {
      const res = await this.fetchImpl(MOOR_CANDLE_URL, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) {
        this.log(`PriceClient: coinmarketcap answered ${res.status}`);
        return;
      }
      const json = (await res.json()) as { data?: number[][] };
      this.remember('MOOR', json.data?.[0]?.[CANDLE_CLOSE_INDEX]);
    } catch (e) {
      this.log(
        `PriceClient: coinmarketcap fetch failed: ${(e as Error).message}`,
      );
    }
  }

  private remember(symbol: string, price: unknown): void {
    if (typeof price === 'number' && price > 0) this.prices.set(symbol, price);
  }
}
