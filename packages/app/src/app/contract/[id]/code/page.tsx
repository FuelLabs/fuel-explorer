import { redirect } from 'next/navigation';
import { getContract } from '~/systems/Contract/actions/get-contract';
import { ContractCode } from '~/systems/Contract/screens/ContractCode';

type ContractProps = {
  params: {
    id?: string | null;
  };
};

export default async function ContractCodePage({
  params: { id = null },
}: ContractProps) {
  const contract = await getContract({ id });
  if (!contract) return redirect('/');
  return <ContractCode bytecode={contract.bytecode} />;
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
