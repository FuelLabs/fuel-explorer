import { ConnectKitProvider } from 'connectkit';
import type { Mode } from 'connectkit/build/types';
import { type ReactNode, useEffect, useState } from 'react';
import type { State } from 'wagmi';

import { useTheme } from 'app-commons';
import { WagmiProvider } from 'wagmi';
import { PORTAL_WAGMI_CONFIG } from '~portal/systems/Chains/config';

type ProvidersProps = {
  children: ReactNode;
  wagmiInitialState?: State;
  mode?: Mode;
};

export function ConnectProvider({
  children,
  wagmiInitialState,
  mode,
}: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider
      config={PORTAL_WAGMI_CONFIG}
      initialState={wagmiInitialState}
    >
      {mounted && (
        <ConnectKitProvider mode={mode ?? (resolvedTheme as Mode)}>
          {children}
        </ConnectKitProvider>
      )}
    </WagmiProvider>
  );
}
