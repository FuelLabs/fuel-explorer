import { ConnectKitProvider } from 'connectkit';
import type { Mode } from 'connectkit/build/types';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';

import { type State, WagmiProvider } from 'wagmi';
import { DEFAULT_WAGMI_CONFIG } from '~portal/systems/Chains';

declare module 'wagmi' {
  interface Register {
    config: typeof DEFAULT_WAGMI_CONFIG;
  }
}

type ProvidersProps = {
  children: ReactNode;
  wagmiInitialState?: State;
};

export function ConnectProvider({
  children,
  wagmiInitialState,
}: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <WagmiProvider
      config={DEFAULT_WAGMI_CONFIG}
      initialState={wagmiInitialState}
    >
      <ConnectKitProvider mode={theme as Mode}>{children}</ConnectKitProvider>
    </WagmiProvider>
  );
}
