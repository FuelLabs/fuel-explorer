import { useMemo } from 'react';
import { Services, store } from '~portal/store';
import { bridgeSelectors } from '~portal/systems/Bridge/hooks';
import { isEthChain } from '~portal/systems/Chains';

import {
  useCurrentConnector,
  useAccount as useFuelAccount,
} from '@fuels/react';
import { useAccount as useEthAccount } from 'wagmi';
import { useBalances } from '~portal/systems/Assets/hooks/useBalances';

export function useFromNetworkAssetsBalances() {
  const { currentConnector } = useCurrentConnector();

  const fromNetwork = store.useSelector(
    Services.bridge,
    bridgeSelectors.fromNetwork,
  );
  const isEthereumNetwork = useMemo(
    () => isEthChain(fromNetwork),
    [fromNetwork],
  );
  const { account: fuelAccount } = useFuelAccount();
  const { address: ethAddress } = useEthAccount();
  const selectedAddress = isEthereumNetwork ? ethAddress : fuelAccount;

  const { data: balances } = useBalances({
    address: selectedAddress,
    isEth: isEthereumNetwork,
    keys: currentConnector?.name ? [currentConnector?.name] : undefined,
  });

  return {
    balances,
  };
}
