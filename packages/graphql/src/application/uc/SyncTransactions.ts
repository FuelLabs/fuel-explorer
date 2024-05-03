import c from 'chalk';
import { uniqBy } from 'lodash';
import type { GQLBlock } from '~/graphql/generated/sdk';
import type { QueueData, QueueInputs, QueueNames } from '~/infra/queue/Queue';
import { pool } from '~/infra/worker/WorkerPool';

type Input = QueueInputs[QueueNames.SYNC_TRANSACTIONS];
export type SyncTransactionEvent = {
  index: number;
  block: GQLBlock;
  txHash: string;
};

export class SyncTransactions {
  async execute({ data }: QueueData<Input>) {
    const { blocks } = data;
    const events = blocks.flatMap((block) => {
      const txs = uniqBy(block.transactions, 'id');
      return txs.map<SyncTransactionEvent>((transaction, idx) => ({
        index: idx,
        block: block,
        txHash: transaction.id,
      }));
    });

    if (events.length) {
      const fromBlock = blocks[0].header.height;
      const toBlock = blocks[blocks.length - 1].header.height;
      const msg = `# Syncing ${events.length} transactions from ${fromBlock} to ${toBlock}`;
      console.log(c.gray(msg));
      await pool.run({ data: events });
    }
  }
}

export const syncTransactions = async (input: QueueData<Input>) => {
  try {
    const syncTransactions = new SyncTransactions();
    await syncTransactions.execute(input);
  } catch (error) {
    console.error(error);
    throw new Error('Sync transactions', {
      cause: error,
    });
  }
};
