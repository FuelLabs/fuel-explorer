import { createConfig, defaultConnectors } from '@fuels/connectors';
import type { NetworkConfig, UIConfig } from '@fuels/react';
import {
  FUEL_CHAIN,
  FUEL_CHAINS,
  IS_DEVELOPMENT,
  IS_FUEL_MAINNET_CHAIN,
  WALLETCONNECT_ID,
} from 'app-commons';
import { type FuelConfig, Provider } from 'fuels';
import { createContext, useContext } from 'react';
import { PORTAL_WAGMI_CONFIG } from '~portal/systems/Chains/config';

export const FuelNetworksContext = createContext<{
  networks: NetworkConfig[];
  setCurrentNetworkOnly: React.Dispatch<React.SetStateAction<void>>;
  setAllNetworks: React.Dispatch<React.SetStateAction<void>>;
} | null>(null);

export function useFuelNetworksConfig() {
  const context = useContext(FuelNetworksContext);
  if (!context) {
    throw new Error(
      'useFuelNetworksConfig must be used within a FuelConnectProvider',
    );
  }
  return context;
}

export const UI_CONFIG: UIConfig = { suggestBridge: false };

export const FUEL_CONFIG: FuelConfig = createConfig(() => {
  return {
    connectors: defaultConnectors({
      wcProjectId: WALLETCONNECT_ID,
      ethWagmiConfig: PORTAL_WAGMI_CONFIG,
      ethSkipAutoReconnect: true,
      devMode: !IS_FUEL_MAINNET_CHAIN || IS_DEVELOPMENT,
      chainId: FUEL_CHAIN.id,
      fuelProvider: new Provider(FUEL_CHAIN.providerUrl),
    }),
  };
});

export const NETWORKS_ONLY_CURRENT: NetworkConfig[] = [
  { url: FUEL_CHAIN.providerUrl, chainId: FUEL_CHAIN.id },
];

export const NETWORKS_ALL: NetworkConfig[] = [
  {
    url: FUEL_CHAINS.fuelTestnet.providerUrl,
    chainId: FUEL_CHAINS.fuelTestnet.id,
  },
  {
    url: FUEL_CHAINS.fuelDevnet.providerUrl,
    chainId: FUEL_CHAINS.fuelDevnet.id,
  },
  {
    url: FUEL_CHAINS.fuelMainnet.providerUrl,
    chainId: FUEL_CHAINS.fuelMainnet.id,
  },
];
