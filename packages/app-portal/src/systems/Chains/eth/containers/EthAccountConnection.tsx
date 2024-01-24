import { AccountConnectionInput } from '~/systems/Accounts';

import { ETH_CHAIN } from '../../config';
import { useEthAccountConnection } from '../hooks';
import { ethLogoSrc } from '../utils';

export const EthAccountConnection = ({ label }: { label?: string }) => {
  const { address, ens, handlers, isConnecting } = useEthAccountConnection();

  return (
    <AccountConnectionInput
      networkName={ETH_CHAIN.name}
      networkImage={ethLogoSrc}
      label={label}
      isConnecting={isConnecting}
      account={{
        address,
        alias: ens?.name,
        avatar: ens?.avatar,
      }}
      onConnect={handlers.connect}
      onDisconnect={handlers.disconnect}
    />
  );
};
