import path from 'node:path';
import { Workery } from '~/core/Workery';
import { type QueueInputs, QueueNames, queue } from '../queue/Queue';

type Events = {
  ADD_BLOCK_RANGE: QueueInputs[QueueNames.ADD_BLOCK_RANGE][];
  GET_ACTIVE_JOBS: null;
  ACTIVE_JOBS_RESPONSE: number;
  BLOCK_RANGE_ADDED: {
    from: string;
    to: string;
  };
};

export const worker = Workery.build<Events>({
  handler: path.resolve(__dirname, '../../application/uc/RunSyncMachine.ts'),
});

worker.on('ADD_BLOCK_RANGE', async (payloads) => {
  const from = String(payloads[0].from);
  const to = String(payloads[payloads.length - 1].to);
  await queue.pushBatch(QueueNames.ADD_BLOCK_RANGE, payloads, { priority: 2 });
  worker.postMessage('BLOCK_RANGE_ADDED', { from, to });
});

worker.on('GET_ACTIVE_JOBS', async () => {
  const jobs = await queue.activeJobs();
  console.log(`⚡️ Active jobs: ${jobs}`);
  worker.postMessage('ACTIVE_JOBS_RESPONSE', jobs);
});
