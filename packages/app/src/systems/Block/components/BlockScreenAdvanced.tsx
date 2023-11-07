import type { Maybe, BlockItemFragment } from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

type BlockScreenAdvancedProps = {
  block?: Maybe<BlockItemFragment & { producer: Maybe<string> }>;
};

export function BlockScreenAdvanced({ block }: BlockScreenAdvancedProps) {
  if (!block) {
    return null;
  }
  return (
    <VStack gap="6" className="px-4">
      <CodeBlock value={block} type="json" />
    </VStack>
  );
}
