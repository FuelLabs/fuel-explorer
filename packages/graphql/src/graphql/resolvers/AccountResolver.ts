import type {
  GQLQueryAccountCreationStatisticsArgs,
  GQLQueryDailyActiveAccountsArgs,
  GQLQueryNewAccountStatisticsArgs,
} from '../../graphql/generated/sdk-provider';
import AccountDAO from '../../infra/dao/AccountDAO';
import TransactionDAO from '../../infra/dao/TransactionDAO';

export class AccountResolver {
  static create() {
    const resolvers = new AccountResolver();
    return {
      Query: {
        accountCreationStatistics: resolvers.accountCreationStatistics,
        newAccountStatistics: resolvers.newAccountStatistics,
      },
    };
  }

  async accountCreationStatistics(
    _: any,
    params: GQLQueryAccountCreationStatisticsArgs,
  ) {
    const accountDAO = new AccountDAO();
    const accounts = await accountDAO.accountCreationStatistics(
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
    const timeFilter = params.timeFilter || '1day';

    // Fetch transactions and unique accounts based on the time filter
    const dailyActiveAccounts =
      await transactionDAO.getDailyActiveAccounts(timeFilter);

    return {
      nodes: dailyActiveAccounts.map((day) => ({
        timestamp: day.date,
        count: day.count,
      })),
    };
  }
}
