import type { PublicClient } from 'viem';
import AbiFactory from '../l1/abi/AbiFactory';
import { L1_CONTRACTS } from '../l1/contracts';

const CACHE_TTL_MS = 60 * 60 * 1000;
const FALLBACK_TIME_TO_FINALIZE_MINUTES = 2880;

export const TIME_TO_COMMIT_SECONDS = 10 * 60 * 60;
export const TIME_TO_SEQUENCER_INDEXER_SYNC_SECONDS = 1800;

export class FinalizationPeriods {
  private timeToFinalizeMinutes: number | null = null;
  private timeToFinalizeAt = 0;
  private unbondingSeconds: number | null = null;
  private unbondingAt = 0;

  constructor(
    // A single long-lived viem client built once at wiring time in main.ts
    // and shared with L1Poller (via createL1Client), rather than each
    // constructing (and reconnecting) its own -- this used to be rebuilt on
    // every cache-miss call to timeToFinalizeStrict below.
    private readonly client: PublicClient,
    private readonly network: 'mainnet' | 'testnet',
    private readonly cosmosRestBase: string,
    private readonly fetchImpl: typeof fetch = fetch,
    private readonly ttlMs = CACHE_TTL_MS,
  ) {}

  private fuelStreamXAddress(): `0x${string}` {
    const contract = L1_CONTRACTS.find(
      (c) => c.network === this.network && c.name === 'FuelStreamX',
    );
    if (!contract) {
      throw new Error(`no FuelStreamX contract for network ${this.network}`);
    }
    return contract.contractHash as `0x${string}`;
  }

  async timeToFinalizeStrict(): Promise<number | null> {
    const now = Date.now();
    if (
      this.timeToFinalizeMinutes !== null &&
      now - this.timeToFinalizeAt < this.ttlMs
    ) {
      return this.timeToFinalizeMinutes;
    }
    try {
      const abi = AbiFactory.create(this.network, 'FuelStreamX');
      // biome-ignore lint/suspicious/noExplicitAny: raw ABI literal isn't `as const`, so viem can't statically infer
      // readContract's args requirement here; same untyped-ABI tradeoff as L1Poller's decodeEventLog call.
      const value = (await this.client.readContract({
        address: this.fuelStreamXAddress(),
        abi: abi as any,
        functionName: 'timeToFinalize',
      } as any)) as bigint;
      const minutes = Number(value) / 60;
      this.timeToFinalizeMinutes = minutes;
      this.timeToFinalizeAt = now;
      return minutes;
    } catch {
      return null;
    }
  }

  async timeToFinalize(): Promise<number> {
    const result = await this.timeToFinalizeStrict();
    return result ?? FALLBACK_TIME_TO_FINALIZE_MINUTES;
  }

  async unbondingTimeSeconds(): Promise<number | null> {
    const now = Date.now();
    if (this.unbondingSeconds !== null && now - this.unbondingAt < this.ttlMs) {
      return this.unbondingSeconds;
    }
    try {
      const res = await this.fetchImpl(
        new URL('/cosmos/staking/v1beta1/params', this.cosmosRestBase),
      );
      const data = await res.json();
      const unbondingTimeStr: string = data?.params?.unbonding_time ?? '';
      const seconds = Number.parseInt(unbondingTimeStr.replace('s', ''), 10);
      if (Number.isNaN(seconds)) return null;
      this.unbondingSeconds = seconds;
      this.unbondingAt = now;
      return seconds;
    } catch {
      return null;
    }
  }
}
