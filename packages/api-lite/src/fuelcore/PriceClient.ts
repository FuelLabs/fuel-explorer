const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

export class PriceClient {
  private cached: number | null = null;
  private cachedAt = 0;

  constructor(
    private readonly fetchImpl: typeof fetch = fetch,
    private readonly ttlMs = 600_000,
  ) {}

  async usd(): Promise<number | null> {
    const now = Date.now();
    if (now - this.cachedAt < this.ttlMs) return this.cached;
    try {
      const res = await this.fetchImpl(COINGECKO_URL, {
        signal: AbortSignal.timeout(15_000),
      });
      const json = (await res.json()) as { ethereum?: { usd?: number } };
      const price = json.ethereum?.usd;
      // Keep the last good price on a bad/empty response rather than clobbering it with null.
      if (typeof price === 'number') this.cached = price;
    } catch {
      // Keep the last good price on a transient failure instead of discarding it.
    }
    this.cachedAt = now;
    return this.cached;
  }
}
