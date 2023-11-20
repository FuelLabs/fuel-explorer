import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { TxListLoader } from '~/systems/Transaction/component/TxList/TxListLoader';

export default function Loading() {
  return (
    <>
      <AccountTabs isLoading />
      <TxListLoader />
    </>
  );
}
