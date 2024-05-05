import path from 'node:path';
import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from 'node:worker_threads';

type Events = Record<string, unknown>;
type Opts = {
  handler: string;
};

export class Workery<E extends Events> {
  worker!: Worker;
  constructor(private readonly opts: Opts) {
    const filepath = path.resolve(__filename);
    const content = `require('tsx/cjs');require('${filepath}').register();`;
    this.worker = new Worker(content, {
      eval: true,
      workerData: {
        handler: this.opts.handler,
      },
    });
  }

  static build<E extends Events>(opts: Opts) {
    return new Workery<E>(opts);
  }

  run<D>(data: D) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.postMessage('run', data as any);
  }

  on<K extends keyof E, L extends (payload: E[K]) => unknown>(
    event: K,
    listener: L,
  ) {
    if (isMainThread) {
      this.worker.on('message', async (message) => {
        const parsed = JSON.parse(message);
        const { type, data } = parsed;
        if (type === event) {
          await listener(data);
        }
      });
    } else {
      parentPort?.on('message', async (message: string) => {
        const parsed = JSON.parse(message);
        if (parsed.type === event) {
          await listener(parsed.data);
        }
      });
    }
  }

  postMessage<K extends keyof E>(event: K, data?: E[K]) {
    const delivery = isMainThread ? this.worker : parentPort;
    delivery?.postMessage(JSON.stringify({ type: event, data }));
  }

  onRunSuccess<L extends (payload: unknown) => unknown>(listener: L) {
    this.on('run:done', listener);
  }
}

export function register() {
  if (!isMainThread) {
    const { handler } = workerData;
    const { default: exec } = require(handler);
    parentPort?.on('message', async (message: string) => {
      const parsed = JSON.parse(message);
      const { type, data } = parsed;
      if (type === 'run') {
        const result = await exec(data);
        parentPort?.postMessage(
          JSON.stringify({ type: 'run:done', data: result }),
        );
      }
    });
  }
}
