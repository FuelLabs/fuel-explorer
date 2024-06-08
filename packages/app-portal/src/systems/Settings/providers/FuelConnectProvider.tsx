import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
} from '@fuels/connectors';
import { WalletConnectConnector } from '@fuels/connectors/walletconnect';
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
        connectors: [
          new FuelWalletConnector(),
          new FuelWalletDevelopmentConnector(),
          new FueletWalletConnector(),
          new WalletConnectConnector(),
        ],
      }}
    >
      {children}
    </FuelProvider>
  );
}
