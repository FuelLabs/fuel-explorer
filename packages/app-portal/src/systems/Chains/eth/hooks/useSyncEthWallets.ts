import { useDisconnect as useDisconnectFuel, useFuel } from '@fuels/react';
import { toast } from '@fuels/ui';

import { useEffect } from 'react';
import {
  Connector,
  useAccount as useWagmiAccount,
  useConnections,
  useConnectors,
} from 'wagmi';

const WalletConnectName = 'Ethereum Wallets';

/**
 * @description This hooks exists to align the bridge with the same account in the alternate wallet when using Ethereum Wallets on the Fuel's side in bridge
 */
export function useSyncEthWallets() {
  const { fuel } = useFuel();
  const { address: wagmiAddress, status: wagmiStatus } = useWagmiAccount();
  const ethConnectors = useConnectors();
  const ethConnections = useConnections();

  const { disconnect: fuelDisconnect } = useDisconnectFuel();

  const fuelConnector = fuel.currentConnector();

  const isFuelConnectorEthereumWallets =
    fuelConnector?.name === WalletConnectName;
  const wagmiConnected = wagmiStatus === 'connected';
  const wagmiDisconnected = wagmiStatus === 'disconnected';
  const invalidWagmiWallet = wagmiDisconnected || !wagmiAddress;

  function disconnectBoth() {
    fuelDisconnect();
    ethConnectors.forEach((connector: Connector, _) => {
      connector.disconnect();
    });
  }

  useEffect(() => {
    if (
      invalidWagmiWallet ||
      !isFuelConnectorEthereumWallets ||
      !wagmiConnected ||
      !ethConnections.length
    ) {
      return;
    }

    if (ethConnections.length > 1) {
      toast({
        title: 'Wallet Disconnected',
        variant: 'error',
        description:
          'You must use the same wallet and account on both sides of the bridge When handling funds through Wallet Connect',
      });
      disconnectBoth();
    }
  }, [
    invalidWagmiWallet,
    isFuelConnectorEthereumWallets,
    wagmiConnected,
    ethConnections.length,
  ]);
}
