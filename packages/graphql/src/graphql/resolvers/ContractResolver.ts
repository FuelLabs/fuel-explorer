import type {
  GQLContract,
  GQLQueryContractArgs,
  GQLQueryContractBalanceArgs,
  GQLQueryContractBalancesArgs,
} from '~/graphql/generated/sdk-provider';
import ContractDAO from '~/infra/dao/ContractDAO';
import PaginatedParams from '~/infra/paginator/PaginatedParams';
import type { GraphQLContext } from '../GraphQLContext';

type Source = GQLContract;
type Params = {
  contracts: any;
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

  async contract(_: Source, { id }: Params['contract']) {
    if (!id) {
      throw new Error('Contract ID is required');
    }
    const contractDAO = new ContractDAO();
    const contract = await contractDAO.getByHash(id);
    return contract?.toGQLNode();
  }

  async contracts(_: Source, params: Params['contracts']) {
    const contractDAO = new ContractDAO();
    const contracts = await contractDAO.getPaginatedContracts(
      new PaginatedParams(params),
    );
    return contracts;
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
