import { Suspense } from 'react';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountsTabsSync } from '~/systems/Account/components/AccountTabs/AccountTabsSync';
import { AccountTransactions } from '~/systems/Account/screens/AccountTransactions';
import { TxListLoader } from '~/systems/Transaction/component/TxList/TxListLoader';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AccountTransactionsPage({
  params: { id },
}: PageProps) {
  return (
    <>
      <Suspense fallback={<AccountTabs isLoading />}>
        <AccountsTabsSync id={id} />
      </Suspense>
      <Suspense fallback={<TxListLoader />}>
        <AccountTransactions id={id} />
      </Suspense>
    </>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
