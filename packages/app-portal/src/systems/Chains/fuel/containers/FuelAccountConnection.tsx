import { AccountConnectionInput } from '~portal/systems/Accounts';

import { FuelLogo } from '@fuels/ui';
import { FUEL_CHAIN } from '../../config';
import { useFuelAccountConnection } from '../hooks';

export const FuelAccountConnection = ({ label }: { label?: string }) => {
  const {
    isConnecting,
    handlers,
    account: address,
  } = useFuelAccountConnection();

  return (
    <AccountConnectionInput
      networkName={FUEL_CHAIN.name}
      networkImage={<FuelLogo size={18} />}
      label={label}
      isConnecting={isConnecting}
      account={{ address }}
      onConnect={handlers.connect}
      onDisconnect={handlers.disconnect}
    />
  );
};
