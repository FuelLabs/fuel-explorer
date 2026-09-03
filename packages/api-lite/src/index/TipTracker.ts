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
};

const MAX_BATCHES_PER_TICK = 10;

export class TipTracker {
  fuelCoreTip = 0;
  servedTip = 0;
  fuelCoreUp = false;
  private timer: NodeJS.Timeout | null = null;
  private running = false;

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

  async tick(): Promise<void> {
    if (this.running) return;
    this.running = true;
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
      this.running = false;
      this.opts.onLag?.(this.fuelCoreTip - this.servedTip);
    }
  }
}
