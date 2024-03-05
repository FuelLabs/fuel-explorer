import { GetStepTools, RetryAfterError } from 'inngest';
import { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import { GQLBlock } from '~/graphql/generated/sdk';
import { Events, InngestEvents, inngest } from '~/infra/inngest/InngestClient';

type Step = GetStepTools<
  typeof inngest._client,
  InngestEvents.SYNC_TRANSACTIONS
>;

type Input = {
  block: GQLBlock;
  blockId: number;
};

export class SyncTransactions {
  constructor(private readonly step: Step) {}

  async execute({ block, blockId }: Input) {
    const repository = new TransactionRepository();
    const added = await repository.insertMany(block.transactions, blockId);
    const inputs = added.map(this.syncInputs.bind(this));
    const outputs = added.map(this.syncOutputs.bind(this));
    const contract = added.map(this.syncContracts.bind(this));
    await Promise.all([...inputs, ...outputs, ...contract]);
  }

  private async syncInputs(transaction: TransactionEntity) {
    const inputs = transaction.data.inputs;
    const transactionId = transaction._id.value();
    if (inputs?.length) {
      await this.step.sendEvent('sync:inputs', {
        name: InngestEvents.SYNC_INPUTS,
        data: { inputs, transactionId },
      });
    }
  }

  private async syncOutputs(transaction: TransactionEntity) {
    const outputs = transaction.data.outputs;
    const transactionId = transaction._id.value();
    if (outputs?.length) {
      await this.step.sendEvent('sync:outputs', {
        name: InngestEvents.SYNC_OUTPUTS,
        data: { outputs, transactionId },
      });
    }
  }

  private async syncContracts(transaction: TransactionEntity) {
    const contracts = transaction.getContractsCreated();
    const events = contracts.map<Events[InngestEvents.SYNC_CONTRACT]>(
      (contract) => ({
        name: InngestEvents.SYNC_CONTRACT,
        data: { contract },
      }),
    );
    if (events.length) {
      await this.step.sendEvent('sync:contracts', events);
    }
  }
}

export const syncTransactions = inngest
  .client()
  .createFunction(
    { id: 'sync:transactions' },
    { event: InngestEvents.SYNC_TRANSACTIONS, concurrency: 100 },
    async ({ step, attempt, event: { data: block } }) => {
      try {
        console.log(`Syncing transactions for block ${block.blockId}`);
        const syncTransactions = new SyncTransactions(step);
        return syncTransactions.execute(block);
      } catch (error) {
        console.error(error);
        throw new RetryAfterError(
          `Sync transactions attempt ${attempt}`,
          '1s',
          { cause: error },
        );
      }
    },
  );
