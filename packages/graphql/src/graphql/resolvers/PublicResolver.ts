import type { GQLAsset } from '~/graphql/generated/sdk-provider';
import AssetDAO from '~/infra/dao/AssetDAO';

type Source = GQLAsset;
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

  async asset(_: Source, _params: Params['asset']) {
    const assetDAO = new AssetDAO();
    return assetDAO.getByAssetId(_params.assetId);
  }
}
