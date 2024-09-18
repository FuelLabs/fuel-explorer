import type {
  GQLQueryCumulativeAccountCreationStatisticsArgs,
  GQLQueryDailyActiveAccountsArgs,
  GQLQueryNewAccountStatisticsArgs,
  GQLQueryPaginatedAccountsArgs,
  GQLQueryTransactionsByAccountAndDateArgs,
} from '../../graphql/generated/sdk-provider';
import AccountDAO from '../../infra/dao/AccountDAO';
import TransactionDAO from '../../infra/dao/TransactionDAO';

interface Input {
  owner?: string;
  amount?: string;
  assetId?: string;
}

interface Output {
  to?: string;
  amount?: string;
  assetId?: string;
  __typename?: string;
}

interface Transaction {
  tx_hash?: string;
  timestamp?: string;
  totalGas?: string;
  totalFee?: string;
  isMint?: boolean;
  inputs: Input[];
  outputs: Output[];
}

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
        transactionsByAccountAndDate: resolvers.transactionsByAccountAndDate,
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

    const timeFilter = params.timeFilter || '';

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

  // New resolver for fetching transactions by account and date range
  async transactionsByAccountAndDate(
    _: any,
    params: GQLQueryTransactionsByAccountAndDateArgs,
  ) {
    const transactionDAO = new TransactionDAO();

    const transactions: Transaction[] =
      await transactionDAO.getTransactionsByAccountAndDate(
        params.account,
        params.startDate,
        params.endDate,
      );

    if (!transactions || transactions.length === 0) {
      return [];
    }

    return {
      nodes: transactions.map((tx) => ({
        tx_hash: tx.tx_hash || null,
        timestamp: tx.timestamp || null,
        totalGas: tx.totalGas || null,
        totalFee: tx.totalFee || null,
        isMint: tx.isMint || null,
        inputs: tx.inputs.map((input: Input) => ({
          owner: input.owner || null,
          amount: input.amount || null,
          assetId: input.assetId || null,
        })),
        outputs: tx.outputs.map((output: Output) => ({
          to: output.to || null,
          amount: output.amount || null,
          assetId: output.assetId || null,
          type: output.__typename || null, // Type can be VariableOutput or ChangeOutput
        })),
      })),
    };
  }
}
