import { Paginator } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { TransactionsTable } from '~/domain/Transaction/TransactionModel';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import {
  GQLQueryTransactionArgs,
  GQLQueryTransactionsArgs,
  GQLQueryTransactionsByOwnerArgs,
  GQLTransaction,
} from '~/graphql/generated/sdk';

type Source = GQLTransaction;
type Params = {
  transaction: GQLQueryTransactionArgs;
  transactions: GQLQueryTransactionsArgs;
  transactionByOwner: GQLQueryTransactionsByOwnerArgs;
};

class TransactionResolver extends ResolverAdapter<Source> {
  private constructor(
    private readonly transactionRepository = new TransactionRepository(),
  ) {
    super();
    this.setResolvers({
      transaction: this.transaction.bind(this),
      transactions: this.transactions.bind(this),
      transactionsByOwner: this.transactionsByOwner.bind(this),
    });
  }

  static create() {
    return new TransactionResolver().getResolvers();
  }

  async transaction(_: Source, params: Params['transaction']) {
    const item = await this.transactionRepository.findById(params.id);
    return item?.toGQLNode() ?? null;
  }

  async transactions(_: Source, params: Params['transactions']) {
    const paginator = new Paginator(TransactionsTable, params);
    const transactions = await this.transactionRepository.findMany(params);
    const startCursor = paginator.getStartCursor(transactions);
    const endCursor = paginator.getEndCursor(transactions);
    return paginator.createPaginatedResult(
      transactions,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
  }

  async transactionsByOwner(_: Source, params: Params['transactionByOwner']) {
    const paginator = new Paginator(TransactionsTable, params);
    const transactions = await this.transactionRepository.findByOwner(params);
    const startCursor = paginator.getStartCursor(transactions);
    const endCursor = paginator.getEndCursor(transactions);
    return paginator.createPaginatedResult(
      transactions,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
  }
}

export default TransactionResolver.create();
