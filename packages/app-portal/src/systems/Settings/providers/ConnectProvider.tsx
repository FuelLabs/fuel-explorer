import { ConnectKitProvider } from 'connectkit';
import type { Mode } from 'connectkit/build/types';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';

import { WagmiProvider } from 'wagmi';
import { DEFAULT_WAGMI_CONFIG } from '~portal/systems/Chains';

declare module 'wagmi' {
  interface Register {
    config: typeof DEFAULT_WAGMI_CONFIG;
  }
}

type ProvidersProps = {
  children: ReactNode;
};

export function ConnectProvider({ children }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <WagmiProvider config={DEFAULT_WAGMI_CONFIG}>
      <ConnectKitProvider mode={theme as Mode}>{children}</ConnectKitProvider>
    </WagmiProvider>
  );
}
