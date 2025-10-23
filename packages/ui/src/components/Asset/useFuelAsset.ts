import { getAssetFuel } from 'fuels';
import type { Asset } from 'fuels';
import { useMemo } from 'react';

export const useFuelAsset = (asset?: Asset | null, chainId?: number) => {
  const fuelAsset = useMemo(
    () => (asset ? getAssetFuel(asset, chainId) : undefined),
    [asset?.symbol, asset?.name, asset?.networks.length],
  );

  return fuelAsset;
};
