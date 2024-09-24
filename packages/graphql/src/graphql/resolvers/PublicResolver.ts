import { Provider } from 'fuels';
import { env } from '~/config';
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
    const response = await fetch(
      'https://verified-assets.fuel.network/assets.json',
    );
    const verifiedAssets = await response.json();
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
            decimals: network.decimals,
            verified: true,
          });
          return asset;
        }
      }
    }
    const asset = await assetDAO.getByAssetId(_params.assetId);
    if (!asset) return;
    return Object.assign(asset, {
      verified: false,
    });
  }
}
