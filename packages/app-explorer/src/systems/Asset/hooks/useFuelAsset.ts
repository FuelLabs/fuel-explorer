import { CHAIN_IDS, getAssetFuel } from '@fuels/assets';
import type { Asset } from '@fuels/assets';
import { useMemo } from 'react';

export const useFuelAsset = (asset?: Asset | null) => {
  const fuelAsset = useMemo(
    () => (asset ? getAssetFuel(asset, CHAIN_IDS.fuel.beta4) : undefined),
    [asset?.symbol, asset?.name, asset?.networks.length],
  );

  return fuelAsset;
};
