import { CHAIN_IDS, getAssetFuel } from '@fuel-ts/account';
import type { Asset } from '@fuel-ts/account';
import { useMemo } from 'react';

export const useFuelAsset = (asset?: Asset | null) => {
  const fuelAsset = useMemo(
    () => (asset ? getAssetFuel(asset, CHAIN_IDS.fuel.testnet) : undefined),
    [asset?.symbol, asset?.name, asset?.networks.length],
  );

  return fuelAsset;
};
