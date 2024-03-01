import { ResolverAdapter } from '~/core/Resolver';
import { GQLChainInfo } from '~/graphql/generated/sdk';
import { GraphQLSDK } from '../GraphQLSDK';

type Source = GQLChainInfo;
type Params = {
  chain: null;
};

export class ChainResolver extends ResolverAdapter<Source> {
  constructor(private client = new GraphQLSDK()) {
    super();
    this.setResolvers({
      chain: this.chain.bind(this),
    });
  }

  async chain(_: Source, _params: Params['chain']) {
    // TODO: need to check with @luizstacio about the chain resolver
    const res = await this.client.sdk.chain();
    return res.data.chain;
  }
}
