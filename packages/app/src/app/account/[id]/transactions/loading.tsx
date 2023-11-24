import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountTitle } from '~/systems/Account/components/AccountTitle/AccountTitle';
import { TxListLoader } from '~/systems/Transaction/component/TxList/TxListLoader';

export default function Loading() {
  return (
    <>
      <AccountTitle id={''} />
      <AccountTabs isLoading />
      <TxListLoader />
    </>
  );
}
