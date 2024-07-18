import { defaultConnectors } from '@fuels/connectors';
import { FuelProvider } from '@fuels/react';
import { WALLETCONNECT_ID } from 'app-commons';
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
        connectors: defaultConnectors({ wcProjectId: WALLETCONNECT_ID }),
      }}
    >
      {children}
    </FuelProvider>
  );
}
