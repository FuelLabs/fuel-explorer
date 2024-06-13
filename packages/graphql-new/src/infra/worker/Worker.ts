import path from 'node:path';
import { Workery } from '~/core/Workery';
import { type QueueInputs, QueueNames, mq } from '../queue/Queue';

type WorkerEvents = {
  ADD_BLOCK_RANGE: QueueInputs[QueueNames.ADD_BLOCK_RANGE][];
  GET_ACTIVE_JOBS: null;
  ACTIVE_JOBS_RESPONSE: number;
  BLOCK_RANGE_ADDED: {
    from: string;
    to: string;
  };
};

export const worker = Workery.build<WorkerEvents>({
  handler: path.resolve(__dirname, '../../application/uc/RunSyncMachine.ts'),
});

worker.on('ADD_BLOCK_RANGE', async (payloads) => {
  const from = String(payloads[0].from);
  const to = String(payloads[payloads.length - 1].to);
  await Promise.all(
    payloads.map((payload) => {
      return mq.send('block', QueueNames.ADD_BLOCK_RANGE, payload);
    }),
  );
  worker.postMessage('BLOCK_RANGE_ADDED', { from, to });
});

worker.on('GET_ACTIVE_JOBS', async () => {
  const total = await mq.getActive(QueueNames.ADD_BLOCK_RANGE);
  console.log(`⚡️ Active jobs: ${total}`);
  worker.postMessage('ACTIVE_JOBS_RESPONSE', total);
});
