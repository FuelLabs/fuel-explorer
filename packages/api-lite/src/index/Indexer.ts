import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import type { BlockStore } from '../store/BlockStore';
import type { Index } from './Index';

type Opts = {
  index: Index;
  store: Pick<BlockStore, 'get' | 'getRange'>;
  retentionDays: number;
  maxBytes: number;
  batch: number;
  onLog?: (msg: string) => void;
};

const BLOCK_SECONDS = 1;
const STUCK_NO_PROGRESS_LIMIT = 3;

export class Indexer {
  private timer: NodeJS.Timeout | null = null;
  private stopped = true;
  private paused = false;
  private done: { at: number; n: number }[] = [];
  // Tracks consecutive no-progress backfillStep calls stuck at the same `from`,
  // so a permanently missing block doesn't retry forever.
  private noProgressFrom: number | null = null;
  private noProgressCount = 0;

  constructor(private readonly opts: Opts) {}

  get backfillPaused(): boolean {
    return this.paused;
  }
  pause(): void {
    this.paused = true;
  }
  resume(): void {
    this.paused = false;
  }

  private pruneDone(): void {
    const cutoff = Date.now() - 60_000;
    this.done = this.done.filter((d) => d.at >= cutoff);
  }

  writeOnly(block: GQLBlock): void {
    this.opts.index.writeBlock(block);
  }

  indexBlock(block: GQLBlock): void {
    const height = Number(block.height);
    this.opts.index.writeBlock(block);
    const r = this.opts.index.range();
    if (r.to == null) {
      this.opts.index.setRange(height, height);
    } else if (height === r.to + 1) {
      this.opts.index.setRange(r.from!, height);
    } else if (height === r.from! - 1) {
      this.opts.index.setRange(height, r.to);
    }
    // Non-contiguous height: block is written above, but the range must not widen.
  }

  floorHeight(): number {
    const r = this.opts.index.range();
    if (r.to == null) return 0;
    return Math.max(
      0,
      r.to - Math.floor((this.opts.retentionDays * 86400) / BLOCK_SECONDS),
    );
  }

  async backfillStep(): Promise<boolean> {
    if (this.paused) return false;
    const r = this.opts.index.range();
    if (r.from == null) return false;
    const floor = this.floorHeight();
    if (r.from <= floor) return false;
    const to = r.from - 1;
    const from = Math.max(floor, to - this.opts.batch + 1);
    const blocks = await this.opts.store.getRange(from, to);
    let lowest = r.from;
    for (let i = blocks.length - 1; i >= 0; i--) {
      const b = blocks[i];
      if (!b) {
        this.opts.onLog?.(
          `backfill: block ${from + i} missing in S3, stopping`,
        );
        break;
      }
      this.opts.index.writeBlock(b);
      lowest = from + i;
    }
    const progressed = lowest < r.from;
    // Only `indexed_from` is written here. The tracker may have extended
    // `indexed_to` forward while the fetch above was in flight; writing
    // `to` back from the stale `r.to` read at the top of this method would
    // clobber that contiguous extension.
    if (progressed) {
      this.opts.index.setFrom(lowest);
      this.noProgressFrom = null;
      this.noProgressCount = 0;
    } else if (this.noProgressFrom === r.from) {
      this.noProgressCount += 1;
    } else {
      this.noProgressFrom = r.from;
      this.noProgressCount = 1;
    }

    // Stuck at the same `from` for STUCK_NO_PROGRESS_LIMIT calls in a row: the
    // block at `to` (= from - 1) is permanently missing (e.g. never produced,
    // or lost upstream). Skip past it rather than retrying forever, and
    // record the gap so it's discoverable.
    let skipped = false;
    if (!progressed && this.noProgressCount >= STUCK_NO_PROGRESS_LIMIT) {
      const missing = to;
      this.opts.onLog?.(`backfill: skipping missing block ${missing}`);
      this.opts.index.recordGap(missing);
      this.opts.index.setFrom(missing - 1);
      this.noProgressFrom = null;
      this.noProgressCount = 0;
      skipped = true;
    }

    this.done.push({
      at: Date.now(),
      n: progressed ? r.from - lowest : skipped ? 1 : 0,
    });
    this.pruneDone();
    return progressed || skipped;
  }

  retention(nowSeconds: number): number {
    void nowSeconds;
    let floor = this.floorHeight();
    let deleted = this.opts.index.deleteBelow(floor);
    this.opts.index.vacuum();
    while (this.opts.index.fileBytes() > this.opts.maxBytes) {
      floor += 1000;
      const d = this.opts.index.deleteBelow(floor);
      if (d === 0) break;
      deleted += d;
      this.opts.index.vacuum();
      const r = this.opts.index.range();
      if (r.to == null || floor >= r.to) break;
    }
    return deleted;
  }

  backfillRate(): number {
    this.pruneDone();
    return this.done.reduce((s, d) => s + d.n, 0) / 60;
  }

  start() {
    this.stopped = false;
    const loop = async () => {
      if (this.stopped) return;
      try {
        const worked = await this.backfillStep();
        this.timer = setTimeout(loop, worked ? 50 : 5000);
      } catch (e) {
        this.opts.onLog?.(`backfill error: ${(e as Error).message}`);
        this.timer = setTimeout(loop, 5000);
      }
    };
    void loop();
  }

  stop() {
    this.stopped = true;
    if (this.timer) clearTimeout(this.timer);
  }
}
