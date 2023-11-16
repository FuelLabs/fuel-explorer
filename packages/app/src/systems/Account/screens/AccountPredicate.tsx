import { VStack } from '@fuels/ui';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

import { getPredicate } from '../actions/get-predicate';

export async function AccountPredicate({ id }: { id: string }) {
  const predicate = await getPredicate({ owner: id });
  return (
    <VStack gap="6">
      <CodeBlock value={predicate?.bytecode || ''} title="Byte code" />
    </VStack>
  );
}
