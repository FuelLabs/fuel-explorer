import { AccountConnectionInput } from '~portal/systems/Accounts';

import { FuelLogo } from '@fuels/ui';
import { FUEL_CHAIN } from 'app-commons';
import { Address } from 'fuels';
import { useMemo } from 'react';
import { useFuelAccountConnection } from '../hooks';

export const FuelAccountConnection = ({ label }: { label?: string }) => {
  const {
    isConnecting,
    handlers,
    account: address,
    isLoadingConnection,
    isConnected,
  } = useFuelAccountConnection();

  const fuelAddress = useMemo(() => {
    if (!address) return address;
    return Address.fromDynamicInput(address).toB256();
  }, [address]);
  return (
    <AccountConnectionInput
      networkName={FUEL_CHAIN.name}
      networkImage={<FuelLogo size={18} />}
      label={label}
      isConnecting={isConnecting}
      account={{ address: fuelAddress }}
      onConnect={handlers.connect}
      onDisconnect={handlers.disconnect}
      isLoading={isLoadingConnection}
      isConnected={isConnected}
    />
  );
};
