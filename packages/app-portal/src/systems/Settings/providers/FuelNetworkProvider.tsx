import type { Provider } from 'fuels';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { FUEL_CHAIN } from '~/systems/Chains/config';
import { createProvider } from '~/systems/Chains/fuel/utils/provider';

type FuelNetworkProviderProps = {
  children?: ReactNode;
};

export type FuelReactContextType = {
  fuelProvider: Provider | undefined;
};

export const FuelReactContext = createContext<FuelReactContextType | null>(
  null
);

export const useFuelNetwork = () => {
  return useContext(FuelReactContext) as FuelReactContextType;
};

export const FuelNetworkProvider = ({ children }: FuelNetworkProviderProps) => {
  const [fuelProvider, setFuelProvider] = useState<Provider | undefined>();

  useEffect(() => {
    if (fuelProvider) return;

    async function getFuelProvider() {
      const provider = await createProvider(FUEL_CHAIN.providerUrl);
      setFuelProvider(provider);
    }

    getFuelProvider();
  }, [fuelProvider]);

  return (
    <FuelReactContext.Provider value={{ fuelProvider }}>
      {children}
    </FuelReactContext.Provider>
  );
};
