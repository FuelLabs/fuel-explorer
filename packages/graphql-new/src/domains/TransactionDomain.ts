import { Context } from '../core/GraphQLServer';
import { PaginatorParams } from '../core/Paginator';
import { GQLBlock } from '../generated/types';
import { TransactionRepository } from '../repositories/TransactionRepository';

export class TransactionDomain {
  async syncTransactions(block: GQLBlock, blockId: number) {
    const repository = new TransactionRepository();
    await repository.insertMany(block.transactions, blockId);
  }

  createResolvers() {
    return {
      Query: {
        transactions: this.transactions,
        transactionsByOwner: this.transactionsByOwner,
        transaction: this.transaction,
      },
    };
  }

  async transaction(_ctx: Context, { id }: { id: string }) {
    const repository = new TransactionRepository();
    return repository.findById(id);
  }

  async transactions(_ctx: Context, params: PaginatorParams) {
    const repository = new TransactionRepository();
    return repository.findMany(params);
  }

  async transactionsByOwner(
    _ctx: Context,
    params: PaginatorParams & { owner: string },
  ) {
    const repository = new TransactionRepository();
    return repository.findByOwner(params.owner, params);
  }
}
