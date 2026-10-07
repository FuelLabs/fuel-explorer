import { useIsConnected, useWallet } from '@fuels/react';
import { Address } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { useTranslation } from 'react-i18next';

type AccountTitleProps = {
  id: string;
};

export function AccountTitle({ id }: AccountTitleProps) {
  const { t } = useTranslation();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();

  const isCurrentAccountEqualConnectedAccount =
    wallet?.address.toString() === id && isConnected;

  return (
    <PageTitle
      title={
        isCurrentAccountEqualConnectedAccount
          ? t('account.my_account')
          : t('account.title')
      }
      subtitle={<Address full={true} value={id} isAccount />}
      mb="0"
    />
  );
}
