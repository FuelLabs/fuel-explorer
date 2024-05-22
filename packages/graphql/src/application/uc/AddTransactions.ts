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
import type { DbTransaction } from '~/infra/database/Db';

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
    return console.log(`${c.grey(`[#${this.blockHeight}]`)} ${msg}`);
  }

  private async syncInputs() {
    const { trx, transaction } = this;
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const inputs = transaction.data.inputs;
    const transactionId = transaction._id.value();
    if (!inputs?.length) return;

    this.log(`-- Syncing inputs on transaction ${hash}`);
    const repository = new InputRepository(trx);
    const created = await repository.insertMany(inputs, transactionId);
    await this.syncPredicates(created);
  }

  private async syncOutputs() {
    const { trx, transaction } = this;
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const outputs = transaction.data.outputs;
    const transactionId = transaction._id.value();
    if (!outputs?.length) return;

    this.log(`-- Syncing outputs on transaction ${hash}`);
    const repository = new OutputRepository(trx);
    await repository.insertMany(outputs, transactionId);
  }

  private async syncContracts() {
    const { trx, transaction } = this;
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const contracts = transaction.getContractsCreated();
    if (!contracts.length) return;

    console.log(`-- Syncing contracts on transaction ${hash}`);
    const repository = new ContractRepository(trx);
    await repository.insertMany(contracts);
  }

  private async syncOperations() {
    const { trx, transaction } = this;
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const operations = OperationsFactory.create(transaction).value();
    if (!operations?.length) return;

    console.log(`-- Syncing operations on transaction ${hash}`);
    const repository = new OperationRepository(trx);
    const transactionId = transaction._id.value();
    await repository.insertMany(operations, transactionId);
  }

  private async syncPredicates(inputs: InputEntity[]) {
    const predicates = inputs
      .map((input) => input.predicateData)
      .filter(Boolean);

    if (!predicates.length) return;
    await Promise.all(
      predicates.map(async (predicate) => {
        if (!predicate) return;
        const { bytecode, address } = predicate;
        const repository = new PredicateRepository(this.trx);
        const shortAddr = new Address(address).short();
        try {
          this.log(`-- Syncing predicate ${shortAddr}`);
          await repository.insertOne({ bytecode, address });
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (e: any) {
          if (e.toString().includes('duplicate key value')) {
            console.log(c.red(`Predicate ${shortAddr} already exists`));
            return;
          }
        }
      }),
    );
  }
}

type Input = {
  blocks: GQLBlock[];
  trx: DbTransaction;
};

export class AddTransactions {
  async execute({ trx, blocks }: Input) {
    const repo = new TransactionRepository(trx);
    const items = blocks.flatMap((block) =>
      block.transactions.map((transaction) => ({ block, transaction })),
    );
    const added = await repo.upsertMany(items, trx);
    if (!added?.length) {
      console.log(c.dim('No transactions to sync'));
      return;
    }
    await Promise.all(
      added.map(async (transaction) => {
        const height = transaction.blockHeight;
        const txResources = new TransactionResources(trx, height, transaction);
        return txResources.syncResources();
      }),
    );
  }
}

export const addTransactions = async (data: Input) => {
  try {
    const { blocks } = data;
    const fromBlock = blocks[0].header.height;
    const toBlock = blocks[blocks.length - 1].header.height;
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
