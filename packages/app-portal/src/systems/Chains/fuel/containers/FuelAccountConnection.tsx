import { AccountConnectionInput } from '~portal/systems/Accounts';

import { FuelLogo } from '@fuels/ui';
import { IconSwitchHorizontal } from '@tabler/icons-react';
import { FUEL_CHAIN } from 'app-commons';
import { useFuelAccountConnection } from '../hooks';

export const FuelAccountConnection = ({ label }: { label?: string }) => {
  const {
    isConnecting,
    handlers,
    account: fuelAddress,
    isLoadingConnection,
    isConnected,
    isNonNative,
  } = useFuelAccountConnection();

  return (
    <AccountConnectionInput
      networkName={FUEL_CHAIN.name}
      networkImage={<FuelLogo size={18} />}
      label={label}
      disconnectLabel={isNonNative ? 'Change Wallet' : undefined}
      disconnectIcon={
        isNonNative ? <IconSwitchHorizontal size={13} /> : undefined
      }
      isConnecting={isConnecting}
      account={{ address: fuelAddress }}
      onConnect={handlers.connect}
      onDisconnect={handlers.disconnect}
      isLoading={isLoadingConnection}
      isConnected={isConnected}
    />
  );
};
