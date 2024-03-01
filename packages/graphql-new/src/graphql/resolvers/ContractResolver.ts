import { Paginator, type PaginatorParams } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { ContractsTable } from '~/domain/Contract/ContractModel';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
import { GQLContract } from '~/graphql/generated/sdk';

type Source = GQLContract;
type Params = {
  contracts: PaginatorParams;
  contract: { id: string };
};

export class ContractResolver extends ResolverAdapter<Source> {
  constructor(private readonly contractRepository = new ContractRepository()) {
    super();
    this.setResolvers({
      contract: this.contract.bind(this),
      contracts: this.contracts.bind(this),
    });
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
}
