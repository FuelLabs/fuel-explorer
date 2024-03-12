import { useNamedQuery } from '@fuel-wallet/react';
import { FUEL_CHAIN } from 'app-commons';
import { createProvider } from '~portal/systems/Chains/fuel/utils/provider';

export const useFuelNetwork = () => {
  return useNamedQuery('fuelProvider', {
    queryKey: ['bridge', 'fuel', 'provider'],
    queryFn: async () => {
      const provider = await createProvider(FUEL_CHAIN.providerUrl);
      return provider;
    },
    staleTime: Infinity,
  });
};
