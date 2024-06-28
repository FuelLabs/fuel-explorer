import { Paginator, type PaginatorParams } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { ContractsTable } from '~/domain/Contract/ContractModel';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
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

export class ContractResolver extends ResolverAdapter<Source> {
  private constructor() {
    super();
    this.setResolvers({
      Query: {
        contract: this.contract.bind(this),
        contracts: this.contracts.bind(this),
        contractBalance: this.contractBalance.bind(this),
        contractBalances: this.contractBalances.bind(this),
      },
    });
  }

  static create() {
    return new ContractResolver().getResolvers();
  }

  async contract(
    _: Source,
    { id }: Params['contract'],
    { conn }: GraphQLContext,
  ) {
    if (!id) {
      throw new Error('Contract ID is required');
    }

    const contractRepository = new ContractRepository(conn);
    const item = await contractRepository.findByHash(id);
    return item?.toGQLNode();
  }

  async contracts(
    _: Source,
    params: Params['contracts'],
    { conn }: GraphQLContext,
  ) {
    const paginator = new Paginator(ContractsTable, params, conn);
    const contractRepository = new ContractRepository(conn);
    const contracts = await contractRepository.findMany(paginator);
    const startCursor = paginator.getStartCursor(contracts);
    const endCursor = paginator.getEndCursor(contracts);
    return paginator.createPaginatedResult(
      contracts,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
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
    const res = await client.sdk.contractBalances(params);
    return res.data.contractBalances;
  }
}
