import { Suspense } from 'react';
import { ContractCode } from '~/systems/Contract/screens/ContractCode';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

type ContractProps = {
  params: {
    id: string;
  };
};

export default async function ContractCodePage({
  params: { id },
}: ContractProps) {
  return (
    <Suspense fallback={<CodeBlock isLoading value="_" />}>
      <ContractCode id={id} />
    </Suspense>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
