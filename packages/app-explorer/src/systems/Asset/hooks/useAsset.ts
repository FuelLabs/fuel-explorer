import { findAssetById } from 'app-commons';
import type { Asset } from 'fuels';
import { useMemo } from 'react';
import { useVerifiedAssets } from './useVerifiedAssets';

export function useAsset(assetId?: string): Asset | null {
  const { data: verifiedAssets } = useVerifiedAssets();

  return useMemo<Asset | null>(() => {
    if (!assetId) return null;
    const found = findAssetById({ assetId, assets: verifiedAssets });
    return {
      assetId,
      name: found?.name ?? 'Unknown Asset',
      symbol: found?.symbol || '',
      icon: found?.icon || '',
      networks: found?.networks ?? [],
    };
  }, [assetId, verifiedAssets]);
}
