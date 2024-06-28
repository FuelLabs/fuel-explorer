import { logger } from '~/core/Logger';
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
    logger.debugRequest('TransactionResolver.transaction', { params });
    const transactionRepository = new TransactionRepository(conn);
    const item = await transactionRepository.findByHash(params.id);
    const response = item?.toGQLNode();
    logger.debugDone('TransactionResolver.transaction', { response });
    return response;
  }

  async transactions(
    _: Source,
    params: Params['transactions'],
    { conn }: GraphQLContext,
  ) {
    logger.debugRequest('TransactionResolver.transactions', { params });
    const paginator = new Paginator(TransactionsTable, params, conn);
    const transactionRepository = new TransactionRepository(conn);
    const transactions = await transactionRepository.findMany(paginator);
    logger.debugResponse('TransactionResolver.transactions', { transactions });
    const startCursor = paginator.getStartCursor(transactions);
    const endCursor = paginator.getEndCursor(transactions);
    const results = await paginator.createPaginatedResult(
      transactions,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
    logger.debugDone('TransactionResolver.transactions', { results });
    return results;
  }

  async transactionsByOwner(
    _: Source,
    params: Params['transactionByOwner'],
    { conn }: GraphQLContext,
  ) {
    logger.debugRequest('TransactionResolver.transactionsByOwner', { params });
    const paginator = new Paginator(TransactionsTable, params, conn);
    const transactionRepository = new TransactionRepository(conn);
    const transactions = await transactionRepository.findByOwner(
      paginator,
      params.owner,
    );
    logger.debugResponse('TransactionResolver.transactionsByOwner', {
      transactions,
    });
    const startCursor = paginator.getStartCursor(transactions);
    const endCursor = paginator.getEndCursor(transactions);
    const results = await paginator.createPaginatedResult(
      transactions,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
    logger.debugDone('TransactionResolver.transactionsByOwner', { results });
    return results;
  }
}
