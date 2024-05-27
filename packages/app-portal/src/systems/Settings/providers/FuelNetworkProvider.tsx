import { useNamedQuery } from '@fuels/react';
import { FUEL_CHAIN } from 'app-commons';
import { store } from '~portal/store';
import { createProvider } from '~portal/systems/Chains/fuel/utils/provider';

export const useFuelNetwork = () => {
  return useNamedQuery('fuelProvider', {
    queryKey: ['fuel', 'bridge', 'fuel', 'provider'],
    queryFn: async () => {
      const provider = await createProvider(FUEL_CHAIN.providerUrl);
      // update assets when has a new provider changes
      store.getDefaultAssets({ provider });
      return provider;
    },
    staleTime: Infinity,
  });
};
