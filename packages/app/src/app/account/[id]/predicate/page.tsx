import { Suspense } from 'react';
import { AccountPredicateLoader } from '~/systems/Account/components/AccountPredicate/AccountPredicateLoader';
import { AccountPredicateSync } from '~/systems/Account/screens/AccountPredicateSync';
import type { AccountRouteProps } from '~/systems/Account/types';

export default async function Account({ params: { id } }: AccountRouteProps) {
  return (
    <Suspense fallback={<AccountPredicateLoader />}>
      <AccountPredicateSync id={id} />
    </Suspense>
  );
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
