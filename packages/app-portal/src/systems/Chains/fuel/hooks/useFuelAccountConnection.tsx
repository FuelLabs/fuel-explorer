import {
  useAccount,
  useDisconnect,
  useIsConnected,
  useWallet,
  useConnector,
  useFuel,
} from '@fuel-wallet/react';
import { Address } from 'fuels';
import { useMemo } from 'react';
import { store } from '~/store';
import type { AssetFuel } from '~/systems/Assets/utils';
import { useFuelNetwork } from '~/systems/Settings/providers/FuelNetworkProvider';

import { useBalance } from './useBalance';
import { useHasFuelWallet } from './useHasFuelWallet';

export const useFuelAccountConnection = (props?: { assetId?: string }) => {
  const { assetId } = props || {};
  const { fuelProvider } = useFuelNetwork();
  const { fuel } = useFuel();
  const { account } = useAccount();
  const { balance } = useBalance({
    address: account || '',
    assetId,
    provider: fuelProvider,
  });
  const { hasWallet } = useHasFuelWallet();
  const { isLoading: isLoadingConnection } = useIsConnected();
  const { connect, error, isConnecting } = useConnector();
  const { disconnect } = useDisconnect();
  // const { provider: fuelProvider } = useProvider();
  const { wallet } = useWallet({ address: account || '' });

  const address = useMemo(
    () => (account ? Address.fromString(account) : undefined),
    [account]
  );

  function addAsset(asset: AssetFuel) {
    const { decimals, assetId, icon, symbol, name } = asset;

    fuel?.addAsset({
      assetId,
      imageUrl: icon ?? undefined,
      symbol,
      decimals,
      name,
    });
  }

  return {
    handlers: {
      connect,
      disconnect,
      closeDialog: store.closeOverlay,
      addAsset,
    },
    account,
    address,
    isConnected: !!account,
    error,
    hasWallet,
    isLoadingConnection,
    isConnecting,
    provider: fuelProvider,
    balance,
    wallet,
  };
};
