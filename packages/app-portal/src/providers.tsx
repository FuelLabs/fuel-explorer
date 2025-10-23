import type { ReactNode } from 'react';

import type { State } from 'wagmi';
import { StoreProvider } from './store';
import { ConnectProvider, FuelConnectProvider } from './systems/Settings';

type ProvidersProps = {
  children: ReactNode;
  wagmiInitialState: State | undefined;
};

export function Providers({ children, wagmiInitialState }: ProvidersProps) {
  return (
    <StoreProvider>
      <ConnectProvider wagmiInitialState={wagmiInitialState}>
        <FuelConnectProvider>{children}</FuelConnectProvider>
      </ConnectProvider>
    </StoreProvider>
  );
}
