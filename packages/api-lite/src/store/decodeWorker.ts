import { parentPort } from 'node:worker_threads';
import { gunzipSync, gzipSync } from 'node:zlib';
import { MAX_BLOCK_BYTES } from '../blockLimits';
import { decodeBlock } from '../decoder/block';
import {
  type WorkerReply,
  type WorkerRequest,
  transferable,
} from './DecodeWorkerPool';

// Errors are posted back rather than thrown: a throw kills the thread.
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
      const gz = transferable(gzipSync(json, { level: 1 }));
      reply = { id: req.id, json, gz };
      transfer = [gz];
    } else {
      reply = {
        id: req.id,
        json: gunzipSync(bytes, { maxOutputLength: MAX_BLOCK_BYTES }).toString(
          'utf8',
        ),
      };
    }
  } catch (e) {
    reply = { id: req.id, error: e instanceof Error ? e.message : String(e) };
  }
  port.postMessage(reply, transfer);
});
