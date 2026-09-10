import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import type { BlockStore } from '../store/BlockStore';

type Opts = {
  client: { latestHeight(): Promise<number> };
  store: Pick<BlockStore, 'getRange'>;
  pollMs: number;
  onBlock?: (block: GQLBlock) => void;
  initialServedTip?: number;
  /** Blocks fetched per store.getRange call within a tick. Default 20. */
  batch?: number;
  /** Fires at the end of every tick with fuelCoreTip - servedTip. */
  onLag?: (lagBlocks: number) => void;
  /**
   * How long a single tick may run before the next tick abandons it. Default
   * 60s; a test can lower it.
   */
  stallMs?: number;
};

const MAX_BATCHES_PER_TICK = 10;
const DEFAULT_STALL_MS = 60_000;

export class TipTracker {
  fuelCoreTip = 0;
  servedTip = 0;
  fuelCoreUp = false;
  private timer: NodeJS.Timeout | null = null;
  // The in-flight tick, if any. Held as an object rather than a boolean so an
  // abandoned tick cannot clear the flag belonging to a newer one.
  private active: { id: number; startedAt: number } | null = null;
  private nextId = 1;

  constructor(private readonly opts: Opts) {
    this.servedTip = opts.initialServedTip ?? 0;
  }

  start() {
    this.timer = setInterval(() => void this.tick(), this.opts.pollMs);
    void this.tick();
  }
  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  private get stallMs(): number {
    return this.opts.stallMs ?? DEFAULT_STALL_MS;
  }

  async tick(): Promise<void> {
    if (this.active) {
      const stalledFor = Date.now() - this.active.startedAt;
      if (stalledFor < this.stallMs) return;
      // A tick that never settles would otherwise wedge the tracker for the
      // life of the process: no error, no recovery, just a tip that stops
      // advancing while health keeps reporting the last good values. Give up
      // on it and let this tick through.
      console.error(
        `TipTracker: tick ${this.active.id} still running after ${stalledFor}ms, abandoning it and retrying`,
      );
    }
    const id = this.nextId++;
    this.active = { id, startedAt: Date.now() };
    try {
      try {
        this.fuelCoreTip = await this.opts.client.latestHeight();
        this.fuelCoreUp = true;
      } catch {
        this.fuelCoreUp = false;
        return;
      }
      const batchSize = this.opts.batch ?? 20;
      try {
        for (
          let batches = 0;
          batches < MAX_BATCHES_PER_TICK && this.servedTip < this.fuelCoreTip;
          batches++
        ) {
          const start =
            this.servedTip === 0 ? this.fuelCoreTip : this.servedTip + 1;
          const end = Math.min(this.fuelCoreTip, start + batchSize - 1);
          const blocks = await this.opts.store.getRange(start, end);
          let sawMissing = false;
          for (let h = start; h <= end; h++) {
            const block = blocks[h - start];
            if (!block) {
              sawMissing = true;
              break;
            }
            this.servedTip = h;
            this.opts.onBlock?.(block);
          }
          // A batch smaller than the full request (near the tip) or one that
          // stopped on a missing block does not warrant fetching another
          // batch this tick: either the tip is already reached, or the same
          // gap will still be there on the next tick.
          if (sawMissing || end - start + 1 < batchSize) break;
        }
      } catch (err) {
        console.error('TipTracker: store.getRange failed', err);
        return;
      }
    } finally {
      // Only clear our own tick: an abandoned one must not free the flag of a
      // newer tick that is still running.
      if (this.active?.id === id) this.active = null;
      this.opts.onLag?.(this.fuelCoreTip - this.servedTip);
    }
  }
}
