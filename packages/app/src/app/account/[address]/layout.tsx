import { Suspense } from 'react';
import { AccountLayout } from '~/systems/Account/components/AccountLayout/AccountLayout';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountsTabsSync } from '~/systems/Account/components/AccountTabs/AccountTabsSync';

export default function Layout({
  children,
  params: { address },
}: {
  children: React.ReactNode;
  params: { address: string };
}) {
  return (
    <AccountLayout id={address}>
      <Suspense fallback={<AccountTabs address={address} />}>
        <AccountsTabsSync address={address} />
      </Suspense>
      {children}
    </AccountLayout>
  );
}
