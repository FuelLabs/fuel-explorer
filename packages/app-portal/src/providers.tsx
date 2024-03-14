import { FuelProvider } from '@fuels/react';
import type { ReactNode } from 'react';

import { StoreProvider } from './store';
import { ConnectProvider, FuelConnectProvider } from './systems/Settings';
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
            <FuelNetworkProvider>{children}</FuelNetworkProvider>
          </ConnectProvider>
        </FuelConnectProvider>
      </FuelProvider>
    </StoreProvider>
  );
}
