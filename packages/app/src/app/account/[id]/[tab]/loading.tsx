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
  /* as the params (id, tab) are not passed to Loading component
   * we get it froim headers passed to next */
  const headerProps = headers();
  const nextUrl = headerProps.get('next-url') || '';
  const referer = headerProps.get('referer') || '';

  /* get tab from nextUrl, if it exists.
   * it will exist when the route is accounts/[id]/[tab],
   * it will not exist when the route is accounts/[id] */
  const tab = nextUrl.split('/')[3];

  /* get id from referer because will always be there
   * for both routes */
  const id = referer.split('/')[4];

  return (
    <>
      <AccountTitle id={id} />
      <AccountTabs isLoading />
      {isAssetsTab(tab) && <AccountAssetsLoader />}
      {isTransactionsTab(tab) && <TxListLoader />}
      {isPredicateTab(tab) && <AccountPredicateLoader />}
    </>
  );
}
