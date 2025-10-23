import { useQuery } from '@tanstack/react-query';
import { FUEL_INDEXER_API } from 'app-commons';
import type { AssetFuel } from 'fuels';

export type AssetFuelData = AssetFuel & {
  icon?: string;
  isCustom?: boolean;
  indexed?: boolean;
  suspicious?: boolean;
  collection?: string;
  rate?: number;
  isNft?: boolean;
  verified?: boolean;
  metadata?: {
    name?: string;
    image?: string;
  };
};

export function useIndexedAsset(assetId?: string) {
  return useQuery<AssetFuelData>({
    queryKey: ['indexed-asset', assetId],
    queryFn: async () => {
      if (!assetId) throw new Error('No assetId provided');
      const url = `${FUEL_INDEXER_API}/assets/${assetId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch asset info');
      return res.json();
    },
    enabled: !!assetId,
    staleTime: 600_000, // 10 min
  });
}
