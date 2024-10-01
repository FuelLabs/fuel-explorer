import type {
  GQLQueryCumulativeFeeStatisticsArgs,
  GQLQueryCumulativeTransactionStatisticsArgs,
  GQLQueryTransactionArgs,
  GQLQueryTransactionFeeStatisticsArgs,
  GQLQueryTransactionsArgs,
  GQLQueryTransactionsByBlockIdArgs,
  GQLQueryTransactionsByOwnerArgs,
  GQLQueryTransactionsStatisticsArgs,
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
  transactionsStatistics: GQLQueryTransactionsStatisticsArgs;
  transactionFeeStatistics: GQLQueryTransactionFeeStatisticsArgs;
  cumulativeFeeStatistics: GQLQueryCumulativeFeeStatisticsArgs;
  cumulativeTransactionStatistics: GQLQueryCumulativeTransactionStatisticsArgs;
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
        transactionsStatistics: resolvers.getTransactionsStatistics,
        transactionFeeStatistics: resolvers.getTransactionFeeStatistics,
        cumulativeFeeStatistics: resolvers.getCumulativeFeeStatistics,
        cumulativeTransactionStatistics:
          resolvers.getCumulativeTransactionStatistics,
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

  async getTransactionsStatistics(
    _: Source,
    _params: Params['transactionsStatistics'],
  ) {
    const transactionDAO = new TransactionDAO();
    const transactionStats = await transactionDAO.getTransactionsStatistics(
      _params.timeFilter ? _params.timeFilter : '',
    );

    return transactionStats;
  }

  async getTransactionFeeStatistics(
    _: Source,
    _params: Params['transactionFeeStatistics'],
  ) {
    const transactionDAO = new TransactionDAO();
    const transactionFeeStats =
      await transactionDAO.getTransactionFeeStatistics(
        _params.timeFilter ? _params.timeFilter : '',
      );

    return transactionFeeStats;
  }

  async getCumulativeFeeStatistics(
    _: Source,
    _params: Params['cumulativeFeeStatistics'],
  ) {
    const transactionDAO = new TransactionDAO();
    const cumulativeFeeStatistics =
      await transactionDAO.getCumulativeFeeStatistics(
        _params.timeFilter ? _params.timeFilter : '',
      );

    return cumulativeFeeStatistics;
  }

  async getCumulativeTransactionStatistics(
    _: Source,
    _params: Params['cumulativeTransactionStatistics'],
  ) {
    const transactionDAO = new TransactionDAO();
    const cumulativeTransactionStatistics =
      await transactionDAO.getCumulativeTransactionStatistics(
        _params.timeFilter ? _params.timeFilter : '',
      );

    return cumulativeTransactionStatistics;
  }
}
