import { Paginator } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { TransactionsTable } from '~/domain/Transaction/TransactionModel';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import type {
  GQLQueryTransactionArgs,
  GQLQueryTransactionsArgs,
  GQLQueryTransactionsByOwnerArgs,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';
import type { GraphQLContext } from '../GraphQLContext';

type Source = GQLTransaction;
type Params = {
  transaction: GQLQueryTransactionArgs;
  transactions: GQLQueryTransactionsArgs;
  transactionByOwner: GQLQueryTransactionsByOwnerArgs;
};

export class TransactionResolver extends ResolverAdapter<Source> {
  private constructor() {
    super();
    this.setResolvers({
      Query: {
        transaction: this.transaction.bind(this),
        transactions: this.transactions.bind(this),
        transactionsByOwner: this.transactionsByOwner.bind(this),
      },
    });
  }

  static create() {
    return new TransactionResolver().getResolvers();
  }

  async transaction(
    _: Source,
    params: Params['transaction'],
    { conn }: GraphQLContext,
  ) {
    const transactionRepository = new TransactionRepository(conn);
    const item = await transactionRepository.findByHash(params.id);
    return item?.toGQLNode();
  }

  async transactions(
    _: Source,
    params: Params['transactions'],
    { conn }: GraphQLContext,
  ) {
    const paginator = new Paginator(TransactionsTable, params, conn);
    const transactionRepository = new TransactionRepository(conn);
    const transactions = await transactionRepository.findMany(paginator);
    const startCursor = paginator.getStartCursor(transactions);
    const endCursor = paginator.getEndCursor(transactions);
    return paginator.createPaginatedResult(
      transactions,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
  }

  async transactionsByOwner(
    _: Source,
    params: Params['transactionByOwner'],
    { conn }: GraphQLContext,
  ) {
    const paginator = new Paginator(TransactionsTable, params, conn);
    const transactionRepository = new TransactionRepository(conn);
    const transactions = await transactionRepository.findByOwner(
      paginator,
      params.owner,
    );
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
