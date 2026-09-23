const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

type Opts = {
  fetchImpl?: typeof fetch;
  ttlMs?: number;
  apiKey?: string;
  log?: (line: string) => void;
};

export class PriceClient {
  private cached: number | null = null;
  private cachedAt = 0;
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
  // The last good price survives a failed or empty response.
  async usd(): Promise<number | null> {
    const now = Date.now();
    if (now - this.cachedAt < this.ttlMs) return this.cached;
    this.cachedAt = now;
    try {
      const res = await this.fetchImpl(COINGECKO_URL, {
        signal: AbortSignal.timeout(15_000),
        headers: this.apiKey ? { 'x-cg-demo-api-key': this.apiKey } : {},
      });
      if (!res.ok) {
        this.log(`PriceClient: coingecko answered ${res.status}`);
        return this.cached;
      }
      const json = (await res.json()) as { ethereum?: { usd?: number } };
      const price = json.ethereum?.usd;
      if (typeof price === 'number') this.cached = price;
      else this.log('PriceClient: coingecko response has no ethereum.usd');
    } catch (e) {
      this.log(`PriceClient: coingecko fetch failed: ${(e as Error).message}`);
    }
    return this.cached;
  }
}
