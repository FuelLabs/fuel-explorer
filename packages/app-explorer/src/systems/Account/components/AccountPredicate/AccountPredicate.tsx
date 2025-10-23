import type { GQLPredicateItem } from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';
import { usePredicateMetadata } from '~/hooks/useApi';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';
import { MetadataAudits } from '~/systems/Core/components/MetadataAudits/MetadataAudits';
import { MetadataSourcecode } from '~/systems/Core/components/MetadataSourcecode/MetadataSourcecode';
import { AccountPredicateInfo } from './AccountPredicateInfo';

export type AccountPredicateProps = {
  predicate?: GQLPredicateItem;
  id: string;
  isLoading?: boolean;
};

export function AccountPredicate({
  predicate,
  isLoading,
}: AccountPredicateProps) {
  const { data: metadata } = usePredicateMetadata(predicate?.bytecode || null);

  if (!predicate) {
    return null;
  }

  return (
    <VStack gap="4">
      {metadata?.name && <AccountPredicateInfo metadata={metadata} />}
      {metadata?.audits && <MetadataAudits audits={metadata.audits} />}
      {metadata?.source && (
        <MetadataSourcecode url={metadata.source} commit={metadata.commit} />
      )}
      <CodeBlock
        value={predicate?.bytecode || ''}
        title="Bytecode"
        isLoading={isLoading}
        height={metadata?.source ? 200 : 600}
      />
    </VStack>
  );
}
