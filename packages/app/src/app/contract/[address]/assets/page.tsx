import { Suspense } from 'react';
import { AssetsSkeleton } from '~/systems/Asset/components/AssetsSkeleton';
import { ContractAssets } from '~/systems/Contract/screens/ContractAsset';

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
    <Suspense fallback={<AssetsSkeleton />}>
      <ContractAssets id={address} />
    </Suspense>
  );
}

export const revalidate = 10;
