import type { GQLBalanceItemFragment } from '@fuel-explorer/graphql';
import { useIsConnected, useWallet } from '@fuels/react';
import { Button, Dialog } from '@fuels/ui';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFuelNetworksConfig } from '~portal/systems/Settings/providers/FuelConnectProvider/constants';
import { SendTransactionDialogContent } from './SendTransactionDialogContent';

type SendTransactionDialogProps = {
  balances: GQLBalanceItemFragment[];
  accountAddress: string;
};

export function SendTransactionDialog({
  balances,
  accountAddress,
}: SendTransactionDialogProps) {
  const { t } = useTranslation();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();

  const { setCurrentNetworkOnly, setAllNetworks } = useFuelNetworksConfig();

  const isMyAccountPage = useMemo(() => {
    return (
      isConnected &&
      accountAddress.toLowerCase() === wallet?.address.toString().toLowerCase()
    );
  }, [accountAddress, wallet?.address, isConnected]);

  useEffect(() => {
    if (isMyAccountPage) {
      setCurrentNetworkOnly();
    } else {
      setAllNetworks();
    }
  }, [isMyAccountPage, setAllNetworks, setCurrentNetworkOnly]);

  if (!isMyAccountPage || !isConnected) {
    return null;
  }

  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>{t('account.send_transaction')}</Button>
      </Dialog.Trigger>

      <SendTransactionDialogContent balances={balances} />
    </Dialog>
  );
}
