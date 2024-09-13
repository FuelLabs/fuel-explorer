import { type NetworkFuel, assets } from '@fuel-ts/account';

export const ASSET_LIST = assets;

export function findAssetById(assetId?: string) {
  return (
    ASSET_LIST.find((asset) => {
      const network = asset.networks?.find(
        (val) => val.type === 'fuel',
      ) as NetworkFuel;
      const id = network ? network?.assetId : null;
      return id === assetId;
    }) ?? null
  );
}
