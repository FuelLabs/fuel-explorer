'use client';
import {
  useAccount,
  useBalance,
  useConnectUI,
  useDisconnect,
  useFuel,
  useIsConnected,
  useWallet,
} from '@fuels/react';
import { Address } from 'fuels';
import { useMemo } from 'react';
import { store } from '~portal/store';
import type { AssetFuel } from '~portal/systems/Assets/utils';
import { useFuelNetwork } from '~portal/systems/Settings/providers/FuelNetworkProvider';

export const useFuelAccountConnection = (props?: { assetId?: string }) => {
  const { assetId } = props || {};
  const { fuel } = useFuel();
  const { fuelProvider, isLoading: isLoadingProvider } = useFuelNetwork();
  const { account, isLoading: isLoadingAccount } = useAccount();
  const { balance, isLoading: isLoadingBalance } = useBalance({
    assetId,
    address: account || undefined,
  });

  const { isLoading: isLoadingConnected, isConnected } = useIsConnected();
  const { disconnect, isPending: isLoadingDisconnecting } = useDisconnect();
  const { wallet, isLoading: isLoadingWallet } = useWallet(account);

  const {
    connect,
    error,
    isConnecting,
    isLoading: isLoadingConnectUI,
  } = useConnectUI();

  const isLoadingConnection =
    isLoadingProvider ||
    isLoadingAccount ||
    isLoadingBalance ||
    isLoadingConnected ||
    isLoadingDisconnecting ||
    isLoadingWallet ||
    isLoadingConnectUI;

  const address = useMemo(
    () => (account ? Address.fromDynamicInput(account) : undefined),
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
    isConnected,
    error,
    isLoadingConnection,
    isConnecting,
    provider: fuelProvider,
    balance,
    wallet: wallet || undefined,
  };
};
