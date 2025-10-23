import { useQuery } from '@tanstack/react-query';
import { relativeUrl } from 'app-commons';
import { api } from '~/systems/Core/utils/api';
import { QUERY_KEYS } from '~/systems/Core/utils/queryKeys';
import type {
  ContractMetadata,
  Project,
} from '~portal/systems/Ecosystem/types';

type UseContractMetadataData = {
  metadata: ContractMetadata | null;
  project: Project | null;
};

const queryFn = async (
  address: string | null,
): Promise<UseContractMetadataData> => {
  const data = await api.get<UseContractMetadataData>(
    relativeUrl(`/api/ecosystem/contract/${address}`),
  );
  return data;
};

export const useContractMetadata = (address: string | null = '') => {
  const queryKey = QUERY_KEYS.contractMetadata(address);

  return useQuery({
    queryKey,
    queryFn: () => {
      const url = relativeUrl(`/api/ecosystem/contract/${address}`);
      console.log('[useContractMetadata] fetch', { address, url });
      return queryFn(address);
    },
    enabled: Boolean(address && address.length > 0),
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    placeholderData: (prev) => prev,
  });
};
