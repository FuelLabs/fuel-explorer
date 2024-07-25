import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { State } from 'wagmi';
import { StoreProvider } from './store';
import { ConnectProvider, FuelConnectProvider } from './systems/Settings';

type ProvidersProps = {
  children: ReactNode;
  wagmiInitialState?: State;
};

export function Providers({ children, wagmiInitialState }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <ConnectProvider wagmiInitialState={wagmiInitialState}>
          <FuelConnectProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </FuelConnectProvider>
        </ConnectProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}
