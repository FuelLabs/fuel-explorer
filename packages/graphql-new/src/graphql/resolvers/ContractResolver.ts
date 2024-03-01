import { Paginator, type PaginatorParams } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { ContractsTable } from '~/domain/Contract/ContractModel';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
import {
  GQLContract,
  GQLQueryContractArgs,
  GQLQueryContractBalanceArgs,
  GQLQueryContractBalancesArgs,
} from '~/graphql/generated/sdk';
import { GraphQLSDK } from '../GraphQLSDK';

type Source = GQLContract;
type Params = {
  contracts: PaginatorParams;
  contract: GQLQueryContractArgs;
  contractBalance: GQLQueryContractBalanceArgs;
  contractBalances: GQLQueryContractBalancesArgs;
};

class ContractResolver extends ResolverAdapter<Source> {
  private constructor(
    private readonly contractRepository = new ContractRepository(),
    private readonly client = new GraphQLSDK(),
  ) {
    super();
    this.setResolvers({
      contract: this.contract.bind(this),
      contracts: this.contracts.bind(this),
      contractBalance: this.contractBalance.bind(this),
      contractBalances: this.contractBalances.bind(this),
    });
  }

  static create() {
    return new ContractResolver().getResolvers();
  }

  async contract(_: Source, { id }: Params['contract']) {
    if (!id) {
      throw new Error('Contract ID is required');
    }

    const item = await this.contractRepository.findById(id);
    return item?.toGQLNode();
  }

  async contracts(_: Source, params: Params['contracts']) {
    const paginator = new Paginator(ContractsTable, params);
    const contracts = await this.contractRepository.findMany(params);
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
  async contractBalance(_: Source, params: Params['contractBalance']) {
    const res = await this.client.sdk.contractBalance(params);
    return res.data.contractBalance;
  }

  // TODO: need to check how to implement this using Postgres
  async contractBalances(_: Source, params: Params['contractBalances']) {
    const res = await this.client.sdk.contractBalances(params);
    return res.data.contractBalances;
  }
}

export default ContractResolver.create();
