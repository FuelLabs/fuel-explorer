import { Address } from '@fuels/ui';
import { Suspense } from 'react';

import { PageTitle } from 'app-commons';
import { AccountTabs } from './AccountTabs/AccountTabs';
import { AccountsTabsSync } from './AccountTabs/AccountTabsSync';

export function AccountHeader({ id }: { id: string }) {
  return (
    <>
      <PageTitle
        title="Account"
        subtitle={<Address full={true} value={id} />}
      />
      <Suspense fallback={<AccountTabs address={id} />}>
        <AccountsTabsSync id={id} />
      </Suspense>
    </>
  );
}
