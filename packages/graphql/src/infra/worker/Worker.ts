import path from 'node:path';
import c from 'chalk';
import { Workery } from '~/core/Workery';
import { QueueNames, queue } from '../queue/Queue';

type Events = {
  ADD_BLOCK_RANGE: {
    from: number;
    to: number;
  }[];
  GET_ACTIVE_JOBS: null;
  ACTIVE_JOBS_RESPONSE: number;
};

export const worker = Workery.build<Events>({
  handler: path.resolve(__dirname, '../../application/uc/RunSyncMachine.ts'),
});

worker.on('ADD_BLOCK_RANGE', async (events) => {
  const from = events[0].from;
  const to = events[events.length - 1].to;
  console.log(c.green(`🔗 Add blocks to sync: #${from} - #${to}`));
  await queue.pushBatch(QueueNames.ADD_BLOCK_RANGE, events, { priority: 2 });
});

worker.on('GET_ACTIVE_JOBS', async () => {
  const activeJobs = await queue.activeJobs();
  worker.postMessage('ACTIVE_JOBS_RESPONSE', activeJobs);
});
