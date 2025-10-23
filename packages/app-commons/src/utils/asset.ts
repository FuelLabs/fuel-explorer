import {
  type Asset,
  type NetworkEthereum,
  type NetworkFuel,
  getAssetFuel,
  assets as initialAssets,
} from 'fuels';
import { FUEL_CHAIN } from '../chains';

export function findAssetById({
  assetId,
  assets: inputAssets,
}: { assetId?: string; assets?: Asset[] }) {
  const assets = inputAssets ?? initialAssets;

  const fuelAsset = assets.find((asset) => {
    const assetFuel = getAssetFuel(asset, FUEL_CHAIN.id);
    return assetFuel?.assetId === assetId;
  });

  return fuelAsset ?? null;
}

export function getFuelETHAssetById(
  assetId: string | undefined,
  assets: Asset[],
) {
  return assets.find((asset) =>
    asset.networks.find(
      (network) =>
        (network as NetworkFuel)?.assetId?.toLowerCase() ===
          assetId?.toLowerCase() ||
        (network as NetworkEthereum)?.address?.toLowerCase() ===
          assetId?.toLowerCase(),
    ),
  );
}

export function findAssetBySymbol(symbol: string) {
  const fuelAsset = initialAssets.find((asset) => {
    const assetFuel = getAssetFuel(asset, FUEL_CHAIN.id);
    return assetFuel?.symbol === symbol;
  });

  return fuelAsset ?? null;
}
