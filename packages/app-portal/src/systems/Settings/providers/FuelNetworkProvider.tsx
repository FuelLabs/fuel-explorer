import { FUEL_CHAIN } from 'app-commons';
import type { Provider } from 'fuels';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useQuery } from 'wagmi';
import { createProvider } from '~portal/systems/Chains/fuel/utils/provider';

type FuelNetworkProviderProps = {
  children?: ReactNode;
};

export type FuelReactContextType = {
  fuelProvider: Provider | undefined;
  isLoading: boolean;
};

export const FuelReactContext = createContext<FuelReactContextType | null>(
  null,
);

export const useFuelNetwork = () => {
  return useContext(FuelReactContext) as FuelReactContextType;
};

export const FuelNetworkProvider = ({ children }: FuelNetworkProviderProps) => {
  const { data, isLoading } = useQuery(['fuel-provider'], () =>
    createProvider(FUEL_CHAIN.providerUrl),
  );

  return (
    <FuelReactContext.Provider value={{ fuelProvider: data, isLoading }}>
      {children}
    </FuelReactContext.Provider>
  );
};
