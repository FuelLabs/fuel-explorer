import Capsule, { Environment } from '@usecapsule/react-sdk';
import { capsuleConnector } from '@usecapsule/wagmi-v2-integration';
import { WALLETCONNECT_ID } from 'app-commons';
import { type CreateConnectorFn } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';
import { APP } from '~portal/systems/Chains';

const capsule = new Capsule(
  Environment.BETA,
  '9e1ce73625425f6bd64fc79ab7ea7028',
  {},
);

export function generateETHConnectors(chains: any): Array<CreateConnectorFn> {
  const connectors: Array<CreateConnectorFn> = [
    capsuleConnector({
      chains: chains,
      appName: APP.name,
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
