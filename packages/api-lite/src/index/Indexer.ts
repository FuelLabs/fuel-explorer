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
// Heights deleted per retention transaction. On mainnet 100 blocks hold
// about 50k rows across the three tables.
const RETENTION_CHUNK_BLOCKS = 100;
const VACUUM_PAGES_PER_STEP = 2000;
const yieldToEventLoop = () => new Promise<void>((r) => setImmediate(r));
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
    // main.ts's hourly retention sweep can run its own deleteBelow (which
    // itself calls setFrom to bump indexed_from forward to the new floor)
    // while the fetch above is in flight. If indexed_from has moved past
    // the `r.from` this call started with, that rows-deleted floor must win
    // over anything this call is about to write below -- see safeFrom below.
    const currentFrom = this.opts.index.range().from;
    const retentionAdvancedFrom = currentFrom != null && currentFrom > r.from;
    const safeFrom = (target: number) =>
      retentionAdvancedFrom ? Math.max(target, currentFrom as number) : target;
    let lowest = r.from;
    for (let i = blocks.length - 1; i >= 0; i--) {
      const b = blocks[i];
      if (!b) {
        // Stop here rather than skipping this height and continuing with
        // whatever lower heights getRange already fetched successfully: the
        // no-gaps invariant requires `indexed_from..indexed_to` to cover a
        // contiguous range, so nothing below a missing height counts as
        // "backfilled" yet, even if it's already sitting in the index.
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
      this.opts.index.setFrom(safeFrom(lowest));
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
      this.opts.index.setFrom(safeFrom(missing - 1));
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

  private sweeping = false;

  // The hourly sweep once ran as one DELETE per table: on mainnet that is
  // about a million rows and blocked the event loop for 70 to 130 s, long
  // enough for tip ticks and block loads to be abandoned. Deleting in
  // chunks and yielding between them keeps requests flowing.
  async retention(): Promise<number> {
    if (this.sweeping) return 0;
    this.sweeping = true;
    try {
      let floor = this.floorHeight();
      let deleted = await this.deleteBelowChunked(floor);
      await this.vacuumChunked();
      while (this.opts.index.fileBytes() > this.opts.maxBytes) {
        floor += 1000;
        const d = await this.deleteBelowChunked(floor);
        if (d === 0) break;
        deleted += d;
        await this.vacuumChunked();
        const r = this.opts.index.range();
        if (r.to == null || floor >= r.to) break;
      }
      return deleted;
    } finally {
      this.sweeping = false;
    }
  }

  private async deleteBelowChunked(floor: number): Promise<number> {
    let n = 0;
    for (;;) {
      const lo = this.opts.index.minHeight();
      if (lo == null || lo >= floor) return n;
      n += this.opts.index.deleteRange(
        lo,
        Math.min(floor, lo + RETENTION_CHUNK_BLOCKS),
      );
      await yieldToEventLoop();
    }
  }

  private async vacuumChunked(): Promise<void> {
    while (this.opts.index.freelistPages() > 0) {
      this.opts.index.vacuum(VACUUM_PAGES_PER_STEP);
      await yieldToEventLoop();
    }
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
