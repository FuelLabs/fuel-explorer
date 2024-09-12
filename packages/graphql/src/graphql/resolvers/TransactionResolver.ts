import type {
  GQLQueryTransactionArgs,
  GQLQueryTransactionsArgs,
  GQLQueryTransactionsByOwnerArgs,
  GQLQueryTransactionsByBlockIdArgs,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';
import TransactionDAO from '~/infra/dao/TransactionDAO';
import PaginatedParams from '~/infra/paginator/PaginatedParams';

type Source = GQLTransaction;
type Params = {
  transaction: GQLQueryTransactionArgs;
  transactions: GQLQueryTransactionsArgs;
  transactionByOwner: GQLQueryTransactionsByOwnerArgs;
  transactionByBlockId: GQLQueryTransactionsByBlockIdArgs;
};

export class TransactionResolver {
  static create() {
    const resolvers = new TransactionResolver();
    return {
      Query: {
        transaction: resolvers.transaction,
        transactions: resolvers.transactions,
        transactionsByOwner: resolvers.transactionsByOwner,
        transactionsByBlockId: resolvers.transactionsByBlockId,
      },
    };
  }

  async transaction(_: Source, params: Params['transaction']) {
    const transactionDAO = new TransactionDAO();
    const transaction = await transactionDAO.getByHash(params.id);
    const output = transaction?.toGQLNode();
    return output;
  }

  async transactions(_: Source, params: Params['transactions']) {
    const transactionDAO = new TransactionDAO();
    const paginatedParams = new PaginatedParams(params);
    const transactions =
      await transactionDAO.getPaginatedTransactions(paginatedParams);
    return transactions;
  }

  async transactionsByOwner(_: Source, params: Params['transactionByOwner']) {
    const transactionDAO = new TransactionDAO();
    const paginatedParams = new PaginatedParams(params);
    const transactions = await transactionDAO.getPaginatedTransactionsByOwner(
      params.owner,
      paginatedParams,
    );
    return transactions;
  }

  async transactionsByBlockId(
    _: Source,
    params: Params['transactionByBlockId'],
  ) {
    const transactionDAO = new TransactionDAO();
    const paginatedParams = new PaginatedParams(params);
    const transactions = await transactionDAO.getPaginatedTransactionsByBlockId(
      params.blockId,
      paginatedParams,
    );
    return transactions;
  }
}
