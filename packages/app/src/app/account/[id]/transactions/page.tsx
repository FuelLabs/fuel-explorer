import { Suspense } from 'react';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountsTabsSync } from '~/systems/Account/components/AccountTabs/AccountTabsSync';
import { AccountTitle } from '~/systems/Account/components/AccountTitle/AccountTitle';
import { AccountTransactionsScreen } from '~/systems/Account/screens/AccountTransactions';
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
      <Suspense fallback={<AccountTitle id={id} />}>
        <AccountTitle id={id} />
      </Suspense>
      <Suspense fallback={<AccountTabs isLoading />}>
        <AccountsTabsSync id={id} />
      </Suspense>
      <Suspense fallback={<TxListLoader />}>
        <AccountTransactionsScreen id={id} />
      </Suspense>
    </>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
