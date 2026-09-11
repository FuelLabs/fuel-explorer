import { parentPort } from 'node:worker_threads';
import { gunzipSync, gzipSync } from 'node:zlib';
import { decodeBlock } from '../decoder/block';
import {
  type WorkerReply,
  type WorkerRequest,
  transferable,
} from './DecodeWorkerPool';

// Runs on a worker thread spawned by DecodeWorkerPool: one request in, one
// reply out, so the pool can hand each worker a single block at a time and
// tie a crash to the block it was working on. Errors are posted back rather
// than thrown, since a throw here kills the thread and the pool would have to
// respawn it for what is usually just a malformed block.
const port = parentPort;
if (!port) throw new Error('decodeWorker.ts must be started as a worker');

port.on('message', (req: WorkerRequest) => {
  let reply: WorkerReply;
  let transfer: ArrayBuffer[] = [];
  try {
    const bytes = new Uint8Array(req.bytes);
    if (req.op === 'decode') {
      const block = decodeBlock(bytes, { chainId: req.chainId, fee: req.fee });
      const json = JSON.stringify(block);
      const gz = transferable(gzipSync(json));
      reply = { id: req.id, json, gz };
      transfer = [gz];
    } else {
      reply = { id: req.id, json: gunzipSync(bytes).toString('utf8') };
    }
  } catch (e) {
    reply = { id: req.id, error: e instanceof Error ? e.message : String(e) };
  }
  port.postMessage(reply, transfer);
});
