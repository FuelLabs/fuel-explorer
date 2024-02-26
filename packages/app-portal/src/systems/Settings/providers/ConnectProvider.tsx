import { ALCHEMY_ID, INFURA_ID, WALLETCONNECT_ID } from 'app-commons';
import { ConnectKitProvider } from 'connectkit';
import { Mode } from 'connectkit/build/types';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import type { ChainProviderFn } from 'wagmi';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { ETH_CHAIN } from '~portal/systems/Chains/config';

const app = {
  name: 'Fuel Bridge',
  description: 'Bridge assets between Fuel and Other Chains',
  url: 'https://fuels-portal.vercel.app',
  icons: ['https://fuels-portal.vercel.app/fuel-logo.svg'],
};

const chainsToConnect = [ETH_CHAIN];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const providers: ChainProviderFn<any>[] = [
  alchemyProvider({ apiKey: ALCHEMY_ID as string }),
  infuraProvider({ apiKey: INFURA_ID as string }),
  jsonRpcProvider({
    rpc: (c) => {
      return { http: c.rpcUrls.default.http[0] };
    },
  }),
  publicProvider(),
];
export const { publicClient, chains, webSocketPublicClient } = configureChains(
  chainsToConnect,
  providers,
);
const connectKitClient = {
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: app.name,
        headlessMode: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        showQrModal: false,
        projectId: WALLETCONNECT_ID as string,
        metadata: app,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        shimDisconnect: true,
        name: (detectedName) =>
          `Injected (${
            typeof detectedName === 'string'
              ? detectedName
              : detectedName.join(', ')
          })`,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
};

const config = createConfig(connectKitClient);

type ProvidersProps = {
  children: ReactNode;
};

export function ConnectProvider({ children }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider mode={theme as Mode}>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
