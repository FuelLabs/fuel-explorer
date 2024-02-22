import { FuelProvider } from '@fuel-wallet/react';
import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  defaultConnectors,
} from '@fuel-wallet/sdk';
import type { ReactNode } from 'react';
import { IS_PREVIEW, IS_TEST } from '~/config';

import { useTheme } from '../hooks';

type ProvidersProps = {
  children: ReactNode;
};

const IS_DEV = IS_PREVIEW && !IS_TEST;

export function FuelConnectProvider({ children }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <FuelProvider
      theme={theme}
      fuelConfig={{
        devMode: IS_DEV,
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
