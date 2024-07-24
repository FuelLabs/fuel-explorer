import { defaultConnectors } from '@fuels/connectors';
import { FuelProvider } from '@fuels/react';
import { WALLETCONNECT_ID } from 'app-commons';
import { useTheme } from 'next-themes';
import { type ReactNode } from 'react';

import { DEFAULT_WAGMI_CONFIG } from '~portal/systems/Chains';

type ProvidersProps = {
  children: ReactNode;
};

const fuelConfig = {
  connectors: defaultConnectors({
    wcProjectId: WALLETCONNECT_ID,
    ethWagmiConfig: DEFAULT_WAGMI_CONFIG,
  }),
};

export function FuelConnectProvider({ children }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <FuelProvider theme={theme} fuelConfig={fuelConfig}>
      {children}
    </FuelProvider>
  );
}
