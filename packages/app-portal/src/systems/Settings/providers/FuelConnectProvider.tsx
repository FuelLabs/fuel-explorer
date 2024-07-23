import {
  BakoSafeConnector,
  BurnerWalletConnector,
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
  WalletConnectConnector,
} from '@fuels/connectors';
import { FuelProvider } from '@fuels/react';
import { WALLETCONNECT_ID } from 'app-commons';
import { useTheme } from 'next-themes';
import { type ReactNode } from 'react';

import { DEFAULT_WAGMI_CONFIG } from '~portal/systems/Chains';

type ProvidersProps = {
  children: ReactNode;
};

const fuelConfig = {
  connectors: [
    new FuelWalletConnector(),
    new BakoSafeConnector(),
    new FueletWalletConnector(),
    new WalletConnectConnector({
      projectId: WALLETCONNECT_ID,
      wagmiConfig: DEFAULT_WAGMI_CONFIG,
    }),
    new BurnerWalletConnector(),
    new FuelWalletDevelopmentConnector(),
  ],
};

export function FuelConnectProvider({ children }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <FuelProvider theme={theme} fuelConfig={fuelConfig}>
      {children}
    </FuelProvider>
  );
}
