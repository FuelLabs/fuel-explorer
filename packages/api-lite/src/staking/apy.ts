const CACHE_TTL_MS = 30 * 60 * 1000;
const ONE_UNIT = 10n ** 9n;
const INITIAL_SUPPLY = 10_000_000_000n * ONE_UNIT;

export class StakingAPY {
  private cached: string | null = null;
  private cachedAt = 0;

  constructor(
    private readonly cosmosRestBase: string,
    private readonly fetchImpl: typeof fetch = fetch,
    private readonly ttlMs = CACHE_TTL_MS,
  ) {}

  async amount(): Promise<string> {
    const now = Date.now();
    if (this.cached !== null && now - this.cachedAt < this.ttlMs) {
      return this.cached;
    }
    const [poolResp, inflationResp] = await Promise.all([
      this.fetchImpl(
        new URL('/cosmos/staking/v1beta1/pool', this.cosmosRestBase),
      ).then((r) => r.json()),
      this.fetchImpl(
        new URL('/cosmos/mint/v1beta1/inflation', this.cosmosRestBase),
      ).then((r) => r.json()),
    ]);
    const inflation = BigInt(Number(inflationResp.inflation) * 100);
    const totalDelegation = BigInt(poolResp.pool.bonded_tokens);
    const totalInflation = (INITIAL_SUPPLY / 100n) * inflation;
    const apy = (totalInflation * 100n) / totalDelegation;
    this.cached = apy.toString();
    this.cachedAt = now;
    return this.cached;
  }
}
