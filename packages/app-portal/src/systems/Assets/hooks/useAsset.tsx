import type { Asset } from 'fuels';
import { useMemo } from 'react';
import { isSameEthAddress } from '~portal/systems/Chains/eth/utils/address';

import { getAssetEthCurrentChain, getAssetFuelCurrentChain } from '../utils';

import { useAssets } from './useAssets';

export const useAsset = (params?: {
  ethTokenId?: string;
  fuelTokenId?: string;
}) => {
  const { ethTokenId, fuelTokenId } = params || {};
  const { assets } = useAssets();

  const asset = useMemo((): Asset | undefined => {
    // consider ETH as default asset
    if (!ethTokenId && !fuelTokenId) {
      return assets.find((asset) => asset.symbol === 'ETH');
    }

    const appAsset = assets.find((asset) => {
      const ethAsset = getAssetEthCurrentChain(asset);
      const fuelAsset = getAssetFuelCurrentChain(asset);

      return (
        isSameEthAddress(ethAsset?.address, ethTokenId) ||
        (fuelTokenId && fuelAsset?.assetId === fuelTokenId)
      );
    });

    return appAsset || undefined;
  }, [assets, ethTokenId, fuelTokenId]);

  return {
    asset,
  };
};
