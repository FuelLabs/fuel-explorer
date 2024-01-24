import {
  useFuel,
  useConnect,
  useAccount,
  useDisconnect,
  useIsConnected,
  useProvider,
  useBalance,
  useWallet,
} from '@fuels-portal/sdk-react';
import { Address } from 'fuels';
import { useMemo } from 'react';
import { store } from '~/store';

import { ETH_SYMBOL, EthTxCache, ethLogoSrc } from '../../eth';
import { FUEL_UNITS, FuelTxCache } from '../utils';

export const useFuelAccountConnection = () => {
  const { fuel } = useFuel();
  const { account } = useAccount();
  const { balance } = useBalance({ address: account || '' });
  const { isConnected } = useIsConnected();
  const { connect, error, isLoading: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { provider } = useProvider();
  const { wallet } = useWallet({ address: account || '' });

  // TODO: replace here when we support multiple assets (ERC-20)
  const asset = {
    // TODO: replace with ETH_ASSET_ID from asset-list package after this task gets done
    // https://linear.app/fuel-network/issue/FRO-144/make-asset-list-package-public-and-publish-in-npm
    address:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    decimals: FUEL_UNITS,
    symbol: ETH_SYMBOL,
    image: ethLogoSrc,
  };

  const address = useMemo(
    () => (account ? Address.fromString(account) : undefined),
    [account]
  );
  const hasInstalledFuel = Boolean(fuel);

  function handleConnect() {
    if (hasInstalledFuel) {
      connect();
    } else {
      store.openFuelInstall();
    }
  }

  return {
    handlers: {
      connect: handleConnect,
      disconnect: () => {
        disconnect();
        EthTxCache.clean();
        FuelTxCache.clean();
      },
      openFuelInstall: store.openFuelInstall,
      closeDialog: store.closeOverlay,
    },
    hasInstalledFuel,
    account,
    address,
    isConnected,
    error,
    isConnecting,
    provider,
    balance,
    wallet,
    asset,
  };
};
