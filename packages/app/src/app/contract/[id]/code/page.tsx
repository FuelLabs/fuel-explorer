import { redirect } from 'next/navigation';
import { getContract } from '~/systems/Contract/actions/get-contract';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

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
  return <CodeBlock value={contract.bytecode} title="Bytecode" />;
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
