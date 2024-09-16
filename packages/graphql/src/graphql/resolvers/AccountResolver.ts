import type {
  GQLQueryCumulativeAccountCreationStatisticsArgs,
  GQLQueryDailyActiveAccountsArgs,
  GQLQueryNewAccountStatisticsArgs,
  GQLQueryPaginatedAccountsArgs,
} from '../../graphql/generated/sdk-provider';
import AccountDAO from '../../infra/dao/AccountDAO';
import TransactionDAO from '../../infra/dao/TransactionDAO';

export class AccountResolver {
  static create() {
    const resolvers = new AccountResolver();
    return {
      Query: {
        cumulativeAccountCreationStatistics:
          resolvers.cumulativeAccountCreationStatistics,
        newAccountStatistics: resolvers.newAccountStatistics,
        dailyActiveAccounts: resolvers.dailyActiveAccounts,
        paginatedAccounts: resolvers.paginatedAccounts,
      },
    };
  }

  async cumulativeAccountCreationStatistics(
    _: any,
    params: GQLQueryCumulativeAccountCreationStatisticsArgs,
  ) {
    const accountDAO = new AccountDAO();
    const accounts = await accountDAO.cumulativeAccountCreationStatistics(
      params.timeFilter || '',
    );
    return accounts;
  }

  async newAccountStatistics(_: any, params: GQLQueryNewAccountStatisticsArgs) {
    const accountDAO = new AccountDAO();
    const accounts = await accountDAO.newAccountStatistics(
      params.timeFilter || '',
    );
    return accounts;
  }

  async dailyActiveAccounts(_: any, params: GQLQueryDailyActiveAccountsArgs) {
    const transactionDAO = new TransactionDAO();

    // Get the time filter passed from the query (e.g., '1day', '7days')
    const timeFilter = params.timeFilter || '';

    // Fetch transactions and unique accounts based on the time filter
    const dailyActiveAccounts =
      await transactionDAO.getDailyActiveAccounts(timeFilter);

    return {
      nodes: dailyActiveAccounts.map((day) => ({
        timestamp: day.timestamp,
        count: day.count,
      })),
    };
  }

  async paginatedAccounts(_: any, params: GQLQueryPaginatedAccountsArgs) {
    const accountDAO = new AccountDAO();

    // Set the default sorting by transaction_count, change to balance if needed
    const sortBy =
      params.sortBy === 'balance' ? 'balance' : 'transaction_count';
    const sortOrder = (params.sortOrder || 'desc') as 'desc' | 'asc';
    const first = params.first || 10; // Limit to 10 by default

    const accounts = await accountDAO.getPaginatedAccounts(
      sortBy, // Sort by either transaction_count or balance
      sortOrder, // Ascending or descending
      first, // Limit to specified number of records
    );

    return accounts;
  }
}
