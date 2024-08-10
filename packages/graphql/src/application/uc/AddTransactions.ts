import c from 'chalk';
import { Address } from '~/core/Address';
import { logger } from '~/core/Logger';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
import { InputRepository } from '~/domain/Input/InputRepository';
import { InputPredicateData } from '~/domain/Input/vo/InputPredicateData';
// import { OperationRepository } from '~/domain/Operation/OperationRepository';
import { OutputRepository } from '~/domain/Output/OutputRepository';
import type { PredicatePayload } from '~/domain/Predicate/PredicateModel';
import { PredicateRepository } from '~/domain/Predicate/PredicateRepository';
import type { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import { client } from '~/graphql/GraphQLSDK';
import type {
  GQLBlock,
  GQLInput,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';
import type { DbTransaction } from '~/infra/database/Db';

class TransactionResources {
  constructor(
    readonly trx: DbTransaction,
    readonly blockHeight: string,
    readonly transaction: TransactionEntity,
  ) {}

  async syncResources() {
    await this.syncInputs();
    await this.syncOutputs();
    await this.syncContracts();
    await this.syncOperations();
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
    const contractIds = transaction.getContractsCreated();
    if (!contractIds.length) return;
    this.log(`Syncing contracts on transaction ${hash}`);
    const repository = new ContractRepository(trx);
    const contracts = [];
    for (const contractId of contractIds) {
      const existingContract = await repository.findByHash(contractId);
      if (existingContract) continue;
      const contract = (await client.sdk.contract({ id: contractId })).data
        .contract;
      if (contract) contracts.push({ ...contract, salt: '' });
    }
    await repository.insertMany(contracts);
  }

  private async syncOperations() {
    // const { trx, transaction } = this;
    // const txAddr = new Address(transaction.txHash);
    // const hash = txAddr.short();
    // const operations = []
    // if (!operations?.length) return;
    // this.log(`Syncing operations on transaction ${hash}`);
    // const transactionId = transaction._id.value();
    // const transactionHash = transaction.txHash;
    // const repository = new OperationRepository(trx);
    // await repository.insertMany(operations, transactionId, transactionHash);
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

type Data = {
  block: Omit<GQLBlock, 'transactions'>;
  transaction: GQLTransaction;
  index: number;
}[];

export class AddTransactions {
  constructor(readonly trx: DbTransaction) {}

  async execute(items: Data) {
    const repo = new TransactionRepository(this.trx);
    const transactions = await repo.upsertMany(items, this.trx);
    if (!transactions.length) {
      console.log(c.dim('No transactions to sync'));
      return;
    }
    for (const item of transactions) {
      const height = String(item.blockHeight);
      const txResources = new TransactionResources(this.trx, height, item);
      await txResources.syncResources();
    }
  }
}

export const addTransactions = async (items: Data, trx: DbTransaction) => {
  try {
    const fromBlock = items[0].block.header.height;
    const toBlock = items[items.length - 1].block.header.height;
    const msg = `📪 Syncing transactions from #${fromBlock} to #${toBlock}`;
    logger.syncer.info(c.dim(msg));
    const instance = new AddTransactions(trx);
    await instance.execute(items);
  } catch (error) {
    logger.error('Failed to sync transactions', error);
    console.log(error);
    throw new Error('Sync transactions', {
      cause: error,
    });
  }
};