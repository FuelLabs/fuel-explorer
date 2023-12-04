import type { Maybe, BlockItemFragment } from '@fuel-explorer/graphql';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

type BlockScreenAdvancedProps = {
  block?: Maybe<BlockItemFragment & { producer: Maybe<string> }>;
};

export function BlockScreenAdvanced({ block }: BlockScreenAdvancedProps) {
  if (!block) {
    return null;
  }
  return <CodeBlock value={block} type="json" />;
}
