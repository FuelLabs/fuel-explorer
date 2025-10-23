import { CHAIN_IDS, getAssetEth } from 'fuels';
import type { Asset } from 'fuels';
import { useMemo } from 'react';

export const useEthAsset = (asset?: Asset | null) => {
  const fuelAsset = useMemo(
    () => (asset ? getAssetEth(asset, CHAIN_IDS.eth.sepolia) : undefined),
    [asset?.symbol, asset?.name, asset?.networks.length],
  );

  return fuelAsset;
};
