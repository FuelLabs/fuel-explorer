import {
  useAccount,
  useConnectUI,
  useDisconnect,
  useFuel,
  useIsConnected,
  useWallet,
} from '@fuel-wallet/react';
import { Address } from 'fuels';
import { useMemo } from 'react';
import { store } from '~/store';
import type { AssetFuel } from '~/systems/Assets/utils';
import { useFuelNetwork } from '~/systems/Settings/providers/FuelNetworkProvider';

import { useBalance } from './useBalance';

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
  const { isLoading: isLoadingConnection } = useIsConnected();
  const { connect, error, isConnecting } = useConnectUI();
  const { disconnect } = useDisconnect();
  const { wallet } = useWallet(account);

  const address = useMemo(
    () => (account ? Address.fromString(account) : undefined),
    [account],
  );

  function addAsset(asset: AssetFuel) {
    const { decimals, assetId, icon, symbol, name, chainId, contractId } =
      asset;

    fuel?.addAsset({
      icon: icon ?? '',
      name,
      symbol,
      networks: [{ type: 'fuel', assetId, chainId, decimals, contractId }],
    });
  }

  return {
    handlers: {
      connect,
      disconnect,
      closeDialog: store.closeOverlay,
      addAsset,
    },
    account: account || undefined,
    address,
    isConnected: !!account,
    error,
    isLoadingConnection,
    isConnecting,
    provider: fuelProvider,
    balance,
    wallet: wallet || undefined,
  };
};
