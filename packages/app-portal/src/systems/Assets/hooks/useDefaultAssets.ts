import { useNamedQuery, useProvider } from '@fuels/react';
import { keepPreviousData } from '@tanstack/react-query';
import { useBridgeTokenContract } from '~portal/systems/Assets/hooks/useBridgeTokenContract';
import { AssetService } from '~portal/systems/Assets/services';

export function useDefaultAssets() {
  const { provider } = useProvider();
  const { tokenContract } = useBridgeTokenContract();

  return useNamedQuery('defaultAssets', {
    queryKey: ['default-assets'],
    queryFn: async () => {
      return await AssetService.getDefaultAssets({
        provider: provider as NonNullable<typeof provider>,
        bridgeTokenContracts: tokenContract,
      });
    },
    placeholderData: keepPreviousData,
    gcTime: Number.POSITIVE_INFINITY,
    enabled: !!provider && !!tokenContract,
  });
}
