import { useMemo } from 'react';
import { findAssetById } from '~/systems/Core/utils/asset';

export function useAsset(assetId?: string) {
  return useMemo(() => {
    if (!assetId) return null;
    const found = findAssetById(assetId);
    return {
      assetId,
      name: found?.name ?? 'Unknown Asset',
      symbol: found?.symbol ?? null,
      icon: found?.icon ?? null,
    };
  }, [assetId]);
}
