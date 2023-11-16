import { Suspense } from 'react';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountsTabsSync } from '~/systems/Account/components/AccountTabs/AccountTabsSync';
import { AccountBalances } from '~/systems/Account/screens/AccountBalances';
import { AssetsSkeleton } from '~/systems/Asset/components/AssetsSkeleton';

type AccountProps = {
  params: {
    id: string;
  };
};

export default async function Account({ params: { id } }: AccountProps) {
  return (
    <>
      <Suspense fallback={<AccountTabs isLoading />}>
        <AccountsTabsSync id={id} />
      </Suspense>
      <Suspense fallback={<AssetsSkeleton />}>
        <AccountBalances id={id} />
      </Suspense>
    </>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
