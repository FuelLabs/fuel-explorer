import { useAccount as useFuelAccount, useNamedQuery } from '@fuels/react';
import { FUEL_CHAIN } from 'app-commons';
import type { Provider } from 'fuels';
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { Services, store } from '~portal/store';
import { isFuelChain } from '~portal/systems/Chains';
import { createProvider } from '~portal/systems/Chains/fuel/utils/provider';

export const useFuelNetwork = () => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const { account: fuelAccount } = useFuelAccount();
  const { address: ethAccount } = useAccount();
  const fromNetwork = store.useSelector(
    Services.bridge,
    (state) => state.context.fromNetwork,
  );
  const selectedAccount = useMemo(() => {
    if (isFuelChain(fromNetwork)) {
      return fuelAccount;
    }
    return ethAccount;
  }, [fromNetwork, ethAccount, fuelAccount]);

  useEffect(() => {
    createProvider(FUEL_CHAIN.providerUrl).then((p) => {
      setProvider(p);
    });
  }, []);

  return useNamedQuery('fuelProvider', {
    queryKey: ['fuel', 'bridge', 'fuel', 'provider', selectedAccount],
    queryFn: async () => {
      if (!provider) {
        throw new Error('Provider not found');
      }
      // update assets when has a new provider changes
      store.getDefaultAssets({ provider, address: selectedAccount });
      return provider;
    },
    placeholderData: undefined,
    enabled: !!provider,
  });
};
