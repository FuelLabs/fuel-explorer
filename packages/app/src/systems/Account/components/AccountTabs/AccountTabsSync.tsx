import { getPredicate } from '../../actions/get-predicate';

import { AccountTabs } from './AccountTabs';

export async function AccountsTabsSync({ id }: { id: string }) {
  const predicate = await getPredicate({ owner: id });
  return <AccountTabs accountId={id} isPredicate={!!predicate?.bytecode} />;
}
