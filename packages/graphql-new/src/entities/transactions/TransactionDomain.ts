import { GQLBlock } from '~/generated/types';
import { PaginatorParams } from '~/helpers/Paginator';
import { GraphQLContext } from '~/infra/graphql/GraphQLServer';
import { TransactionRepository } from './TransactionRepository';

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

  async transaction(_ctx: GraphQLContext, { id }: { id: string }) {
    const repository = new TransactionRepository();
    return repository.findById(id);
  }

  async transactions(_ctx: GraphQLContext, params: PaginatorParams) {
    const repository = new TransactionRepository();
    return repository.findMany(params);
  }

  async transactionsByOwner(
    _ctx: GraphQLContext,
    params: PaginatorParams & { owner: string },
  ) {
    const repository = new TransactionRepository();
    return repository.findByOwner(params.owner, params);
  }
}
