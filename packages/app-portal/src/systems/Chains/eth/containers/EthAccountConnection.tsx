import { AccountConnectionInput } from '~portal/systems/Accounts';
import { useAsset } from '~portal/systems/Assets';

import { ETH_CHAIN } from '../../config';
import { useEthAccountConnection } from '../hooks';

export const EthAccountConnection = ({ label }: { label?: string }) => {
  const { asset: ethAsset } = useAsset();
  const { address, ens, handlers, isConnecting, isConnected } =
    useEthAccountConnection();

  return (
    <AccountConnectionInput
      networkName={ETH_CHAIN.name}
      networkImage={ethAsset?.icon}
      label={label}
      isConnecting={isConnecting}
      account={{
        address,
        alias: ens?.name,
        avatar: ens?.avatar,
      }}
      onConnect={handlers.connect}
      onDisconnect={handlers.disconnect}
      isConnected={isConnected}
    />
  );
};
