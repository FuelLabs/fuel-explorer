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
      Query: {
        chain: this.chain.bind(this),
      },
    });
  }

  static create() {
    return new ChainResolver().getResolvers();
  }

  async chain(_: Source, _params: Params['chain']) {
    const res = await this.client.sdk.chain();
    return res.data.chain;
  }
}

export default ChainResolver.create();
