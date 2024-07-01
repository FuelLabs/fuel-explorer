import type { GQLChainInfo } from '~/graphql/generated/sdk-provider';
import type { GraphQLContext } from '../GraphQLContext';

type Source = GQLChainInfo;
type Params = {
  chain: null;
};

export class ChainResolver {
  static create() {
    const resolvers = new ChainResolver();
    return {
      Query: {
        chain: resolvers.chain,
      },
    };
  }

  async chain(_: Source, _params: Params['chain'], { client }: GraphQLContext) {
    const res = await client.sdk.chain();
    return res.data.chain;
  }
}
