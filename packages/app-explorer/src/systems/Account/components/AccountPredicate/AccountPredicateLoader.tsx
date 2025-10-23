import type { GQLPredicateItem } from '@fuel-explorer/graphql';
import { AccountPredicate } from './AccountPredicate';

export function AccountPredicateLoader() {
  return (
    <AccountPredicate isLoading predicate={{} as GQLPredicateItem} id="0x" />
  );
}
