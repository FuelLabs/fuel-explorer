import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
} from '@fuels/connectors';
import { FuelProvider } from '@fuels/react';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function FuelConnectProvider({ children }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <FuelProvider
      theme={theme}
      fuelConfig={{
        devMode: true,
        connectors: [
          new FuelWalletConnector(),
          new FuelWalletDevelopmentConnector(),
        ],
      }}
    >
      {children}
    </FuelProvider>
  );
}
