import path from 'node:path';
import { runSyncMachine } from '~/application/uc/RunSyncMachine';
import { Workery } from '~/core/Workery';
import { type QueueInputs, QueueNames, queue } from '../queue/Queue';

type Events = {
  SYNC_BLOCKS: QueueInputs[QueueNames.SYNC_BLOCKS];
  ADD_BLOCK_RANGE: {
    from: number;
    to: number;
  }[];
  GET_ACTIVE_JOBS: undefined;
  ACTIVE_JOBS_RESPONSE: {
    hasActive: boolean;
  };
};

export const worker = Workery.create<Events>({
  filepath: path.resolve(__filename),
});

worker.on('SYNC_BLOCKS', async (data) => {
  await runSyncMachine(data);
});

worker.on('ADD_BLOCK_RANGE', async (items) => {
  await queue.pushBatch(QueueNames.ADD_BLOCK_RANGE, items, { priority: 2 });
});

worker.on('GET_ACTIVE_JOBS', async () => {
  const hasActive = await queue.hasActiveJobs();
  worker.postMessage('ACTIVE_JOBS_RESPONSE', { hasActive });
});
