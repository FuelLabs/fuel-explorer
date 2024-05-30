import c from 'chalk';
import { Address } from '~/core/Address';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
import { InputRepository } from '~/domain/Input/InputRepository';
import { InputPredicateData } from '~/domain/Input/vo/InputPredicateData';
import { OperationRepository } from '~/domain/Operation/OperationRepository';
import { OperationsFactory } from '~/domain/Operation/factories/OperationsFactory';
import { OutputRepository } from '~/domain/Output/OutputRepository';
import type { PredicatePayload } from '~/domain/Predicate/PredicateModel';
import { PredicateRepository } from '~/domain/Predicate/PredicateRepository';
import type { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import type { GQLInput } from '~/graphql/generated/sdk';
import { type DbTransaction, db } from '~/infra/database/Db';
import type { QueueInputs, QueueNames } from '~/infra/queue/Queue';

class TransactionResources {
  constructor(
    readonly trx: DbTransaction,
    readonly blockHeight: string,
    readonly transaction: TransactionEntity,
  ) {}

  async syncResources() {
    await Promise.all([
      this.syncInputs(),
      this.syncOutputs(),
      this.syncContracts(),
      this.syncOperations(),
    ]);
  }

  private log(msg: string) {
    return console.log(`${c.grey(`[#${this.blockHeight}]`)} → ${msg}`);
  }

  private async syncInputs() {
    const { trx, transaction } = this;
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const inputs = transaction.data.inputs;
    const transactionId = transaction._id.value();
    if (!inputs?.length) return;

    this.log(`Syncing inputs on transaction ${hash}`);
    const repository = new InputRepository(trx);
    await repository.insertMany(inputs, transactionId);
    await this.syncPredicates(inputs);
  }

  private async syncOutputs() {
    const { trx, transaction } = this;
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const outputs = transaction.data.outputs;
    const transactionId = transaction._id.value();
    if (!outputs?.length) return;

    this.log(`Syncing outputs on transaction ${hash}`);
    const repository = new OutputRepository(trx);
    await repository.insertMany(outputs, transactionId);
  }

  private async syncContracts() {
    const { trx, transaction } = this;
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const contracts = transaction.getContractsCreated();
    if (!contracts.length) return;

    this.log(`Syncing contracts on transaction ${hash}`);
    const repository = new ContractRepository(trx);
    await repository.insertMany(contracts);
  }

  private async syncOperations() {
    const { trx, transaction } = this;
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const operations = OperationsFactory.create(transaction).value();
    if (!operations?.length) return;

    this.log(`Syncing operations on transaction ${hash}`);
    const repository = new OperationRepository(trx);
    const transactionId = transaction._id.value();
    const transactionHash = transaction.txHash;
    await repository.insertMany(operations, transactionId, transactionHash);
  }

  private async syncPredicates(inputs: GQLInput[]) {
    const predicates = inputs
      .map((input) => {
        const data = InputPredicateData.create(input);
        return data.value();
      })
      .filter(Boolean);

    if (!predicates.length) return;
    const txAddr = new Address(this.transaction.txHash);
    this.log(`Syncing predicates on transaction ${txAddr.short()}`);
    const repo = new PredicateRepository(this.trx);
    await repo.insertMany(predicates as PredicatePayload[]);
  }
}

type Data = QueueInputs[QueueNames.ADD_TRANSACTIONS];

export class AddTransactions {
  async execute({ items }: Data) {
    await db.connection().transaction(async (trx) => {
      const repo = new TransactionRepository(trx);
      const added = await repo.upsertMany(items, trx);
      if (!added?.length) {
        console.log(c.dim('No transactions to sync'));
        return;
      }
      await Promise.all(
        added.map(async (item) => {
          const height = String(item.blockHeight);
          const txResources = new TransactionResources(trx, height, item);
          return txResources.syncResources();
        }),
      );
    });
  }
}

export const addTransactions = async (data: Data) => {
  try {
    const { items } = data;
    const fromBlock = items[0].blockHeight;
    const toBlock = items[items.length - 1].blockHeight;
    const msg = `📪 Syncing transactions from #${fromBlock} to #${toBlock}`;
    console.log(c.dim(msg));
    const instance = new AddTransactions();
    await instance.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error('Sync transactions', {
      cause: error,
    });
  }
};
