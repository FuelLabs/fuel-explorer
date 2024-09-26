import type { GQLQueryPaginatedAccountsArgs } from '../../graphql/generated/sdk-provider';
import AccountDAO from '../../infra/dao/AccountDAO';

export class AccountResolver {
  static create() {
    const resolvers = new AccountResolver();
    return {
      Query: {
        paginatedAccounts: resolvers.paginatedAccounts,
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
}
