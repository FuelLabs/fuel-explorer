import { AccountPredicateLoader } from '~/systems/Account/components/AccountPredicate/AccountPredicateLoader';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountTitle } from '~/systems/Account/components/AccountTitle/AccountTitle';

export default function Loading() {
  return (
    <>
      <AccountTitle id={''} />
      <AccountTabs isLoading />
      <AccountPredicateLoader />
    </>
  );
}
