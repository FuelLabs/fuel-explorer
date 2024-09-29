import type {
  GQLQueryCumulativeAccountStatisticsArgs,
  GQLQueryDailyActiveAccountStatisticsArgs,
  GQLQueryNewAccountStatisticsArgs,
  GQLQueryPaginatedAccountsArgs,
} from '../../graphql/generated/sdk-provider';
import AccountDAO from '../../infra/dao/AccountDAO';

// Define types for statistics
type NewAccountStat = {
  time: string;
  new_accounts: number;
};

type DailyActiveAccountStat = {
  time: string;
  active_accounts: number;
};

type CumulativeAccountStat = {
  time: string;
  cumulative_accounts: number;
};

export class AccountResolver {
  static create() {
    const resolvers = new AccountResolver();
    return {
      Query: {
        paginatedAccounts: resolvers.paginatedAccounts,
        newAccountStatistics: resolvers.newAccountStatistics,
        dailyActiveAccountStatistics: resolvers.dailyActiveAccountStatistics,
        cumulativeAccountStatistics: resolvers.cumulativeAccountStatistics,
      },
    };
  }

  async paginatedAccounts(_: any, params: GQLQueryPaginatedAccountsArgs) {
    const accountDAO = new AccountDAO();

    // Set the default sorting by transaction_count, change to balance if needed
    const sortBy =
      params.sortBy === 'balance' ? 'balance' : 'transaction_count';
    const sortOrder = (params.sortOrder || 'desc') as 'desc' | 'asc';
    const first = params.first;
    const cursor = params.cursor || undefined;

    const accounts = await accountDAO.getPaginatedAccounts(
      sortBy,
      sortOrder,
      first,
      cursor,
    );

    return accounts;
  }

  async newAccountStatistics(_: any, params: GQLQueryNewAccountStatisticsArgs) {
    const accountDAO = new AccountDAO();

    // Use the time filter parameter to fetch new account statistics
    const timeFilter = params.timeFilter;
    const newAccountStatsResponse =
      await accountDAO.getNewAccountStatistics(timeFilter);

    // Extract nodes from the response and map them
    const nodes = newAccountStatsResponse.nodes.map((stat: NewAccountStat) => ({
      timestamp: stat.time,
      newAccounts: stat.new_accounts,
    }));

    return { nodes };
  }

  async dailyActiveAccountStatistics(
    _: any,
    params: GQLQueryDailyActiveAccountStatisticsArgs,
  ) {
    const accountDAO = new AccountDAO();

    // Use the time filter parameter to fetch daily active account statistics
    const timeFilter = params.timeFilter;
    const activeAccountStatsResponse =
      await accountDAO.getDailyActiveAccountStatistics(timeFilter);

    // Extract nodes from the response and map them
    const nodes = activeAccountStatsResponse.nodes.map(
      (stat: DailyActiveAccountStat) => ({
        timestamp: stat.time,
        activeAccounts: stat.active_accounts,
      }),
    );

    return { nodes };
  }

  async cumulativeAccountStatistics(
    _: any,
    params: GQLQueryCumulativeAccountStatisticsArgs,
  ) {
    const accountDAO = new AccountDAO();

    // Use the time filter parameter to fetch cumulative account statistics
    const timeFilter = params.timeFilter;
    const cumulativeStatisticsResponse =
      await accountDAO.getCumulativeAccountStatistics(timeFilter);

    // Extract nodes from the response and map them
    const nodes = cumulativeStatisticsResponse.nodes.map(
      (stat: CumulativeAccountStat) => ({
        timestamp: stat.time,
        cumulativeAccounts: stat.cumulative_accounts,
      }),
    );

    return { nodes };
  }
}
