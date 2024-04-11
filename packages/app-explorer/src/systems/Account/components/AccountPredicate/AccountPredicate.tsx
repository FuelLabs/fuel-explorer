'use client';

import type { GQLPredicateItem, Maybe } from '@fuel-explorer/graphql-new';
import { VStack } from '@fuels/ui';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

export type AccountPredicateProps = {
  predicate?: Maybe<GQLPredicateItem>;
  id: string;
  isLoading?: boolean;
};

export function AccountPredicate({
  predicate,
  isLoading,
}: AccountPredicateProps) {
  if (!predicate) {
    return null;
  }

  return (
    <VStack gap="6">
      <CodeBlock
        value={predicate?.bytecode || ''}
        title="Byte code"
        isLoading={isLoading}
      />
    </VStack>
  );
}
