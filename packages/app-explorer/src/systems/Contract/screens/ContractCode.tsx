import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

import { getContract } from '../actions/get-contract';

export async function ContractCode({ id }: { id: string }) {
  const contract = await getContract({ id });
  return <CodeBlock value={contract?.bytecode || ''} title="Bytecode" />;
}
