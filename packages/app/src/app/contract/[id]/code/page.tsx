import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getContract } from '~/systems/Contract/actions/get-contract';
import { ContractCode } from '~/systems/Contract/screens/ContractCode';
import { CodeBlockSkeleton } from '~/systems/Core/components/CodeBlock/CodeBlockSkeleton';

type ContractProps = {
  params: {
    id?: string | null;
  };
};

export default async function ContractCodePage({
  params: { id = null },
}: ContractProps) {
  const contract = await getContract({ id });
  if (!contract) return redirect('/');
  return (
    <Suspense fallback={<CodeBlockSkeleton />}>
      <ContractCode bytecode={contract.bytecode} />
    </Suspense>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
