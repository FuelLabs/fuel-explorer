import { Suspense } from 'react';
import { ContractCode } from '~/systems/Contract/screens/ContractCode';
import type { ContractRouteProps } from '~/systems/Contract/types';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

export default async function ContractPage({
  params: { id },
}: ContractRouteProps) {
  return (
    <Suspense fallback={<CodeBlock isLoading value="_" />}>
      <ContractCode id={id} />
    </Suspense>
  );
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
