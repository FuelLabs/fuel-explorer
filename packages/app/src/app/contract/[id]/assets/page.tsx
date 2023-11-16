import { Suspense } from 'react';
import { AssetsSkeleton } from '~/systems/Asset/components/AssetsSkeleton';
import { ContractAssets } from '~/systems/Contract/screens/ContractAsset';

type ContractProps = {
  params: {
    id: string;
  };
};

export default async function ContractPage({ params: { id } }: ContractProps) {
  return (
    <Suspense fallback={<AssetsSkeleton />}>
      <ContractAssets id={id} />
    </Suspense>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
