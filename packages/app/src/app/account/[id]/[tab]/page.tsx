import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { AccountAssetsLoader } from '~/systems/Account/components/AccountAssets/AccountAssetsLoader';
import { AccountBalances } from '~/systems/Account/screens/AccountBalances';
import { AccountTransactionsScreen } from '~/systems/Account/screens/AccountTransactions';
import { TxListLoader } from '~/systems/Transaction/component/TxList/TxListLoader';

type AccountProps = {
  params: {
    id: string;
    tab: string;
  };
};

export default async function Account({ params: { id, tab } }: AccountProps) {
  switch (tab) {
    case 'assets':
      return (
        <Suspense fallback={<AccountAssetsLoader />}>
          <AccountBalances id={id} />
        </Suspense>
      );
    case 'transactions':
      return (
        <Suspense fallback={<TxListLoader />}>
          <AccountTransactionsScreen id={id} />
        </Suspense>
      );
    default:
      redirect(`/account/${id}/assets`);
  }
}

// Revalidate every 10 seconds
export const revalidate = 10;
