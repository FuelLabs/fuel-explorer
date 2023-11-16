import { Suspense } from 'react';
import { getPredicate } from '~/systems/Account/actions/get-predicate';
import { AccountPredicate } from '~/systems/Account/screens/AccountPredicate';
import { CodeBlockSkeleton } from '~/systems/Core/components/CodeBlock/CodeBlockSkeleton';

type PageProps = {
  params: {
    id: string | null;
  };
};

export default async function AccountPredicatePage({
  params: { id },
}: PageProps) {
  const predicate = await getPredicate({ owner: id });
  return (
    <Suspense fallback={<CodeBlockSkeleton />}>
      <AccountPredicate bytecode={predicate?.bytecode ?? ''} />
    </Suspense>
  );
}

export const revalidate = 100;
