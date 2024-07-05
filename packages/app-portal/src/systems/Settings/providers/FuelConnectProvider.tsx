import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
  WalletConnectConnector,
} from '@fuels/connectors';
import { FuelProvider } from '@fuels/react';
import {
  ALCHEMY_ID,
  INFURA_ID,
  IS_ETH_DEV_CHAIN,
  WALLETCONNECT_ID,
} from 'app-commons';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import { http, Chain, fallback } from 'viem';
import { CreateConnectorFn, createConfig } from 'wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { ETH_CHAIN } from '~portal/systems/Chains';

type ProvidersProps = {
  children: ReactNode;
};

const app = {
  name: 'Fuel Bridge',
  description: 'Bridge assets between Fuel and Other Chains',
  url: 'https://app.fuel.network/bridge',
  icons: ['https://fuels-portal.vercel.app/fuel-logo.svg'],
};

const connectors: Array<CreateConnectorFn> = [
  injected({
    shimDisconnect: false,
    target: 'metaMask',
  }),
  coinbaseWallet({
    appName: app.name,
    appLogoUrl: app.icons[0],
    headlessMode: true,
    reloadOnDisconnect: true,
  }),
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

const ethChainsToConnect = [ETH_CHAIN] as [Chain, ...Chain[]];
const ethChainName = ETH_CHAIN?.name.toLowerCase();
const transports = {
  [ethChainsToConnect[0].id]: IS_ETH_DEV_CHAIN
    ? http()
    : fallback(
        [
          http(`https://eth-${ethChainName}.g.alchemy.com/v2/${ALCHEMY_ID}`),
          http(`https://${ethChainName}.infura.io/v3/${INFURA_ID}`),
          http(),
        ],
        { rank: false },
      ),
};

const config = createConfig({
  chains: ethChainsToConnect,
  connectors,
  transports,
  key: 'FuelWallet',
  ssr: true,
  // client: createClient({
  //   transport: http(),
  //   key: 'FuelWallet',
  // }) as any,
} as any);
// const client = config.getClient();
// client.key = 'FuelWallet';
// console.log(
//   `asd config._internal.transports[0]`,
//   config._internal.transports[0],
// );

export function FuelConnectProvider({ children }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <FuelProvider
      theme={theme}
      fuelConfig={{
        connectors: [
          new FuelWalletConnector(),
          new FueletWalletConnector(),
          new WalletConnectConnector({
            wagmiConfig: config as any,
          }),
          new FuelWalletDevelopmentConnector(),
        ],
      }}
    >
      {children}
    </FuelProvider>
  );
}
