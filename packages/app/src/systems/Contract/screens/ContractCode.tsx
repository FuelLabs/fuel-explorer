import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

export function ContractCode({ bytecode }: { bytecode: string }) {
  return <CodeBlock value={bytecode} title="Bytecode" />;
}
