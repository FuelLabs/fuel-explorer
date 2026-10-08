import { useIsConnected, useWallet } from '@fuels/react';
import { Address } from '@fuels/ui';
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
    <div className="flex min-w-0 flex-col gap-2">
      <h1 className="m-0 font-medium text-heading text-[32px] leading-[36px] tracking-[-1.28px]">
        {isCurrentAccountEqualConnectedAccount
          ? t('account.my_account')
          : t('account.title')}
      </h1>
      <Address full={true} value={id} isAccount />
    </div>
  );
}
