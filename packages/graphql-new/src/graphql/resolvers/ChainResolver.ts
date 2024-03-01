import { ResolverAdapter } from '~/core/Resolver';
import { GQLChainInfo } from '~/graphql/generated/sdk';
import { GraphQLSDK } from '../GraphQLSDK';

type Source = GQLChainInfo;
type Params = {
  chain: null;
};

class ChainResolver extends ResolverAdapter<Source> {
  private constructor(private client = new GraphQLSDK()) {
    super();
    this.setResolvers({
      chain: this.chain.bind(this),
    });
  }

  static create() {
    return new ChainResolver().getResolvers();
  }

  async chain(_: Source, _params: Params['chain']) {
    // TODO: need to check with @luizstacio about the chain resolver
    const res = await this.client.sdk.chain();
    return res.data.chain;
  }
}

export default ChainResolver.create();
