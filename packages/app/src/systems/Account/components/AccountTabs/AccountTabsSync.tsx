import { getPredicate } from '../../actions/get-predicate';

import { AccountTabs } from './AccountTabs';

export async function AccountsTabsSync({ address }: { address: string }) {
  const predicate = await getPredicate({ owner: address });
  return <AccountTabs address={address} isPredicate={!!predicate?.bytecode} />;
}
