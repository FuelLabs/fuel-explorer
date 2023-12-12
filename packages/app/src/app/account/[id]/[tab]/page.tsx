import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { AccountAssetsLoader } from '~/systems/Account/components/AccountAssets/AccountAssetsLoader';
import { AccountAssetsSync } from '~/systems/Account/screens/AccountAssetsSync';
import { AccountTransactionsSync } from '~/systems/Account/screens/AccountTransactionsSync';
import type { AccountRouteProps } from '~/systems/Account/types';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';

export default async function Account({
  params: { id, tab },
}: AccountRouteProps) {
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
          <AccountTransactionsSync id={id} />
        </Suspense>
      );
    default:
      redirect(`/account/${id}/assets`);
  }
}

// Revalidate every 10 seconds
export const revalidate = 10;
