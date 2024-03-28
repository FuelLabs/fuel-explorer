import { RetryAfterError } from 'inngest';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
import { InputEntity } from '~/domain/Input/InputEntity';
import { InputRepository } from '~/domain/Input/InputRepository';
import { OperationRepository } from '~/domain/Operation/OperationRepository';
import { OperationsFactory } from '~/domain/Operation/factories/OperationsFactory';
import { OutputRepository } from '~/domain/Output/OutputRepository';
import { PredicateRepository } from '~/domain/Predicate/PredicateRepository';
import { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import {
  InngestEvents,
  InngestInputs,
  inngest,
} from '~/infra/inngest/InngestClient';

type Input = InngestInputs[InngestEvents.SYNC_TRANSACTION];

export class SyncTransactions {
  async execute({ txHash, block, index }: Input) {
    const repository = new TransactionRepository();
    const added = await repository.insertOne(txHash, block, index);
    await Promise.all([
      this.syncInputs(added),
      this.syncOutputs(added),
      this.syncContracts(added),
      this.syncOperations(added),
    ]);
  }

  private async syncInputs(transaction: TransactionEntity) {
    const inputs = transaction.data.inputs;
    const transactionId = transaction._id.value();
    if (inputs?.length) {
      console.log(`Syncing inputs for transaction ${transaction.txHash}...`);
      const repository = new InputRepository();
      const created = await repository.insertMany(inputs, transactionId);
      await this.syncPredicates(created);
    }
  }

  private async syncOutputs(transaction: TransactionEntity) {
    const outputs = transaction.data.outputs;
    const transactionId = transaction._id.value();
    if (outputs?.length) {
      console.log(`Syncing outputs for transaction ${transaction.txHash}...`);
      const repository = new OutputRepository();
      await repository.insertMany(outputs, transactionId);
    }
  }

  private async syncContracts(transaction: TransactionEntity) {
    const contracts = transaction.getContractsCreated();
    await Promise.all(
      contracts.map(async (contract) => {
        console.log(`Syncing contract ${contract.id}...`);
        const repository = new ContractRepository();
        await repository.insertOne(contract);
      }),
    );
  }

  private async syncOperations(transaction: TransactionEntity) {
    const repository = new OperationRepository();
    const operations = OperationsFactory.create(transaction).value();
    if (!operations) return;

    console.log(`Syncing operations for transaction ${transaction.txHash}...`);
    const transactionId = transaction._id.value();
    await repository.insertMany(operations, transactionId);
  }

  private async syncPredicates(inputs: InputEntity[]) {
    const predicates = inputs
      .map((input) => input.predicateData)
      .filter(Boolean);

    await Promise.all(
      predicates.map(async (predicate) => {
        if (!predicate) return;
        const { bytecode, address } = predicate;
        const repository = new PredicateRepository();
        try {
          console.log(`Syncing predicate ${address}...`);
          await repository.insertOne({ bytecode, address });
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (e: any) {
          if (e.toString().includes('duplicate key value')) {
            console.log('Predicate already exists');
            return;
          }
          throw e;
        }
      }),
    );
  }
}

export const syncTransactions = inngest.client().createFunction(
  { id: 'sync:transaction' },
  {
    event: InngestEvents.SYNC_TRANSACTION,
    concurrency: 1,
    debounce: { key: 'transaction', period: '1s' },
  },
  async ({ attempt, event: { data } }) => {
    try {
      console.log(`Syncing transaction ${data.txHash}`);
      const syncTransactions = new SyncTransactions();
      return syncTransactions.execute(data);
    } catch (error) {
      console.error(error);
      throw new RetryAfterError(`Sync transactions attempt ${attempt}`, '1s', {
        cause: error,
      });
    }
  },
);
