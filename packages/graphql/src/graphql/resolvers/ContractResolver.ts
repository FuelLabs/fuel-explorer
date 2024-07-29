import { Paginator, type PaginatorParams } from '~/core/Paginator';
import { ContractsTable } from '~/domain/Contract/ContractModel';
import type {
  GQLContract,
  GQLQueryContractArgs,
  GQLQueryContractBalanceArgs,
  GQLQueryContractBalancesArgs,
} from '~/graphql/generated/sdk-provider';
import type { GraphQLContext } from '../GraphQLContext';

type Source = GQLContract;
type Params = {
  contracts: PaginatorParams;
  contract: GQLQueryContractArgs;
  contractBalance: GQLQueryContractBalanceArgs;
  contractBalances: GQLQueryContractBalancesArgs;
};

export class ContractResolver {
  static create() {
    const resolvers = new ContractResolver();
    return {
      Query: {
        contract: resolvers.contract,
        contracts: resolvers.contracts,
        contractBalance: resolvers.contractBalance,
        contractBalances: resolvers.contractBalances,
      },
    };
  }

  async contract(
    _: Source,
    { id }: Params['contract'],
    { repositories }: GraphQLContext,
  ) {
    if (!id) {
      throw new Error('Contract ID is required');
    }

    const item = await repositories.contract.findByHash(id);
    return item?.toGQLNode();
  }

  async contracts(
    _: Source,
    params: Params['contracts'],
    { conn, repositories }: GraphQLContext,
  ) {
    const paginator = new Paginator(ContractsTable, params, conn);
    const contracts = await repositories.contract.findMany(paginator);
    return paginator.createPaginatedResult(contracts);
  }

  // TODO: need to check how to implement this using Postgres
  async contractBalance(
    _: Source,
    params: Params['contractBalance'],
    { client }: GraphQLContext,
  ) {
    const res = await client.sdk.contractBalance(params);
    return res.data.contractBalance;
  }

  // TODO: need to check how to implement this using Postgres
  async contractBalances(
    _: Source,
    params: Params['contractBalances'],
    { client }: GraphQLContext,
  ) {
    params.first = 5;
    const res = await client.sdk.contractBalances(params);
    return res.data.contractBalances;
  }
}
