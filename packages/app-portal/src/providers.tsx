import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';

import { StoreProvider } from './store';
import { ConnectProvider, FuelConnectProvider } from './systems/Settings';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <FuelConnectProvider>
        <ConnectProvider>{children}</ConnectProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </FuelConnectProvider>
    </StoreProvider>
  );
}
