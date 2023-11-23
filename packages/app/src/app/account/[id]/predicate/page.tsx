import { Suspense } from 'react';
import { AccountPredicateLoader } from '~/systems/Account/components/AccountPredicate/AccountPredicateLoader';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountsTabsSync } from '~/systems/Account/components/AccountTabs/AccountTabsSync';
import { AccountTitle } from '~/systems/Account/components/AccountTitle/AccountTitle';
import { AccountPredicateScreen } from '~/systems/Account/screens/AccountPredicate';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AccountPredicatePage({
  params: { id },
}: PageProps) {
  return (
    <>
      <Suspense fallback={<AccountTitle isLoading id={id} />}>
        <AccountTitle id={id} />
      </Suspense>
      <Suspense fallback={<AccountTabs isLoading />}>
        <AccountsTabsSync id={id} />
      </Suspense>
      <Suspense fallback={<AccountPredicateLoader />}>
        <AccountPredicateScreen id={id} />
      </Suspense>
    </>
  );
}

export const revalidate = 100;
