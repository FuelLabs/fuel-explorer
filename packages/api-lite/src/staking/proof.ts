const CACHE_TTL_MS = 60_000;

// Read-time fetch from the sequencer indexer, cached per nonce, null on
// failure -- never persisted.
export class WithdrawProofCache {
  private readonly cache = new Map<
    string,
    { value: unknown; expiresAt: number }
  >();

  constructor(
    private readonly cosmosIndexerUrl: string,
    private readonly fetchImpl: typeof fetch = fetch,
    private readonly ttlMs = CACHE_TTL_MS,
  ) {}

  async get(nonce: string): Promise<unknown | null> {
    const now = Date.now();
    const cached = this.cache.get(nonce);
    if (cached && cached.expiresAt > now) return cached.value;
    try {
      const url = new URL('/seq/proof', this.cosmosIndexerUrl);
      url.searchParams.append('nonce', nonce);
      const res = await this.fetchImpl(url.toString(), {
        signal: AbortSignal.timeout(15_000),
      });
      // A 404/5xx from the indexer must never be cached: a withdrawal that's
      // actually ready to process would otherwise show a broken/empty proof
      // until the TTL expires. Fall through to the catch below, same as a
      // thrown fetch -- return null, uncached, so the next call retries.
      if (!res.ok) throw new Error(`proof fetch failed: HTTP ${res.status}`);
      const json = await res.json();
      this.cache.set(nonce, { value: json, expiresAt: now + this.ttlMs });
      return json;
    } catch {
      return null;
    }
  }
}

export function defaultCosmosIndexerUrl(
  fuelChain: 'mainnet' | 'testnet',
): string {
  return `https://index-api.sequencer.${fuelChain}.fuel.network`;
}
