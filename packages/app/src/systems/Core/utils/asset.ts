/* eslint-disable @typescript-eslint/no-explicit-any */
import { resolveIconPath, assets } from '@fuels/assets';

export const ASSET_LIST = resolveIconPath('/assets', assets);

export function findAssetById(assetId: string) {
  return ASSET_LIST.find((asset) => {
    const network = asset.networks?.find((val) => val.type === 'fuel');
    const id = network ? (network as any).assetId : null;
    return id === assetId;
  });
}
