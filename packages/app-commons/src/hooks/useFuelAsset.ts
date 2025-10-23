import { getAssetFuel } from 'fuels';
import type { Asset } from 'fuels';
import { useMemo } from 'react';
import { FUEL_CHAIN } from '../chains';

export const useFuelAsset = (asset?: Asset | null) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const fuelAsset = useMemo(
    () => (asset ? getAssetFuel(asset, FUEL_CHAIN.id) : undefined),
    [asset?.symbol, asset?.name, asset?.networks.length],
  );
  return fuelAsset;
};
