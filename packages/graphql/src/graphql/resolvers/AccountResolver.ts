import type {
  GQLQueryAccountCreationStatisticsArgs,
  GQLQueryNewAccountStatisticsArgs,
} from '../../graphql/generated/sdk-provider';
import AccountDAO from '../../infra/dao/AccountDAO';

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
}
