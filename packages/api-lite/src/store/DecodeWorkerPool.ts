import { join } from 'node:path';
import { Worker } from 'node:worker_threads';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import type { FeeParams } from '../decoder/fee';

export type WorkerRequest =
  | {
      id: number;
      op: 'decode';
      height: number;
      bytes: ArrayBuffer;
      chainId: number;
      fee: FeeParams;
    }
  | { id: number; op: 'gunzip'; height: number; bytes: ArrayBuffer };

export type WorkerReply =
  | { id: number; json: string; gz?: ArrayBuffer }
  | { id: number; error: string };

export type Decoded = { block: GQLBlock; json: string; gz: Buffer };

/** What BlockStore needs from the pool; lets a test stand in a fake. */
export type DecodePool = Pick<DecodeWorkerPool, 'decode' | 'gunzip'>;

type Task = {
  request: WorkerRequest;
  transfer: ArrayBuffer[];
  resolve: (reply: { json: string; gz?: ArrayBuffer }) => void;
  reject: (e: Error) => void;
};

// tsup emits this module into dist/main.js and the worker script as its own
// dist/decodeWorker.js (see tsup.config.ts). Under tsx and jest this file is
// still .ts, so the worker is too, and the thread needs tsx's require hook
// to load it.
const fromSource = __filename.endsWith('.ts');
const WORKER_PATH = join(
  __dirname,
  fromSource ? 'decodeWorker.ts' : 'decodeWorker.js',
);
const WORKER_EXEC_ARGV = fromSource
  ? ['--require', require.resolve('tsx/cjs')]
  : [];

/**
 * An ArrayBuffer that can be moved to another thread without copying. A
 * Buffer under 4 KiB usually lives in a shared slab, and transferring that
 * slab would detach every other Buffer on it, so only a view that spans its
 * whole ArrayBuffer is handed over as-is; anything else is copied out first.
 */
export function transferable(bytes: Uint8Array): ArrayBuffer {
  const { buffer, byteOffset, byteLength } = bytes;
  if (
    buffer instanceof ArrayBuffer &&
    byteOffset === 0 &&
    byteLength === buffer.byteLength
  ) {
    return buffer;
  }
  return new Uint8Array(bytes).buffer as ArrayBuffer;
}

/**
 * Runs protobuf decode and the disk cache's gzip/gunzip on worker threads so
 * the event loop only parses the JSON the worker hands back. Each worker
 * takes one block at a time: a crash then maps to exactly one load, which is
 * rejected with its height while a fresh worker takes the thread's place.
 */
export class DecodeWorkerPool {
  private readonly workers: Worker[] = [];
  private readonly idle: Worker[] = [];
  private readonly busy = new Map<Worker, Task>();
  private readonly queue: Task[] = [];
  private nextId = 0;
  private closed = false;

  constructor(
    private readonly opts: { size: number; chainId: number; fee: FeeParams },
  ) {
    if (!Number.isInteger(opts.size) || opts.size < 1) {
      throw new Error(`DecodeWorkerPool size must be >= 1, got ${opts.size}`);
    }
    for (let i = 0; i < opts.size; i++) this.spawn();
  }

  async decode(height: number, bytes: Uint8Array): Promise<Decoded> {
    const reply = await this.run({
      id: this.nextId++,
      op: 'decode',
      height,
      bytes: transferable(bytes),
      chainId: this.opts.chainId,
      fee: this.opts.fee,
    });
    if (!reply.gz)
      throw new Error(`decode of block ${height} returned no gzip`);
    return {
      block: JSON.parse(reply.json) as GQLBlock,
      json: reply.json,
      gz: Buffer.from(reply.gz),
    };
  }

  async gunzip(
    height: number,
    gz: Uint8Array,
  ): Promise<{ block: GQLBlock; json: string }> {
    const reply = await this.run({
      id: this.nextId++,
      op: 'gunzip',
      height,
      bytes: transferable(gz),
    });
    return { block: JSON.parse(reply.json) as GQLBlock, json: reply.json };
  }

  /** Fails queued work and stops every worker; in-flight loads reject as the threads exit. */
  async close(): Promise<void> {
    this.closed = true;
    const err = new Error('decode worker pool closed');
    for (const task of this.queue.splice(0)) task.reject(err);
    await Promise.all(this.workers.map((w) => w.terminate()));
  }

  private run(request: WorkerRequest) {
    return new Promise<{ json: string; gz?: ArrayBuffer }>(
      (resolve, reject) => {
        if (this.closed) {
          reject(
            new Error(
              `decode worker pool closed, cannot ${request.op} block ${request.height}`,
            ),
          );
          return;
        }
        this.queue.push({
          request,
          transfer: [request.bytes],
          resolve,
          reject,
        });
        this.dispatch();
      },
    );
  }

  private dispatch() {
    while (this.idle.length > 0 && this.queue.length > 0) {
      const worker = this.idle.pop() as Worker;
      const task = this.queue.shift() as Task;
      this.busy.set(worker, task);
      worker.postMessage(task.request, task.transfer);
    }
  }

  private spawn() {
    const worker = new Worker(WORKER_PATH, { execArgv: WORKER_EXEC_ARGV });
    worker.on('message', (reply: WorkerReply) => {
      const task = this.busy.get(worker);
      if (!task || task.request.id !== reply.id) return;
      this.busy.delete(worker);
      this.idle.push(worker);
      if ('error' in reply) {
        task.reject(
          new Error(
            `${task.request.op} of block ${task.request.height} failed: ${reply.error}`,
          ),
        );
      } else {
        task.resolve(reply);
      }
      this.dispatch();
    });
    // A reply the main thread cannot deserialise leaves the worker healthy,
    // so it goes back to work; an uncaught throw or an exit does not, and
    // 'exit' always follows 'error', so the replacement is spawned there.
    worker.on('messageerror', (e) => {
      if (!this.fail(worker, e)) return;
      this.idle.push(worker);
      this.dispatch();
    });
    worker.on('error', (e) => this.fail(worker, e));
    worker.on('exit', (code) => {
      this.fail(worker, new Error(`worker exited with code ${code}`));
      this.workers.splice(this.workers.indexOf(worker), 1);
      const idleAt = this.idle.indexOf(worker);
      if (idleAt !== -1) this.idle.splice(idleAt, 1);
      if (this.closed) return;
      this.spawn();
      this.dispatch();
    });
    this.workers.push(worker);
    this.idle.push(worker);
  }

  /** Rejects the worker's in-flight task, if it has one. */
  private fail(worker: Worker, cause: Error): boolean {
    const task = this.busy.get(worker);
    if (!task) return false;
    this.busy.delete(worker);
    task.reject(
      new Error(
        `${task.request.op} of block ${task.request.height} failed in worker: ${cause.message}`,
      ),
    );
    return true;
  }
}
