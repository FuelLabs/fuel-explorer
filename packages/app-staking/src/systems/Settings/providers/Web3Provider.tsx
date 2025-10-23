import { useTheme } from 'app-commons';
import { getDefaultWagmiConfig } from 'app-commons/src/chains/ethWagmi';
import { ConnectKitProvider } from 'connectkit';
import type { Mode } from 'connectkit/build/types';
import type { ReactNode } from 'react';
import { type State, WagmiProvider } from 'wagmi';

type Web3ProviderProps = {
  children: ReactNode;
  wagmiInitialState: State | undefined;
};

const STAKING_WAGMI_CONFIG = getDefaultWagmiConfig('Fuel Staking');

export function Web3Provider({
  children,
  wagmiInitialState,
}: Web3ProviderProps) {
  const { resolvedTheme } = useTheme();

  return (
    <WagmiProvider
      config={STAKING_WAGMI_CONFIG}
      initialState={wagmiInitialState}
    >
      <ConnectKitProvider mode={resolvedTheme as Mode}>
        {children}
      </ConnectKitProvider>
    </WagmiProvider>
  );
}
