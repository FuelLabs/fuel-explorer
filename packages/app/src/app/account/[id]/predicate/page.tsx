import { Suspense } from 'react';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountsTabsSync } from '~/systems/Account/components/AccountTabs/AccountTabsSync';
import { AccountPredicate } from '~/systems/Account/screens/AccountPredicate';
import { CodeBlockSkeleton } from '~/systems/Core/components/CodeBlock/CodeBlockSkeleton';

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
      <Suspense fallback={<AccountTabs isLoading />}>
        <AccountsTabsSync id={id} />
      </Suspense>
      <Suspense fallback={<CodeBlockSkeleton />}>
        <AccountPredicate id={id} />
      </Suspense>
    </>
  );
}

export const revalidate = 100;
