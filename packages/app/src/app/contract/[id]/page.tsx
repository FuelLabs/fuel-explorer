import { redirect } from 'next/navigation';
import {
  getContract,
  getContractBalances,
} from '~/systems/Contract/actions/get-contract';
import { ContractAssets } from '~/systems/Contract/components/ContractAssets';

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
  return <ContractAssets balances={balances} />;
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
