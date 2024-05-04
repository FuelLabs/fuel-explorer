import fs from 'node:fs';
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

type Events = Record<string, unknown>;
type Opts = {
  filepath: string;
  initialData?: unknown;
};

export class Workery<E extends Events, O extends Opts = Opts> {
  worker!: Worker;

  constructor(opts: O) {
    this.worker = new Worker(opts.filepath, {
      workerData: opts.initialData,
    });
  }

  static create<E extends Events, O extends Opts = Opts>(opts: O) {
    const { filepath } = opts;
    const newFilePath = filepath.replace('.ts', '.gen.js');
    if (!fs.existsSync(newFilePath)) {
      const content = `require('ts-node').register({ transpileOnly: true });require('${filepath}');`;
      fs.writeFileSync(newFilePath, content);
    }
    return new Workery<E, O>({ ...opts, filepath: newFilePath });
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
      return () => {
        this.worker.off('message', listener);
      };
    }

    parentPort?.on('message', async (message: string) => {
      const parsed = JSON.parse(message);
      if (parsed.type === event) {
        await listener(parsed.data);
      }
    });
    return () => {
      parentPort?.off('message', listener);
    };
  }

  postMessage<K extends keyof E>(event: K, data?: E[K]) {
    const delivery = isMainThread ? this.worker : parentPort;
    delivery?.postMessage(JSON.stringify({ type: event, data }));
  }
}
