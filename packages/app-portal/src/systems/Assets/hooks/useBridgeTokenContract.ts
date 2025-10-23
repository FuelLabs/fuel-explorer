import { useNamedQuery } from '@fuels/react';
import { keepPreviousData } from '@tanstack/react-query';
import { getBridgeTokenContracts } from 'app-commons';

export function useBridgeTokenContract() {
  return useNamedQuery('tokenContract', {
    queryKey: ['bridge-token-contract'],
    queryFn: async () => {
      return await getBridgeTokenContracts();
    },
    gcTime: Number.POSITIVE_INFINITY,
    placeholderData: keepPreviousData,
  });
}
