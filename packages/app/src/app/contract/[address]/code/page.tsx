import { Suspense } from 'react';
import { ContractCode } from '~/systems/Contract/screens/ContractCode';
import { CodeBlockSkeleton } from '~/systems/Core/components/CodeBlock/CodeBlockSkeleton';

type ContractProps = {
  params: {
    address: string;
    tab: string;
  };
};

export default async function ContractPage({
  params: { address },
}: ContractProps) {
  return (
    <Suspense fallback={<CodeBlockSkeleton />}>
      <ContractCode id={address} />
    </Suspense>
  );
}

export const fetchCache = 'force-cache';
export const revalidate = Infinity;
