import {
  ALCHEMY_ID,
  INFURA_ID,
  IS_ETH_DEV_CHAIN,
  WALLETCONNECT_ID,
} from 'app-commons';
import { ConnectKitProvider } from 'connectkit';
import type { Mode } from 'connectkit/build/types';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import { type Chain, fallback } from 'viem';
import {
  http,
  type CreateConnectorFn,
  WagmiProvider,
  createConfig,
} from 'wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { ETH_CHAIN } from '~portal/systems/Chains/config';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

const app = {
  name: 'Fuel Bridge',
  description: 'Bridge assets between Fuel and Other Chains',
  url: 'https://app.fuel.network/bridge',
  icons: ['https://fuels-portal.vercel.app/fuel-logo.svg'],
};

const chainsToConnect = [ETH_CHAIN] as [Chain, ...Chain[]];

const chainName = ETH_CHAIN?.name.toLowerCase();
const transports = {
  [chainsToConnect[0].id]: IS_ETH_DEV_CHAIN
    ? http()
    : fallback(
        [
          http(`https://eth-${chainName}.g.alchemy.com/v2/${ALCHEMY_ID}`),
          http(`https://${chainName}.infura.io/v3/${INFURA_ID}`),
          http(),
        ],
        { rank: false },
      ),
};

const connectors: Array<CreateConnectorFn> = [
  injected({
    shimDisconnect: false,
    target: 'metaMask',
  }),
  coinbaseWallet({ appName: app.name, headlessMode: true }),
];
if (WALLETCONNECT_ID) {
  connectors.push(
    walletConnect({
      projectId: WALLETCONNECT_ID,
      showQrModal: false,
      metadata: app,
    }),
  );
}

export const config = createConfig({
  chains: chainsToConnect,
  connectors,
  transports,
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
