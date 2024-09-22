import type {
  GQLQueryCumulativeAccountCreationStatisticsArgs,
  GQLQueryDailyActiveAccountsArgs,
  GQLQueryNewAccountStatisticsArgs,
  GQLQueryPaginatedAccountsArgs,
  GQLQueryTransactionsByAccountAndDateArgs,
} from '../../graphql/generated/sdk-provider';
import AccountDAO from '../../infra/dao/AccountDAO';
import TransactionDAO from '../../infra/dao/TransactionDAO';

// Define the base Input interface with a __typename discriminator
interface Input {
  __typename: 'InputCoin' | 'InputContract' | 'InputMessage';
  owner?: string;
  amount?: string;
  assetId?: string;
}

// Define specific types for Input variants
interface InputCoin extends Input {
  __typename: 'InputCoin';
  utxoId?: string;
  txPointer?: string;
  witnessIndex?: number;
}

interface InputContract extends Input {
  __typename: 'InputContract';
  contractId?: string;
  balanceRoot?: string;
  stateRoot?: string;
  txPointer?: string;
  utxoId?: string;
}

interface InputMessage extends Input {
  __typename: 'InputMessage';
  sender?: string;
  recipient?: string;
  amount?: string;
  nonce?: string;
}

// Define Transaction type
interface Transaction {
  tx_hash?: string;
  timestamp?: string;
  totalGas?: string;
  totalFee?: string;
  isMint?: boolean;
  inputs: Input[];
  outputs: Output[];
}

// Define Output types with a __typename discriminator
interface Output {
  __typename: string;
}

interface ChangeOutput extends Output {
  __typename: 'ChangeOutput';
  to?: string;
  amount?: string;
  assetId?: string;
}

interface ContractOutput extends Output {
  __typename: 'ContractOutput';
  inputIndex?: string;
  balanceRoot?: string;
  stateRoot?: string;
}

interface VariableOutput extends Output {
  __typename: 'VariableOutput';
  to?: string;
  amount?: string;
  assetId?: string;
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

    const isInputCoin = (input: Input): input is InputCoin =>
      input.__typename === 'InputCoin';
    const isInputContract = (input: Input): input is InputContract =>
      input.__typename === 'InputContract';
    const isInputMessage = (input: Input): input is InputMessage =>
      input.__typename === 'InputMessage';

    const isChangeOutput = (output: Output): output is ChangeOutput =>
      output.__typename === 'ChangeOutput';
    const isContractOutput = (output: Output): output is ContractOutput =>
      output.__typename === 'ContractOutput';
    const isVariableOutput = (output: Output): output is VariableOutput =>
      output.__typename === 'VariableOutput';

    return transactions.map((tx) => ({
      tx_hash: tx.tx_hash || null,
      timestamp: tx.timestamp || null,
      totalGas: tx.totalGas || null,
      totalFee: tx.totalFee || null,
      isMint: tx.isMint !== undefined ? tx.isMint : null,

      inputs: tx.inputs.map((input: Input) => {
        if (isInputCoin(input)) {
          return {
            __typename: 'InputCoin',
            owner: input.owner || null,
            amount: input.amount || null,
            assetId: input.assetId || null,
            utxoId: input.utxoId || null,
            txPointer: input.txPointer || null,
            witnessIndex: input.witnessIndex || null,
          };
        }
        if (isInputContract(input)) {
          return {
            __typename: 'InputContract',
            contractId: input.contractId || null,
            balanceRoot: input.balanceRoot || null,
            stateRoot: input.stateRoot || null,
            txPointer: input.txPointer || null,
            utxoId: input.utxoId || null,
          };
        }
        if (isInputMessage(input)) {
          return {
            __typename: 'InputMessage',
            sender: input.sender || null,
            recipient: input.recipient || null,
            amount: input.amount || null,
            nonce: input.nonce || null,
          };
        }
        return {};
      }),

      outputs: tx.outputs.map((output: Output) => {
        if (isChangeOutput(output)) {
          return {
            __typename: 'ChangeOutput',
            to: output.to || null,
            amount: output.amount || null,
            assetId: output.assetId || null,
          };
        }
        if (isContractOutput(output)) {
          return {
            __typename: 'ContractOutput',
            inputIndex: output.inputIndex || null,
            balanceRoot: output.balanceRoot || null,
            stateRoot: output.stateRoot || null,
          };
        }
        if (isVariableOutput(output)) {
          return {
            __typename: 'VariableOutput',
            to: output.to || null,
            amount: output.amount || null,
            assetId: output.assetId || null,
          };
        }
        return {};
      }),
    }));
  }
}
