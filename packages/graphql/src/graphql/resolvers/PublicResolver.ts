import { logger } from '~/core/Logger';
import AssetGateway from '~/infra/gateway/AssetGateway';
import type { GraphQLContext } from '../GraphQLContext';

type Params = {
  asset: { assetId: string };
};

export class PublicResolver {
  static create() {
    const resolvers = new PublicResolver();
    return {
      Query: {
        asset: resolvers.asset,
      },
    };
  }

  async asset(_: any, _params: Params['asset'], { chain }: GraphQLContext) {
    logger.debug('GraphQL', 'PublicResolver.asset');
    const assetId = _params.assetId;
    const assetGateway = new AssetGateway();
    const chainId = chain ? Number.parseInt(chain.chainId) : undefined;
    return assetGateway.getAsset(assetId, chainId);
  }
}
