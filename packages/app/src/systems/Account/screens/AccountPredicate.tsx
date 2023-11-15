'use client';

import { VStack } from '@fuels/ui';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

export function AccountPredicate({ bytecode }: { bytecode: string }) {
  return (
    <VStack gap="6">
      <CodeBlock value={bytecode} title="Byte code" />
    </VStack>
  );
}
