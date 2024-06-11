import { type Fuel, assets, resolveIconPath } from '@fuels/assets';

export const ASSET_LIST = resolveIconPath('/assets', assets);

export function findAssetById(assetId?: string) {
  return (
    ASSET_LIST.find((asset) => {
      const network = asset.networks?.find(
        (val) => val.type === 'fuel',
      ) as Fuel;
      const id = network ? network?.assetId : null;
      return id === assetId;
    }) ?? null
  );
}
