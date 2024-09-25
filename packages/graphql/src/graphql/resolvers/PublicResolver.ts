import { Provider } from 'fuels';
import { env } from '~/config';
import VerifiedAssets from '~/infra/cache/VerifiedAssets';
import AssetDAO from '~/infra/dao/AssetDAO';

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

  async asset(_: any, _params: Params['asset']) {
    const assetDAO = new AssetDAO();
    const provider = await Provider.create(env.get('FUEL_PROVIDER'));
    const chainId = provider.getChainId();
    const nonVerifiedAsset = await assetDAO.getByAssetId(_params.assetId);
    const verifiedAssets = await VerifiedAssets.getInstance().fetch();
    for (const verifiedAsset of verifiedAssets) {
      for (const network of verifiedAsset.networks) {
        if (network.type === 'fuel') {
          network.__typename = 'AssetNetworkFuel';
        }
        if (network.type === 'ethereum') {
          network.__typename = 'AssetNetworkEthereum';
        }
      }
    }
    for (const verifiedAsset of verifiedAssets) {
      for (const network of verifiedAsset.networks) {
        if (
          network.chainId === chainId &&
          network.assetId === _params.assetId
        ) {
          const asset = Object.assign(verifiedAsset, {
            assetId: _params.assetId,
            contractId: network.contractId,
            subId: nonVerifiedAsset?.subId,
            decimals: network.decimals,
            verified: true,
          });
          return asset;
        }
      }
    }
    if (!nonVerifiedAsset) return;
    return Object.assign(nonVerifiedAsset, {
      verified: false,
    });
  }
}
