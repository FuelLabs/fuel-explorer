import { Suspense } from 'react';
import { getBalances } from '~/systems/Account/actions/get-balances';
import { AccountBalances } from '~/systems/Account/screens/AccountBalances';
import { AssetsSkeleton } from '~/systems/Asset/components/AssetsSkeleton';

type AccountProps = {
  params: {
    id: string | null;
  };
};

export default async function Account({ params: { id = null } }: AccountProps) {
  const balances = await getBalances({ owner: id });
  return (
    <Suspense fallback={<AssetsSkeleton />}>
      <AccountBalances balances={balances} />
    </Suspense>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
