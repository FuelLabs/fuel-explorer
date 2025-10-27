import { useQuery } from '@tanstack/react-query';
import type { Asset } from 'fuels';
import { api } from '~/systems/Core/utils/api';
import { QUERY_KEYS } from '~/systems/Core/utils/queryKeys';

const queryFn = async (): Promise<Asset[]> => {
  const data = await api.get<Asset[]>(
    'https://verified-assets.fuel.network/assets.json',
  );
  return data;
};

export function useVerifiedAssets() {
  return useQuery({
    queryKey: QUERY_KEYS.verifiedAssets,
    queryFn,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
