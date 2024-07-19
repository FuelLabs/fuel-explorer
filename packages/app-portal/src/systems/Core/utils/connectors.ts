import { WALLETCONNECT_ID } from 'app-commons';
import { type CreateConnectorFn } from 'wagmi';
import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from 'wagmi/connectors';
import { APP } from '~portal/systems/Chains';

export function generateETHConnectors(
  useInjected = true,
): Array<CreateConnectorFn> {
  const connectors: Array<CreateConnectorFn> = [
    useInjected
      ? injected({
          shimDisconnect: true,
          target: 'metaMask',
        })
      : metaMask(),
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
