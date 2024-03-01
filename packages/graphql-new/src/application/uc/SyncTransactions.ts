import { RetryAfterError } from 'inngest';
import { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
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
    const inputs = added.map(this.addInputs);
    const outputs = added.map(this.addOutputs);
    const contract = added.map(this.addContract);
    await Promise.all([...inputs, ...outputs, ...contract]);
  }

  private async addInputs(transaction: TransactionEntity) {
    const inputs = transaction.data.inputs;
    const transactionId = transaction._id.value();
    if (inputs?.length) {
      console.log(`Adding inputs for transaction ${transaction.transactionId}`);
      await inngest.syncInputs({ inputs, transactionId });
    }
  }

  private async addOutputs(transaction: TransactionEntity) {
    const outputs = transaction.data.outputs;
    const transactionId = transaction._id.value();
    if (outputs?.length) {
      console.log(
        `Adding outputs for transaction ${transaction.transactionId}`,
      );
      await inngest.syncOutputs({ outputs, transactionId });
    }
  }

  private async addContract(transaction: TransactionEntity) {
    const contract = transaction.getContractCreated();
    if (!contract) return;
    console.log(`Adding contract for transaction ${transaction.transactionId}`);
    await inngest.syncContract({ contract });
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
