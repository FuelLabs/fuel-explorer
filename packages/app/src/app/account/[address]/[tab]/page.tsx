import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { AccountBalances } from '~/systems/Account/screens/AccountBalances';
import { AccountPredicate } from '~/systems/Account/screens/AccountPredicate';
import { AccountTransactions } from '~/systems/Account/screens/AccountTransactions';
import { AssetsSkeleton } from '~/systems/Asset/components/AssetsSkeleton';
import { CodeBlockSkeleton } from '~/systems/Core/components/CodeBlock/CodeBlockSkeleton';
import { TxListLoader } from '~/systems/Transaction/component/TxList/TxListLoader';

type AccountProps = {
  params: {
    address: string;
    tab: string;
  };
};

export default async function Account({
  params: { address, tab },
}: AccountProps) {
  switch (tab) {
    case 'assets':
      return (
        <Suspense fallback={<AssetsSkeleton />}>
          <AccountBalances id={address} />
        </Suspense>
      );
    case 'transactions':
      return (
        <Suspense fallback={<TxListLoader />}>
          <AccountTransactions id={address} />
        </Suspense>
      );
    case 'predicate':
      return (
        <Suspense fallback={<CodeBlockSkeleton />}>
          <AccountPredicate id={address} />
        </Suspense>
      );
    default:
      redirect(`/account/${address}/assets`);
  }
}

// Revalidate cache every 10 seconds
export const revalidate = Infinity;
