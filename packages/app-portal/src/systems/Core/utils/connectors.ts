import Capsule, { Environment } from '@usecapsule/react-sdk';
import { capsuleConnector } from '@usecapsule/wagmi-v2-integration';
import { USE_CAPSULE_KEY, WALLETCONNECT_ID } from 'app-commons';
import { Chain } from 'viem';
import { type CreateConnectorFn } from 'wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

const capsule = new Capsule(Environment.BETA, USE_CAPSULE_KEY, {});

export function generateETHConnectors(
  appName: string,
  chains: Chain[],
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
    capsuleConnector({
      chains,
      appName: appName,
      capsule,
      options: {},
    }),
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
