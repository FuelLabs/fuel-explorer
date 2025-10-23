import type { GQLPredicateItem, Maybe } from '@fuel-explorer/graphql';

import { AccountTabs } from './AccountTabs';

type AccountTabsSyncProps = {
  id: string;
  predicate: Maybe<GQLPredicateItem> | undefined;
};

export function AccountsTabsSync({ id, predicate }: AccountTabsSyncProps) {
  return <AccountTabs address={id} isPredicate={!!predicate?.bytecode} />;
}
