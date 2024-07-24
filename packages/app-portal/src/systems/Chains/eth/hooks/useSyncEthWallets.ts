import { useFuel, useIsConnected } from '@fuels/react';
import { toast } from '@fuels/ui';
import { FuelConnectorEventTypes } from 'fuels';

import { useEffect } from 'react';
import { useConnections } from 'wagmi';

const WalletConnectName = 'Ethereum Wallets';

/**
 * @description This hooks exists to align the bridge with the same account in the alternate wallet when using Wallet Connect on Fuel's side of the bridge
 * Bridge flows that don't use Wallet Connect on Fuel's side will not be affected by this
 */
export function useSyncEthWallets() {
  const { fuel } = useFuel();

  const ethConnections = useConnections();

  const fuelConnector = fuel.currentConnector();

  const isFuelConnectorEthereumWallets =
    fuelConnector?.name === WalletConnectName;

  const { isConnected: isFuelConnected } = useIsConnected();

  // Should disconnect ETH side when Fuels' disconnects first
  useEffect(() => {
    const onConnectionChange = (connected: boolean) => {
      if (!connected) {
        disconnectAll();
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
  }, [fuelConnector, ethConnections]);

  useEffect(() => {
    if (!isFuelConnectorEthereumWallets || ethConnections.length === 1) {
      return;
    }

    // Should use the same wallet and accounts if using WalletConnect
    if (ethConnections.length > 1) {
      toast({
        title: 'Wallet Disconnected',
        variant: 'error',
        description:
          'You must use the same wallet and account on both sides of the bridge When handling funds through Wallet Connect',
      });
    }
    // When ETH Wallet is disconnected first we should disconnect the Fuel side
    if (isFuelConnected) {
      disconnectAll();
    }
  }, [isFuelConnected, isFuelConnectorEthereumWallets, ethConnections.length]);

  function disconnectAll() {
    // console.log('fsk disconnecting all');
    // fuelDisconnect();
    // ethConnectors.forEach((connector: Connector, _) => {
    //   connector.disconnect();
    // });
  }
}
