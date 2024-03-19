import { FuelProvider } from '@fuel-wallet/react';
import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
} from '@fuels/connectors';
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
          new FueletWalletConnector(),
        ],
      }}
    >
      {children}
    </FuelProvider>
  );
}
