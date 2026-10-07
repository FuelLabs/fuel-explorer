import { AccountConnectionInput } from '~portal/systems/Accounts';

import { FuelLogo } from '@fuels/ui';
import { IconSwitchHorizontal } from '@fuels/ui';
import { FUEL_CHAIN } from 'app-commons';
import { useTranslation } from 'react-i18next';
import { useFuelAccountConnection } from '../hooks';

export const FuelAccountConnection = ({ side }: { side?: 'from' | 'to' }) => {
  const { t } = useTranslation();
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
      label={side ? t(`portal.bridge.${side}`) : undefined}
      disconnectLabel={
        isNonNative ? t('portal.account.change_wallet') : undefined
      }
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
