import { RetryAfterError } from 'inngest';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import { GQLBlock } from '~/generated/types';
import { inngest } from '~/infra/inngest/InngestClient';

type Input = {
  block: GQLBlock;
  blockId: number;
};

export class SyncTransactions {
  async execute({ block, blockId }: Input) {
    const repository = new TransactionRepository();
    const added = await repository.insertMany(block.transactions, blockId);

    await Promise.all(
      added.map(async (transaction) => {
        const transactionId = transaction._id.value();
        const inputs = transaction.data.inputs;
        const outputs = transaction.data.outputs;
        if (inputs?.length) {
          await inngest.syncInputs({ inputs, transactionId });
        }
        if (outputs?.length) {
          await inngest.syncOutputs({ outputs, transactionId });
        }
      }),
    );
  }
}

export const syncTransactions = inngest
  .client()
  .createFunction(
    { id: 'sync:transactions' },
    { event: 'indexer/sync:transactions', concurrency: 500 },
    async ({ attempt, event: { data: block } }) => {
      try {
        console.log(`Syncing transactions for block ${block.blockId}`);
        const syncTransactions = new SyncTransactions();
        return syncTransactions.execute(block);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(`Sync transactions attempt ${attempt}`, '1s');
      }
    },
  );
