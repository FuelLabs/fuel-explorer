import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { AssetsSkeleton } from '~/systems/Asset/components/AssetsSkeleton';
import { ContractAssets } from '~/systems/Contract/screens/ContractAsset';
import { ContractCode } from '~/systems/Contract/screens/ContractCode';
import { CodeBlockSkeleton } from '~/systems/Core/components/CodeBlock/CodeBlockSkeleton';

type ContractProps = {
  params: {
    address: string;
    tab: string;
  };
};

export default async function ContractPage({
  params: { address, tab },
}: ContractProps) {
  switch (tab) {
    case 'assets':
      return (
        <Suspense fallback={<AssetsSkeleton />}>
          <ContractAssets id={address} />
        </Suspense>
      );
    case 'code':
      return (
        <Suspense fallback={<CodeBlockSkeleton />}>
          <ContractCode id={address} />
        </Suspense>
      );
    default:
      return redirect(`/contract/${address}/assets`);
  }
}
