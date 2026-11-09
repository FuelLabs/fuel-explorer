import { Worker } from 'node:worker_threads';

// better-sqlite3 runs on the event loop, so one stuck statement freezes the
// whole server while the container stays "up" and Railway never restarts it
// (mainnet incident 2026-11-05: ~37 min of timeouts after a slow index
// transaction). A worker thread keeps running while the main loop is blocked:
// the main thread stamps a shared heartbeat, and if it goes stale the worker
// SIGKILLs the process so the ON_FAILURE restart policy brings it back.
//
// The kill needs node not to be PID 1 (the kernel drops SIGKILL sent to a
// namespace's init from inside it), which is why the image runs under tini.
const WORKER_SOURCE = `
const { workerData } = require('node:worker_threads');
const { writeSync } = require('node:fs');
const beat = new Float64Array(workerData.heartbeat);
setInterval(() => {
  const stalledMs = Date.now() - beat[0];
  if (stalledMs < workerData.stallMs) return;
  // Not console.error: worker stdio is relayed through the blocked main thread.
  try {
    writeSync(2, 'watchdog: event loop blocked for ' + stalledMs + 'ms, killing process\\n');
  } catch {}
  process.kill(process.pid, 'SIGKILL');
}, workerData.checkMs);
`;

export function startWatchdog({
  stallMs,
  checkMs = 1000,
}: {
  stallMs: number;
  checkMs?: number;
}) {
  const heartbeat = new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT);
  const beat = new Float64Array(heartbeat);
  beat[0] = Date.now();
  setInterval(() => {
    beat[0] = Date.now();
  }, checkMs).unref();
  const worker = new Worker(WORKER_SOURCE, {
    eval: true,
    workerData: { heartbeat, stallMs, checkMs },
  });
  worker.unref();
  worker.on('error', (e) => console.error('watchdog worker failed', e));
}
