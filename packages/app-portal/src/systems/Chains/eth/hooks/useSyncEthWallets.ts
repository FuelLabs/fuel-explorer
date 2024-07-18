import {
  useAccount as useFuelAccount,
  useFuel,
  useProvider,
} from '@fuels/react';
import { toBech32 } from 'fuels';
import { useEffect, useMemo } from 'react';
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
  const { connector: ethConnector, address: wagmiAddress } = useWagmiAccount();

  const { connect: ethConnect, connectors } = useWagmiConnect();
  const { disconnect } = useWagmiDisconnect();

  const { account: fuelAccount } = useFuelAccount();
  const { provider: fuelProvider } = useProvider();
  const fuelConnector = fuel.currentConnector();
  const metaMaskConnector = useMemo(
    () => connectors.find((c) => c.name === 'MetaMask'),
    [connectors],
  );
  const fuelConnectorConnected = !!fuelConnector?.connected;
  const isEthConnectorMetaMask = ethConnector?.name === 'MetaMask';
  const isFuelConnectorEthereumWallets =
    fuelConnector?.name === 'Ethereum Wallets';
  const fuelChainId = fuelProvider?.getChainId();

  // Should connect to MetaMask on the same account as Fuel's
  useEffect(() => {
    if (
      isFuelConnectorEthereumWallets &&
      fuelConnectorConnected &&
      !isEthConnectorMetaMask &&
      metaMaskConnector
    ) {
      ethConnect({ connector: metaMaskConnector });
    }
  }, [
    metaMaskConnector,
    isFuelConnectorEthereumWallets,
    fuelConnectorConnected,
    isEthConnectorMetaMask,
  ]);

  // Should connect to Fuel's account on MetaMask
  useEffect(() => {
    if (
      isFuelConnectorEthereumWallets &&
      fuelConnectorConnected &&
      isEthConnectorMetaMask &&
      fuelChainId &&
      (!wagmiAddress || fuelAccount !== toBech32(wagmiAddress as string))
    ) {
      ethConnect({
        connector: ethConnector,
        chainId: fuelChainId,
      });
    }
  }, [
    isFuelConnectorEthereumWallets,
    fuelConnectorConnected,
    isEthConnectorMetaMask,
    ethConnector,
    fuelChainId,
    fuelAccount,
    wagmiAddress,
  ]);

  // If ethereum wallets was disconnected, we should disconnect from MetaMask
  useEffect(() => {
    if (isFuelConnectorEthereumWallets && !fuelConnectorConnected) {
      disconnect();
    }
  }, [isFuelConnectorEthereumWallets, fuelConnectorConnected]);
}
