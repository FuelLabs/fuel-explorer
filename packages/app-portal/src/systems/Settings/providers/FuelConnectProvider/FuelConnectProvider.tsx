import { FuelProvider, type NetworkConfig } from '@fuels/react';
import { type PropsWithChildren, useEffect, useState } from 'react';
import {
  FUEL_CONFIG,
  FuelNetworksContext,
  NETWORKS_ALL,
  NETWORKS_ONLY_CURRENT,
  UI_CONFIG,
} from './constants';

interface FuelConnectProviderProps extends PropsWithChildren {
  theme?: 'light' | 'dark';
}

export function FuelConnectProvider({
  children,
  theme = 'dark',
}: FuelConnectProviderProps) {
  const [networks, setNetworks] = useState<NetworkConfig[]>(NETWORKS_ALL);

  useEffect(() => {
    // Check current pathname for route-based network selection
    const pathname = window.location.pathname;
    if (pathname) {
      const shouldUseCurrentOnly = ['/bridge', '/staking'].some((route) =>
        pathname.toLowerCase().startsWith(route),
      );

      setNetworks(shouldUseCurrentOnly ? NETWORKS_ONLY_CURRENT : NETWORKS_ALL);
    }
  }, []);

  function setCurrentNetworkOnly() {
    setNetworks(NETWORKS_ONLY_CURRENT);
  }

  function setAllNetworks() {
    setNetworks(NETWORKS_ALL);
  }

  return (
    <FuelNetworksContext.Provider
      value={{ networks, setCurrentNetworkOnly, setAllNetworks }}
    >
      <FuelProvider
        theme={theme}
        fuelConfig={FUEL_CONFIG}
        uiConfig={UI_CONFIG}
        ui
        networks={NETWORKS_ONLY_CURRENT}
      >
        {children}
      </FuelProvider>
    </FuelNetworksContext.Provider>
  );
}
