import { Suspense } from 'react';
import { AccountPredicateLoader } from '~/systems/Account/components/AccountPredicate/AccountPredicateLoader';
import { AccountPredicateScreen } from '~/systems/Account/screens/AccountPredicate';

type AccountProps = {
  params: {
    id: string;
  };
};

export default async function Account({ params: { id } }: AccountProps) {
  return (
    <Suspense fallback={<AccountPredicateLoader />}>
      <AccountPredicateScreen id={id} />
    </Suspense>
  );
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
