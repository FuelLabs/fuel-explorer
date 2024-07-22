import { useDisconnect as useDisconnectFuel, useFuel } from '@fuels/react';
import { toast } from '@fuels/ui';
import { FuelConnectorEventTypes } from 'fuels';

import { useEffect } from 'react';
import {
  Connector,
  useAccount as useWagmiAccount,
  useConnections,
  useConnectors,
} from 'wagmi';

const WalletConnectName = 'Ethereum Wallets';

/**
 * @description This hooks exists to align the bridge with the same account in the alternate wallet when using Wallet Connect on Fuel's side of the bridge
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

  const activeWalletConnectBridge =
    wagmiDisconnected ||
    !wagmiAddress ||
    !isFuelConnectorEthereumWallets ||
    !wagmiConnected ||
    !ethConnections.length;

  // Should disconnect both sides when WalletConnect disconnects
  useEffect(() => {
    const onConnectionChange = (connected: boolean) => {
      if (!connected) {
        disconnectBoth();
      }
    };
    if (fuelConnector?.name === WalletConnectName) {
      fuelConnector?.on(FuelConnectorEventTypes.connection, onConnectionChange);

      return () => {
        fuelConnector?.off(
          FuelConnectorEventTypes.connection,
          onConnectionChange,
        );
      };
    }
  }, [fuelConnector]);

  // Should use the same wallet and accounts if using WalletConnect
  useEffect(() => {
    if (activeWalletConnectBridge) {
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
  }, [activeWalletConnectBridge, ethConnections.length]);

  function disconnectBoth() {
    fuelDisconnect();
    ethConnectors.forEach((connector: Connector, _) => {
      connector.disconnect();
    });
  }
}
