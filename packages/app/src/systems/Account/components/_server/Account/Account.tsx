import type { Predicate } from '@fuel-explorer/graphql';
import { Suspense } from 'react';
import { AccountBalances } from '~/systems/Account/screens/AccountBalances';
import { AccountPredicateScreen } from '~/systems/Account/screens/AccountPredicate';
import { AccountTransactionsScreen } from '~/systems/Account/screens/AccountTransactions';
import {
  isAssetsTab,
  isPredicateTab,
  isTransactionsTab,
} from '~/systems/Account/utils/tabs';
import { TxListLoader } from '~/systems/Transaction/component/TxList/TxListLoader';

import { AccountAssetsLoader } from '../../AccountAssets/AccountAssetsLoader';
import { AccountPredicateLoader } from '../../AccountPredicate/AccountPredicateLoader';
import { AccountTabs } from '../../AccountTabs/AccountTabs';
import { AccountTitle } from '../../AccountTitle/AccountTitle';

type AccountProps = {
  predicate?: Predicate;
  tab: string;
  id: string;
};

export async function Account({ predicate, tab, id }: AccountProps) {
  return (
    <>
      <AccountTitle id={id} />
      <AccountTabs accountId={id} isPredicate={!!predicate?.bytecode} />
      {isAssetsTab(tab) && (
        <Suspense fallback={<AccountAssetsLoader />}>
          <AccountBalances id={id} />
        </Suspense>
      )}
      {isTransactionsTab(tab) && (
        <Suspense fallback={<TxListLoader />}>
          <AccountTransactionsScreen id={id} />
        </Suspense>
      )}
      {isPredicateTab(tab) && (
        <Suspense fallback={<AccountPredicateLoader />}>
          <AccountPredicateScreen id={id} />
        </Suspense>
      )}
    </>
  );
}
