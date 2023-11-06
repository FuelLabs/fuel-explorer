import type { Maybe } from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

type BlockScreenAdvancedProps = {
  block?: Maybe<BlockItemFragment>;
};

export function BlockScreenAdvanced({ block }: BlockScreenAdvancedProps) {
  if (!block) {
    return null;
  }
  return (
    <VStack gap="6">
      <CodeBlock value={block} type="json" />
    </VStack>
  );
}
