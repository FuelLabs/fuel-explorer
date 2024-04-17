import { GraphQLSDK } from '~/graphql/GraphQLSDK';
import type { GQLChainInfo } from '~/graphql/generated/sdk';

export class ChainRepository {
  async chainInfoFromNode() {
    const { sdk } = new GraphQLSDK();
    const { data } = await sdk.chain();
    return data.chain as GQLChainInfo;
  }
}
