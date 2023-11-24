import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { AccountAssetsLoader } from '~/systems/Account/components/AccountAssets/AccountAssetsLoader';
import { AccountPredicateLoader } from '~/systems/Account/components/AccountPredicate/AccountPredicateLoader';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountTitle } from '~/systems/Account/components/AccountTitle/AccountTitle';
import { AccountScreen } from '~/systems/Account/screens/Account';
import {
  isAllowedTab,
  isAssetsTab,
  isPredicateTab,
  isTransactionsTab,
} from '~/systems/Account/utils/tabs';
import { TxListLoader } from '~/systems/Transaction/component/TxList/TxListLoader';

type AccountProps = {
  params: {
    id: string;
    tab: string;
  };
};

export default function Account({ params: { id, tab } }: AccountProps) {
  if (!isAllowedTab(tab)) {
    redirect(`/account2/${id}/assets`);
  }

  return (
    <Suspense
      fallback={
        <>
          <AccountTitle id={id} />
          <AccountTabs isLoading />
          {isAssetsTab(tab) && <AccountAssetsLoader />}
          {isTransactionsTab(tab) && <TxListLoader />}
          {isPredicateTab(tab) && <AccountPredicateLoader />}
        </>
      }
    >
      <AccountScreen id={id} tab={tab} />
    </Suspense>
  );

  return 2;
}
