import { useAccount as useFuelAccount, useFuel } from '@fuels/react';
import { useEffect, useMemo, useRef } from 'react';
import {
  useAccount as useWagmiAccount,
  useConnect as useWagmiConnect,
  useDisconnect as useWagmiDisconnect,
} from 'wagmi';

/**
 * @description This hooks exists to align the bridge with the same Metamask account when using Ethereum Wallets on the Fuel's side in bridge
 */
export function useSyncEthWallets() {
  const { fuel } = useFuel();
  const {
    connector: ethConnector,
    address: wagmiAddress,
    status,
  } = useWagmiAccount();

  const { connect: ethConnect, connectors } = useWagmiConnect();
  const { disconnect } = useWagmiDisconnect();

  const { account: fuelAccount } = useFuelAccount();
  const fuelConnector = fuel.currentConnector();
  const metaMaskConnector = useMemo(
    () => connectors.find((c) => c.name === 'MetaMask'),
    [connectors],
  );
  const fuelConnectorStatus = fuelConnector?.connected;
  const previousFuelConnectorStatus =
    useRef<typeof fuelConnectorStatus>(fuelConnectorStatus);
  const isEthConnectorMetaMask = ethConnector?.name === 'MetaMask';
  const isFuelConnectorEthereumWallets =
    fuelConnector?.name === 'Ethereum Wallets';
  const wagmiConnected = status === 'connected';
  const wagmiDisconnected = status === 'disconnected';

  // Should connect to MetaMask on the same account as Fuel's
  useEffect(() => {
    const invalidWagmiWallet =
      !isEthConnectorMetaMask || wagmiDisconnected || !wagmiAddress;

    if (
      isFuelConnectorEthereumWallets &&
      previousFuelConnectorStatus.current === true &&
      invalidWagmiWallet &&
      metaMaskConnector
    ) {
      // Should default to correct account since it's already been authed via Ethereum Wallets
      ethConnect({ connector: metaMaskConnector });
    }
  }, [
    wagmiDisconnected,
    wagmiAddress,
    fuelAccount,
    metaMaskConnector,
    isFuelConnectorEthereumWallets,
    fuelConnectorStatus,
    isEthConnectorMetaMask,
  ]);

  // If ethereum wallets was disconnected, we should disconnect from MetaMask
  useEffect(() => {
    const hasDisconnected =
      fuelConnectorStatus === false &&
      previousFuelConnectorStatus.current === true;

    if (isFuelConnectorEthereumWallets && hasDisconnected && wagmiConnected) {
      disconnect();
      previousFuelConnectorStatus.current = false;
      return;
    }
    previousFuelConnectorStatus.current = fuelConnectorStatus;
  }, [isFuelConnectorEthereumWallets, fuelConnectorStatus, wagmiConnected]);
}
