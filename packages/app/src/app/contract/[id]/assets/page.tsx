import { Suspense } from 'react';
import { AssetsLoader } from '~/systems/Asset/components/AssetsLoader';
import { ContractAssets } from '~/systems/Contract/screens/ContractAsset';
import type { ContractRouteProps } from '~/systems/Contract/types';

export default async function ContractPage({
  params: { id },
}: ContractRouteProps) {
  return (
    <Suspense fallback={<AssetsLoader />}>
      <ContractAssets id={id} />
    </Suspense>
  );
}

export const revalidate = 10;
