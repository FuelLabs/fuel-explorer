import { FuelProvider } from '@fuel-wallet/react';
import type { ReactNode } from 'react';

import { StoreProvider } from './store';
import {
  ConnectProvider,
  FuelUiProvider,
  FuelConnectProvider,
} from './systems/Settings';
import { FuelNetworkProvider } from './systems/Settings/providers/FuelNetworkProvider';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <FuelProvider>
        <FuelConnectProvider>
          <ConnectProvider>
            <FuelUiProvider>
              <FuelNetworkProvider>{children}</FuelNetworkProvider>
            </FuelUiProvider>
          </ConnectProvider>
        </FuelConnectProvider>
      </FuelProvider>
    </StoreProvider>
  );
}
