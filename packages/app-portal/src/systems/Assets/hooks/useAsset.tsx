import { useMemo } from 'react';
import { isSameEthAddress } from '~/systems/Chains/eth/utils/address';

import type { Asset } from '../services/asset';
import { getAssetEth, getAssetFuel } from '../utils';

import { useAssets } from './useAssets';

export const useAsset = (params?: {
  ethTokenId?: string;
  fuelContractId?: string;
  fuelTokenId?: string;
}) => {
  const { ethTokenId, fuelTokenId, fuelContractId } = params || {};
  const { assets } = useAssets();

  const asset = useMemo((): Asset | undefined => {
    // consider ETH as default asset
    if (!ethTokenId && !fuelTokenId) {
      return assets.find((asset) => asset.symbol === 'ETH');
    }

    const appAsset = assets.find((asset) => {
      const ethAsset = getAssetEth(asset);
      const fuelAsset = getAssetFuel(asset);

      return (
        isSameEthAddress(ethAsset?.address, ethTokenId) ||
        (fuelTokenId && fuelAsset?.assetId === fuelTokenId)
      );
    });

    return appAsset || undefined;
  }, [assets, ethTokenId, fuelTokenId, fuelContractId]);

  return {
    asset,
  };
};
