import {
  FUELET_CONNECTOR,
  FUEL_WALLET_CONNECTOR,
  FUEL_WALLET_DEVELOPMENT_CONNECTOR,
  FuelConnectorProvider,
} from '@fuel-wallet/react';
import type { ReactNode } from 'react';
import { IS_PREVIEW, IS_TEST } from '~/config';

import { useTheme } from '../hooks';

type ProvidersProps = {
  children: ReactNode;
};

const connectors =
  IS_PREVIEW && !IS_TEST
    ? [FUEL_WALLET_CONNECTOR, FUEL_WALLET_DEVELOPMENT_CONNECTOR]
    : [FUEL_WALLET_CONNECTOR, FUELET_CONNECTOR];

export function FuelConnectProvider({ children }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <FuelConnectorProvider theme={theme} connectors={connectors}>
      {children}
    </FuelConnectorProvider>
  );
}
