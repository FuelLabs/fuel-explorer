import { ResolverAdapter } from '~/core/Resolver';
import type { GQLChainInfo } from '~/graphql/generated/sdk-provider';
import type { GraphQLContext } from '../GraphQLContext';

type Source = GQLChainInfo;
type Params = {
  chain: null;
};

class ChainResolver extends ResolverAdapter<Source> {
  private constructor() {
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

  async chain(_: Source, _params: Params['chain'], { client }: GraphQLContext) {
    const res = await client.sdk.chain();
    return res.data.chain;
  }
}

export default ChainResolver.create();
