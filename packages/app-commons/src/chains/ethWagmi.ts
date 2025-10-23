import type { Chain } from 'viem';
import type { Config, CreateConnectorFn } from 'wagmi';
import { http, createConfig, createStorage, fallback } from 'wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { WALLETCONNECT_ID } from '../config';
import { getFallbackEndpoints } from '../utils/ethereumRPCUrl';
import { ETH_CHAIN } from './eth';

export const CHAINS_TO_CONNECT = [ETH_CHAIN] as [Chain, ...Chain[]];
const httpTransports = getFallbackEndpoints().map((url) => http(url));
export const ETH_TRANSPORTS = {
  [CHAINS_TO_CONNECT[0].id]: fallback(httpTransports),
};

export function generateETHConnectors(
  appName: string,
): Array<CreateConnectorFn> {
  const connectors: Array<CreateConnectorFn> = [
    injected({
      shimDisconnect: true,
      target: () => ({
        id: 'io.metamask',
        name: 'MetaMask',
        provider: 'isMetaMask',
        icon: 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/SVG_MetaMask_Icon_Color.svg',
      }),
    }),
    coinbaseWallet({ appName, headlessMode: true }),
  ];

  if (WALLETCONNECT_ID) {
    connectors.push(
      walletConnect({
        projectId: WALLETCONNECT_ID,
        showQrModal: false,
      }),
    );
  }
  return connectors;
}

export function getDefaultWagmiConfig(appName: string): Config {
  const wagmiConfig = createConfig({
    chains: CHAINS_TO_CONNECT,
    syncConnectedChain: false,
    connectors: generateETHConnectors(appName),
    transports: ETH_TRANSPORTS,
    storage: createStorage({
      storage: localStorage,
    }),
    ssr: false,
  });
  return wagmiConfig;
}
