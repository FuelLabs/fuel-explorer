import { Suspense } from 'react';
import { AccountLayout } from '~/systems/Account/components/AccountLayout/AccountLayout';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountsTabsSync } from '~/systems/Account/components/AccountTabs/AccountTabsSync';

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <AccountLayout id={id}>
      <Suspense fallback={<AccountTabs address={id} />}>
        <AccountsTabsSync id={id} />
      </Suspense>
      {children}
    </AccountLayout>
  );
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
