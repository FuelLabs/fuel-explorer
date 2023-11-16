import { Suspense } from 'react';
import { ContractCode } from '~/systems/Contract/screens/ContractCode';
import { CodeBlockSkeleton } from '~/systems/Core/components/CodeBlock/CodeBlockSkeleton';

type ContractProps = {
  params: {
    id: string;
  };
};

export default async function ContractCodePage({
  params: { id },
}: ContractProps) {
  return (
    <Suspense fallback={<CodeBlockSkeleton />}>
      <ContractCode id={id} />
    </Suspense>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
