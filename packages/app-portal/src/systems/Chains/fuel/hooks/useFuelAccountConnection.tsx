import {
  useAccount,
  useAssets,
  useBalance,
  useConnectUI,
  useCurrentConnector,
  useDisconnect,
  useFuel,
  useWallet,
} from '@fuels/react';
import { findAssetById } from 'app-commons';
import { Address, type Asset } from 'fuels';
import { useMemo } from 'react';
import { store } from '~portal/store';
import { useIsNonNativeConnector } from '~portal/systems/Bridge/hooks/useIsNonNativeConnector';
import { useFuelNetwork } from '~portal/systems/Settings/providers/FuelNetworkProvider';

export const useFuelAccountConnection = (props?: { assetId?: string }) => {
  const { assetId } = props || {};
  const { fuel } = useFuel();
  const { fuelProvider, isLoading: isLoadingProvider } = useFuelNetwork();
  const { account, isLoading: isLoadingAccount } = useAccount();
  const { balance, isLoading: isLoadingBalance } = useBalance({
    assetId,
    address: account || undefined,
    query: {
      refetchInterval: 3000,
      meta: {
        persist: false,
      },
    },
  });

  const { disconnect, isPending: isLoadingDisconnecting } = useDisconnect();
  const { wallet, isLoading: isLoadingWallet } = useWallet({ account });
  const { currentConnector } = useCurrentConnector();
  const { assets, refetch } = useAssets();

  const { isNonNative } = useIsNonNativeConnector();

  const {
    connect,
    error,
    isConnecting,
    isConnected,
    isLoading: isLoadingConnectUI,
  } = useConnectUI();

  const isLoadingConnection =
    isLoadingProvider ||
    isLoadingAccount ||
    isLoadingBalance ||
    isLoadingDisconnecting ||
    isLoadingWallet ||
    isLoadingConnectUI;

  const address = useMemo(
    () => (account ? Address.fromDynamicInput(account) : undefined),
    [account],
  );

  async function addAsset(asset: Asset) {
    if (!asset || currentConnector?.external) {
      return;
    }
    const hasAdded = await fuel?.addAsset(asset);
    if (hasAdded) {
      refetch();
    }
  }

  function hasAsset(assetId: string) {
    return findAssetById({ assetId, assets });
  }

  function handleDisconnect() {
    if (isNonNative) {
      connect();
      return;
    }

    disconnect();
  }

  return {
    handlers: {
      connect,
      disconnect: handleDisconnect,
      closeDialog: store.closeOverlay,
      addAsset,
    },
    account: account || undefined,
    address,
    isConnected,
    isNonNative,
    error,
    isLoadingConnection,
    isConnecting,
    provider: fuelProvider,
    balance,
    wallet: wallet || undefined,
    hasAsset,
    external: currentConnector?.external,
  };
};
