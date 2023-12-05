import { Suspense } from 'react';
import { AccountPredicate } from '~/systems/Account/screens/AccountPredicate';
import { CodeBlockSkeleton } from '~/systems/Core/components/CodeBlock/CodeBlockSkeleton';

type AccountProps = {
  params: {
    address: string;
  };
};

export default async function Account({ params: { address } }: AccountProps) {
  return (
    <Suspense fallback={<CodeBlockSkeleton />}>
      <AccountPredicate id={address} />
    </Suspense>
  );
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
