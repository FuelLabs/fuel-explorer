import { WalletConnectConnector } from '@fuels/connectors';
import { useDisconnect as useDisconnectFuel, useFuel } from '@fuels/react';
import { toast } from '@fuels/ui';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useAccount as useWagmiAccount,
  useDisconnect as useWagmiDisconnect,
} from 'wagmi';

const WalletConnectName = 'Ethereum Wallets';

/**
 * @description This hooks exists to align the bridge with the same account in the alternate wallet when using Ethereum Wallets on the Fuel's side in bridge
 */
export function useSyncEthWallets() {
  const { fuel } = useFuel();
  const {
    connector: ethConnector,
    address: wagmiAddress,
    status: wagmiStatus,
  } = useWagmiAccount();

  const { disconnect } = useWagmiDisconnect();
  const { disconnect: fuelDisconnect } = useDisconnectFuel();
  const [currentEVMAccount, setCurrentEVMAccount] = useState<string | null>(
    null,
  );

  const fuelConnector = fuel.currentConnector();
  const fuelConnectorStatus = fuelConnector?.connected;
  const previousFuelConnectorStatus =
    useRef<typeof fuelConnectorStatus>(fuelConnectorStatus);
  const isFuelConnectorEthereumWallets =
    fuelConnector?.name === WalletConnectName;
  const wagmiConnected = wagmiStatus === 'connected';
  const wagmiDisconnected = wagmiStatus === 'disconnected';
  const invalidWagmiWallet = wagmiDisconnected || !wagmiAddress;

  function disconnectBoth() {
    // So it doesn't immediately attempt reconnect
    previousFuelConnectorStatus.current = false;
    setCurrentEVMAccount(null);
    fuelDisconnect();
    disconnect();
  }

  const bridgeWalletsMatch = useMemo(() => {
    if (!fuelConnector || fuelConnector?.connected !== true || !wagmiConnected)
      return null;

    const currentEthWalletName = ethConnector?.name;
    const wagmiConfig = (fuelConnector as any).wagmiConfig;
    const connections = wagmiConfig?.connectors;
    const currentConnectorId = wagmiConfig?.state?.current;

    if (!connections?.length) {
      return null;
    }

    for (const { uid, name } of connections) {
      if (uid === currentConnectorId) {
        return name === currentEthWalletName;
      }
    }
    return false;
  }, [ethConnector?.name, fuelConnector, wagmiConnected]);

  // Fetch EVM Account address from Wallet Connect, which by default returns the predicate address
  useEffect(() => {
    if (!wagmiAddress || !isFuelConnectorEthereumWallets) {
      setCurrentEVMAccount(null);
      return;
    }

    const walletConnectConnector = fuelConnector;

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
  }, [wagmiAddress, fuelConnector, isFuelConnectorEthereumWallets]);

  // Checks if the wallets and current EVM account behind the predicate in Fuel matches the alternate wallet
  // Since we can't manually select an account or wallet, we disconnect the alternate wallet and ask the user to select the correct one
  useEffect(() => {
    if (
      !currentEVMAccount ||
      invalidWagmiWallet ||
      !isFuelConnectorEthereumWallets ||
      fuelConnectorStatus === false
    ) {
      return;
    }

    // EVM Address that originated the predicate must match the ETH Wallet address
    if (currentEVMAccount !== wagmiAddress) {
      toast({
        title: 'Wallet Disconnected',
        variant: 'error',
        description:
          'When sending funds to your Fuel Wallet through Wallet Connect, you must select the same account on both alternative wallets.',
      });
      disconnectBoth();
    }

    if (bridgeWalletsMatch === false) {
      toast({
        title: 'Wallet Disconnected',
        variant: 'error',
        description:
          'When sending funds to your Fuel Wallet through Wallet Connect, you must select the same wallet on both sides of the bridge.',
      });
      disconnectBoth();
    }
  }, [
    currentEVMAccount,
    wagmiAddress,
    fuelConnectorStatus,
    invalidWagmiWallet,
    isFuelConnectorEthereumWallets,
    bridgeWalletsMatch,
  ]);

  // When using Wallet Connect, if Fuel side disconnects, we must ensure the other side is disconnected as well
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
