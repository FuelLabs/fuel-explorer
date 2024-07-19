import { ConnectKitProvider } from 'connectkit';
import type { Mode } from 'connectkit/build/types';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';

import { WagmiProvider, createConfig } from 'wagmi';
import { CHAINS_TO_CONNECT, TRANSPORTS } from '~portal/systems/Chains';

import { generateETHConnectors } from '~portal/systems/Core/utils/connectors';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: CHAINS_TO_CONNECT,
  connectors: generateETHConnectors(),
  transports: TRANSPORTS,
  ssr: true,
});

type ProvidersProps = {
  children: ReactNode;
};

export function ConnectProvider({ children }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <WagmiProvider config={config}>
      <ConnectKitProvider mode={theme as Mode}>{children}</ConnectKitProvider>
    </WagmiProvider>
  );
}
