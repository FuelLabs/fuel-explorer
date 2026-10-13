import { AccountConnectionInput } from '~portal/systems/Accounts';
import { useAsset } from '~portal/systems/Assets';

import { WalletConnectConnector } from '@fuels/connectors';
import { useCurrentConnector } from '@fuels/react';
import { ETH_CHAIN } from 'app-commons';
import { useTranslation } from 'react-i18next';
import { useEthAccountConnection } from '../hooks';

export const EthAccountConnection = ({ side }: { side?: 'from' | 'to' }) => {
  const { t } = useTranslation();
  const { asset: ethAsset } = useAsset();
  const { currentConnector } = useCurrentConnector();
  const { address, ens, handlers, isConnecting, isConnected } =
    useEthAccountConnection();

  const handleDisconnect = () => {
    if (side === 'from' && currentConnector instanceof WalletConnectConnector) {
      // Connector doesn't see that EVMs disconnected and will auto-reconnect if not for this.
      currentConnector.disconnect();
    }
    handlers.disconnect();
  };

  return (
    <AccountConnectionInput
      networkName={ETH_CHAIN.name}
      networkImage={ethAsset?.icon}
      label={side ? t(`portal.bridge.${side}`) : undefined}
      isConnecting={isConnecting}
      account={{
        address,
        alias: ens?.name,
        avatar: ens?.avatar,
      }}
      onConnect={handlers.connect}
      onDisconnect={handleDisconnect}
      isConnected={isConnected}
    />
  );
};
