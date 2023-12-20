import { Address } from '@fuels/ui';
import { IconHash } from '@tabler/icons-react';
import { Suspense } from 'react';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';

import { AccountTabs } from './AccountTabs/AccountTabs';
import { AccountsTabsSync } from './AccountTabs/AccountTabsSync';

export function AccountHeader({ id }: { id: string }) {
  return (
    <>
      <PageTitle
        icon={<IconHash size={20} stroke={1.2} />}
        className="border-b-gray-3"
      >
        Account
        <Address full={true} value={id} />
      </PageTitle>
      <Suspense fallback={<AccountTabs address={id} />}>
        <AccountsTabsSync id={id} />
      </Suspense>
    </>
  );
}
