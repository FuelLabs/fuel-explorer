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
import { type DbTransaction, db } from '~/infra/database/Db';
import type { SyncTransactionEvent } from './SyncTransactions';

type Input = SyncTransactionEvent[];

export class AddTransactions {
  async execute(input: Input) {
    await db.connection().transaction(async (trx) => {
      await Promise.all(
        input.map((event) => {
          return this.syncTransaction(trx, event);
        }),
      );
    });
  }

  private async syncTransaction(
    trx: DbTransaction,
    { txHash, block, index }: SyncTransactionEvent,
  ) {
    const repository = new TransactionRepository(trx);
    const added = await repository.insertOne(txHash, block, index);
    const txAddr = new Address(txHash);
    const hash = txAddr.short();

    if (!added) {
      console.log(
        c.red(`${printBlock(block)} Transaction ${hash} already exists`),
      );
      return;
    }

    await db.connection().transaction(async (itrx) => {
      await Promise.all([
        this.syncInputs(itrx, added, block),
        this.syncOutputs(itrx, added, block),
        this.syncContracts(itrx, added, block),
        this.syncOperations(itrx, added, block),
      ]);
    });
  }

  private async syncInputs(
    trx: DbTransaction,
    transaction: TransactionEntity,
    block: GQLBlock,
  ) {
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const inputs = transaction.data.inputs;
    const transactionId = transaction._id.value();
    if (!inputs?.length) return;

    console.log(
      `${printBlock(block)} -- Syncing inputs on transaction ${hash}`,
    );
    const repository = new InputRepository(trx);
    const created = await repository.insertMany(inputs, transactionId);
    await this.syncPredicates(trx, created, block);
  }

  private async syncOutputs(
    trx: DbTransaction,
    transaction: TransactionEntity,
    block: GQLBlock,
  ) {
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const outputs = transaction.data.outputs;
    const transactionId = transaction._id.value();
    if (!outputs?.length) return;

    console.log(
      `${printBlock(block)} -- Syncing outputs on transaction ${hash}`,
    );
    const repository = new OutputRepository(trx);
    await repository.insertMany(outputs, transactionId);
  }

  private async syncContracts(
    trx: DbTransaction,
    transaction: TransactionEntity,
    block: GQLBlock,
  ) {
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const contracts = transaction.getContractsCreated();
    if (!contracts.length) return;

    console.log(
      `${printBlock(block)} -- Syncing contracts on transaction ${hash}`,
    );
    const repository = new ContractRepository(trx);
    await repository.insertMany(contracts);
  }

  private async syncOperations(
    trx: DbTransaction,
    transaction: TransactionEntity,
    block: GQLBlock,
  ) {
    const txAddr = new Address(transaction.txHash);
    const hash = txAddr.short();
    const operations = OperationsFactory.create(transaction).value();
    if (!operations?.length) return;

    console.log(
      `${printBlock(block)} -- Syncing operations on transaction ${hash}`,
    );
    const repository = new OperationRepository(trx);
    const transactionId = transaction._id.value();
    await repository.insertMany(operations, transactionId);
  }

  private async syncPredicates(
    trx: DbTransaction,
    inputs: InputEntity[],
    block: GQLBlock,
  ) {
    const predicates = inputs
      .map((input) => input.predicateData)
      .filter(Boolean);

    if (!predicates.length) return;
    await Promise.all(
      predicates.map(async (predicate) => {
        if (!predicate) return;
        const { bytecode, address } = predicate;
        const repository = new PredicateRepository(trx);
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

export const addTransactions = async (data: Input) => {
  try {
    const instance = new AddTransactions();
    await instance.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error('Sync transactions', {
      cause: error,
    });
  }
};

function printBlock(block: GQLBlock) {
  return c.grey(`[#${block.header.height}]`);
}
