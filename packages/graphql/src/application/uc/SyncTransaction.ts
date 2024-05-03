import type { QueueData, QueueInputs, QueueNames } from '~/infra/queue/Queue';
import { pool } from '~/infra/worker/WorkerPool';

type Input = QueueInputs[QueueNames.SYNC_TRANSACTION];

export class SyncTransaction {
  async execute(input: QueueData<Input>) {
    await pool.run(input);
  }
}

export const syncTransaction = async (input: QueueData<Input>) => {
  const { data } = input;
  try {
    const syncTransactions = new SyncTransaction();
    return syncTransactions.execute(input);
  } catch (error) {
    console.error(error);
    throw new Error(`Sync transactions ${data.txHash}`, {
      cause: error,
    });
  }
};
