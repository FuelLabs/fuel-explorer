import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { AssetsSkeleton } from '~/systems/Asset/components/AssetsSkeleton';
import {
  getContract,
  getContractBalances,
} from '~/systems/Contract/actions/get-contract';
import { ContractAssets } from '~/systems/Contract/screens/ContractAsset';

type ContractProps = {
  params: {
    id?: string | null;
  };
};

export default async function ContractPage({
  params: { id = null },
}: ContractProps) {
  const contract = await getContract({ id });
  const balances = await getContractBalances({ id });
  if (!contract) return redirect('/');
  return (
    <Suspense fallback={<AssetsSkeleton />}>
      <ContractAssets balances={balances} />
    </Suspense>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
