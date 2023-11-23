import { Suspense } from 'react';
import { AccountAssetsLoader } from '~/systems/Account/components/AccountAssets/AccountAssetsLoader';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountsTabsSync } from '~/systems/Account/components/AccountTabs/AccountTabsSync';
import { AccountTitle } from '~/systems/Account/components/AccountTitle/AccountTitle';
import { AccountBalances } from '~/systems/Account/screens/AccountBalances';

type AccountProps = {
  params: {
    id: string;
  };
};

export default async function Account({ params: { id } }: AccountProps) {
  return (
    <>
      <Suspense fallback={<AccountTitle isLoading id={id} />}>
        <AccountTitle id={id} />
      </Suspense>
      <Suspense fallback={<AccountTabs isLoading />}>
        <AccountsTabsSync id={id} />
      </Suspense>
      <Suspense fallback={<AccountAssetsLoader />}>
        <AccountBalances id={id} />
      </Suspense>
    </>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
