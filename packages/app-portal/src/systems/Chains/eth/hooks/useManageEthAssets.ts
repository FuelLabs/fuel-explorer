import { useMemo } from 'react';
import { isAddress } from 'viem';
import { useToken } from 'wagmi';

import { useAssets } from './useAssets';

export const useManageEthAssets = ({ assetQuery }: { assetQuery: string }) => {
  const { assets, handlers } = useAssets();

  const { data, isError, isLoading } = useToken({
    address: isAddress(assetQuery) ? (assetQuery as `0x${string}`) : undefined,
  });

  const { filteredAssets, doesAssetExist } = useMemo(() => {
    const isValidAddress = isAddress(assetQuery);
    if (isValidAddress) {
      const filteredAssets = assets.filter(
        (asset) => asset.address === assetQuery
      );
      return { filteredAssets, doesAssetExist: filteredAssets.length };
    }
    const queriedAssets = assets.filter((asset) =>
      asset.symbol?.toLowerCase().startsWith(assetQuery.toLowerCase())
    );
    if (!queriedAssets.length) {
      return { filteredAssets: assets, doesAssetExist: false };
    }
    return { filteredAssets: queriedAssets, doesAssetExist: true };
  }, [assets, assetQuery]);

  return {
    assets: filteredAssets,
    handlers,
    showUseTokenButton: !isError && !!data && !doesAssetExist,
    showCustomTokenButton:
      isError &&
      !!assetQuery.length &&
      isAddress(assetQuery) &&
      !doesAssetExist,
    assetInfo: data,
    isLoading,
    doesAssetExist,
  };
};
