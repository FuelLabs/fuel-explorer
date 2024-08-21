import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Routes } from '~/routes';
import { AccountAssetsLoader } from '~/systems/Account/components/AccountAssets/AccountAssetsLoader';
import { AccountAssetsSync } from '~/systems/Account/screens/AccountAssetsSync';
import { AccountTransactionsSync } from '~/systems/Account/screens/AccountTransactionsSync';
import type { AccountRouteProps } from '~/systems/Account/types';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';
import { TxsRouteProps } from '~/systems/Transactions/types';

export default async function Account({
  params: { id, tab },
  searchParams: { cursor, dir },
}: AccountRouteProps & TxsRouteProps) {
  switch (tab) {
    case 'assets':
      return (
        <Suspense fallback={<AccountAssetsLoader />}>
          <AccountAssetsSync id={id} />
        </Suspense>
      );
    case 'transactions':
      return (
        <Suspense fallback={<TxListLoader />}>
          <AccountTransactionsSync id={id} cursor={cursor} dir={dir} />
        </Suspense>
      );
    default:
      redirect(Routes.accountAssets(id));
  }
}

// Revalidate every 10 seconds
export const revalidate = 10;
