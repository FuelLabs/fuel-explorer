import { VStack } from '@fuels/ui';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

export type TabSourceProps = {
  bytecode?: string;
};

export function TabSource({ bytecode }: TabSourceProps) {
  if (!bytecode) return null;

  return (
    <VStack gap="6">
      <CodeBlock value={bytecode} title="Byte code" />
    </VStack>
  );
}
