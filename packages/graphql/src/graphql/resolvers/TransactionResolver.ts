import { logger } from '~/core/Logger';
import { Paginator } from '~/core/Paginator';
import { TransactionsTable } from '~/domain/Transaction/TransactionModel';
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

export class TransactionResolver {
  static create() {
    const resolvers = new TransactionResolver();
    return {
      Query: {
        transaction: resolvers.transaction,
        transactions: resolvers.transactions,
        transactionsByOwner: resolvers.transactionsByOwner,
      },
    };
  }

  async transaction(
    _: Source,
    params: Params['transaction'],
    { repositories }: GraphQLContext,
  ) {
    logger.debugRequest('TransactionResolver.transaction', { params });
    const item = await repositories.transaction.findByHash(params.id);
    const response = item?.toGQLNode();
    logger.debugDone('TransactionResolver.transaction', { response });
    return response;
  }

  async transactions(
    _: Source,
    params: Params['transactions'],
    { conn, repositories }: GraphQLContext,
  ) {
    logger.debugRequest('TransactionResolver.transactions', { params });
    const paginator = new Paginator(TransactionsTable, params, conn);
    const transactions = await repositories.transaction.findMany(paginator);
    logger.debugResponse('TransactionResolver.transactions', { transactions });
    const startCursor = paginator.getStartCursor(transactions);
    const endCursor = paginator.getEndCursor(transactions);
    const results = await paginator.createPaginatedResult(
      transactions,
      startCursor,
      endCursor,
      (item) => ({ ...item.toGQLNode(), cursor: item.cursor }),
    );
    logger.debugDone('TransactionResolver.transactions', { results });
    return results;
  }

  async transactionsByOwner(
    _: Source,
    params: Params['transactionByOwner'],
    { conn, repositories }: GraphQLContext,
  ) {
    logger.debugRequest('TransactionResolver.transactionsByOwner', { params });
    const paginator = new Paginator(TransactionsTable, params, conn);
    const transactions = await repositories.transaction.findManyByOwner(
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
      (item) => ({ ...item.toGQLNode(), cursor: item.cursor }),
    );
    logger.debugDone('TransactionResolver.transactionsByOwner', { results });
    return results;
  }
}
