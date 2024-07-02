import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
  WalletConnectConnector,
} from '@fuels/connectors';
import { FuelProvider } from '@fuels/react';
import { WALLETCONNECT_ID } from 'app-commons';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import { CreateConnectorFn } from 'wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

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

export function FuelConnectProvider({ children }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <FuelProvider
      theme={theme}
      fuelConfig={{
        connectors: [
          new FuelWalletConnector(),
          new FueletWalletConnector(),
          new WalletConnectConnector(),
          new FuelWalletDevelopmentConnector(),
        ],
      }}
    >
      {children}
    </FuelProvider>
  );
}
