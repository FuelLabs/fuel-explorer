import { headers } from 'next/headers';
import { AccountAssetsLoader } from '~/systems/Account/components/AccountAssets/AccountAssetsLoader';
import { AccountPredicateLoader } from '~/systems/Account/components/AccountPredicate/AccountPredicateLoader';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountTitle } from '~/systems/Account/components/AccountTitle/AccountTitle';
import {
  isAssetsTab,
  isPredicateTab,
  isTransactionsTab,
} from '~/systems/Account/utils/tabs';
import { TxListLoader } from '~/systems/Transaction/component/TxList/TxListLoader';

export default function Loading() {
  const headerProps = headers();
  const nextUrl = headerProps.get('next-url') || '';
  const [_, __, id, tab] = nextUrl.split('/');

  return (
    <>
      <AccountTitle id={id} />
      <AccountTabs isLoading />
      <AccountAssetsLoader />
      {isAssetsTab(tab) && <AccountAssetsLoader />}
      {isTransactionsTab(tab) && <TxListLoader />}
      {isPredicateTab(tab) && <AccountPredicateLoader />}
    </>
  );
}
