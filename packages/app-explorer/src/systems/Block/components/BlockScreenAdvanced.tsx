import type { GQLBlockFragment, Maybe } from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

type BlockScreenAdvancedProps =
  | {
      block: Maybe<GQLBlockFragment & { producer?: Maybe<string> }>;
      isLoading?: false;
    }
  | {
      block?: Maybe<GQLBlockFragment & { producer?: Maybe<string> }>;
      isLoading: true;
    };

export function BlockScreenAdvanced({
  block,
  isLoading,
}: BlockScreenAdvancedProps) {
  return (
    <VStack gap="6" className="px-4 desktop:px-0">
      <CodeBlock value={block || {}} type="json" isLoading={isLoading} />
    </VStack>
  );
}
