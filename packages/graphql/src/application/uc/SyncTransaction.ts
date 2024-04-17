import c from 'chalk';
import { Address } from '~/core/Address';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
import type { InputEntity } from '~/domain/Input/InputEntity';
import { InputRepository } from '~/domain/Input/InputRepository';
import { OperationRepository } from '~/domain/Operation/OperationRepository';
import { OperationsFactory } from '~/domain/Operation/factories/OperationsFactory';
import { OutputRepository } from '~/domain/Output/OutputRepository';
import { PredicateRepository } from '~/domain/Predicate/PredicateRepository';
import type { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import type { GQLBlock } from '~/graphql/generated/sdk';
import type { QueueData, QueueInputs, QueueNames } from '~/infra/queue/Queue';

type Input = QueueInputs[QueueNames.SYNC_TRANSACTION];

export class SyncTransactions {
  constructor(
    readonly txAddr: Address,
    readonly block: GQLBlock,
  ) {}

  async execute({ txHash, block, index }: Input) {
    const repository = new TransactionRepository();
    const added = await repository.insertOne(txHash, block, index);
    const hash = this.txAddr.short();
    if (!added) {
      console.log(
        c.red(`${printBlock(block)} Transaction ${hash} already exists`),
      );
      return;
    }
    await Promise.all([
      this.syncInputs(added),
      this.syncOutputs(added),
      this.syncContracts(added),
      this.syncOperations(added),
    ]);
  }

  private async syncInputs(transaction: TransactionEntity) {
    const block = this.block;
    const inputs = transaction.data.inputs;
    const transactionId = transaction._id.value();
    const txHash = this.txAddr.short();
    if (!inputs?.length) return;

    console.log(
      `${printBlock(block)} -- Syncing inputs on transaction ${txHash}`,
    );
    const repository = new InputRepository();
    const created = await repository.insertMany(inputs, transactionId);
    await this.syncPredicates(created);
  }

  private async syncOutputs(transaction: TransactionEntity) {
    const block = this.block;
    const outputs = transaction.data.outputs;
    const transactionId = transaction._id.value();
    const txHash = this.txAddr.short();
    if (!outputs?.length) return;

    console.log(
      `${printBlock(block)} -- Syncing outputs on transaction ${txHash}`,
    );
    const repository = new OutputRepository();
    await repository.insertMany(outputs, transactionId);
  }

  private async syncContracts(transaction: TransactionEntity) {
    const block = this.block;
    const txHash = this.txAddr.short();
    const contracts = transaction.getContractsCreated();
    const repository = new ContractRepository();
    if (!contracts.length) return;

    console.log(
      `${printBlock(block)} -- Syncing contracts on transaction ${txHash}`,
    );
    await repository.insertMany(contracts);
  }

  private async syncOperations(transaction: TransactionEntity) {
    const block = this.block;
    const txHash = this.txAddr.short();
    const repository = new OperationRepository();
    const operations = OperationsFactory.create(transaction).value();
    if (!operations?.length) return;

    console.log(
      `${printBlock(block)} -- Syncing operations on transaction ${txHash}`,
    );
    const transactionId = transaction._id.value();
    await repository.insertMany(operations, transactionId);
  }

  private async syncPredicates(inputs: InputEntity[]) {
    const block = this.block;
    const predicates = inputs
      .map((input) => input.predicateData)
      .filter(Boolean);

    if (!predicates.length) return;
    await Promise.all(
      predicates.map(async (predicate) => {
        if (!predicate) return;
        const { bytecode, address } = predicate;
        const repository = new PredicateRepository();
        const shortAddr = new Address(address).short();
        try {
          console.log(`${printBlock(block)} -- Syncing predicate ${shortAddr}`);
          await repository.insertOne({ bytecode, address });
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (e: any) {
          if (e.toString().includes('duplicate key value')) {
            console.log(
              c.red(
                `${printBlock(block)} Predicate ${shortAddr} already exists`,
              ),
            );
            return;
          }
          throw e;
        }
      }),
    );
  }
}

export const syncTransactions = async ({ data }: QueueData<Input>) => {
  try {
    const txAddr = new Address(data.txHash);
    const shortAddr = txAddr.short();
    console.log(`${printBlock(data.block)} Syncing transaction ${shortAddr}`);

    const syncTransactions = new SyncTransactions(txAddr, data.block);
    return syncTransactions.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error(`Sync transactions ${data.txHash}`, {
      cause: error,
    });
  }
};

function printBlock(block: GQLBlock) {
  return c.grey(`[#${block.header.height}]`);
}
