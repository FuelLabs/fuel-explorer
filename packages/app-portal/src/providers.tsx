import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from './store';
import { ConnectProvider, FuelConnectProvider } from './systems/Settings';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <ConnectProvider>
          <FuelConnectProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </FuelConnectProvider>
        </ConnectProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}
