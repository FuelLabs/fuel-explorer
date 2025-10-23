import { useIsConnected, useWallet } from '@fuels/react';
import { Address } from '@fuels/ui';
import { PageTitle } from 'app-commons';

type AccountTitleProps = {
  id: string;
};

export function AccountTitle({ id }: AccountTitleProps) {
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();

  const isCurrentAccountEqualConnectedAccount =
    wallet?.address.toString() === id && isConnected;

  return (
    <PageTitle
      title={isCurrentAccountEqualConnectedAccount ? 'My Account' : 'Account'}
      subtitle={<Address full={true} value={id} isAccount />}
      mb="0"
    />
  );
}
