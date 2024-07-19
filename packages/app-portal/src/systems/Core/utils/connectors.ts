import { WALLETCONNECT_ID } from 'app-commons';
import { type CreateConnectorFn } from 'wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { APP } from '~portal/systems/Chains';

export function generateETHConnectors(): Array<CreateConnectorFn> {
  const connectors: Array<CreateConnectorFn> = [
    injected({
      shimDisconnect: true,
      target: 'metaMask',
    }),
    coinbaseWallet({ appName: APP.name, headlessMode: true }),
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
