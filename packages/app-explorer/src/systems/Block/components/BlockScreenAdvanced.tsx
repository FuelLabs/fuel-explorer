import type { GQLBlockFragment, Maybe } from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

type BlockScreenAdvancedProps = {
  block?: Maybe<GQLBlockFragment & { producer?: Maybe<string> }>;
};

export function BlockScreenAdvanced({ block }: BlockScreenAdvancedProps) {
  if (!block) {
    return null;
  }
  return (
    <VStack gap="6" className="px-4 desktop:px-0">
      <CodeBlock value={block} type="json" />
    </VStack>
  );
}
