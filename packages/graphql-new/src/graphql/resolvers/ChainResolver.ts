import { ResolverAdapter } from '~/core/Resolver';
import { ChainRepository } from '~/domain/Chain/ChainRepository';
import { GQLChainInfo } from '~/graphql/generated/sdk';

type Source = GQLChainInfo;
type Params = {
  chains: null;
};

export class ChainResolver extends ResolverAdapter<Source> {
  constructor(private readonly chainRepository = new ChainRepository()) {
    super();
    this.setResolvers({
      chain: this.chain.bind(this),
    });
  }

  async chain(_source: Source, _params: Params) {
    const chain = await this.chainRepository.findLatestAdded();
    return chain.toGQLNode();
  }
}
