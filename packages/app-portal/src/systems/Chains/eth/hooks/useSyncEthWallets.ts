import { WalletConnectConnector } from '@fuels/connectors';
import {
  useAccount as useFuelAccount,
  useConnectors,
  useFuel,
} from '@fuels/react';
import { toast } from '@fuels/ui';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useAccount as useWagmiAccount,
  useConnect as useWagmiConnect,
  useDisconnect as useWagmiDisconnect,
} from 'wagmi';

const WalletConnectName = 'Ethereum Wallets';

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
  const [currentEVMAccount, setCurrentEVMAccount] = useState<string | null>(
    null,
  );

  const { connectors: fuelConnectors } = useConnectors();
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
    fuelConnector?.name === WalletConnectName;
  const wagmiConnected = status === 'connected';
  const wagmiDisconnected = status === 'disconnected';

  const metaMaskConnectionTimeout = useRef<NodeJS.Timeout>();

  function disconnectBoth() {
    // So it doesn't immediately attempt reconnect
    previousFuelConnectorStatus.current = false;
    setCurrentEVMAccount(null);
    disconnect();
  }

  // Wallet Connector returns a predicate, we need to get the actual evm account
  // in this scenario both addresses must match (Eth and Fuel)
  useEffect(() => {
    if (!wagmiAddress || !fuelConnectors.length) {
      setCurrentEVMAccount(null);
      return;
    }

    const walletConnectConnector = fuelConnectors.find(
      (c) => c.name === WalletConnectName,
    );

    if (!walletConnectConnector) {
      setCurrentEVMAccount(null);
      return;
    }

    (walletConnectConnector as WalletConnectConnector)
      .currentEvmAccount()
      .then((account) => {
        setCurrentEVMAccount(account);
      })
      .catch((err) => {
        console.log(`Failed to get current evm account: ${err}`);
      });
  }, [wagmiAddress, fuelConnectors]);

  // Should connect to MetaMask on the same account as Fuel's
  useEffect(() => {
    const invalidWagmiWallet =
      !isEthConnectorMetaMask || wagmiDisconnected || !wagmiAddress;
    clearTimeout(metaMaskConnectionTimeout.current);

    if (
      isFuelConnectorEthereumWallets &&
      invalidWagmiWallet &&
      metaMaskConnector
    ) {
      // Should default to correct account since it's already been authed via Ethereum Wallets
      // This is delayed because fuelConnectorStatus can still be true during wallet disconnection
      metaMaskConnectionTimeout.current = setTimeout(() => {
        if (previousFuelConnectorStatus.current === true) {
          ethConnect({ connector: metaMaskConnector });
        }
      }, 500);
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

  // Checks if the current EVM account behind the predicate in Fuel matches the one behind MetaMask
  // Since we can't manually select an account, we disconnect MetaMask and ask the user to select the correct one
  useEffect(() => {
    if (
      !currentEVMAccount ||
      !wagmiAddress ||
      fuelConnectorStatus === false ||
      wagmiDisconnected
    ) {
      return;
    }

    if (currentEVMAccount !== wagmiAddress) {
      toast({
        title: 'Wallet Disconnected',
        variant: 'error',
        description:
          'When sending funds to your Fuel Wallet through Wallet Connect, you must select the same account on both alternative wallets.',
      });
      disconnectBoth();
    }
  }, [currentEVMAccount, wagmiAddress, fuelConnectorStatus, wagmiDisconnected]);

  // In a scenario where Fuel side is connected to MetaMask, if one side disconnects we must ensure the other side is disconnected as well
  useEffect(() => {
    const hasDisconnected =
      fuelConnectorStatus === false &&
      previousFuelConnectorStatus.current === true;

    if (isFuelConnectorEthereumWallets && hasDisconnected && wagmiConnected) {
      disconnectBoth();
      return;
    }
    previousFuelConnectorStatus.current = fuelConnectorStatus;
  }, [isFuelConnectorEthereumWallets, fuelConnectorStatus, wagmiConnected]);
}
