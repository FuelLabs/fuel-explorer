import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { TxListSkeleton } from '~/systems/Transaction/component/TxList/TxListSkeleton';

export default function Loading() {
  return (
    <>
      <AccountTabs isLoading />
      <TxListSkeleton />
    </>
  );
}
