import { VStack } from '@fuels/ui';
import { useContract } from '~/hooks/useApi';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';
import { useContractMetadata } from '~/systems/Transaction/hooks/useContractMetadata';
import { MetadataAudits } from '../../Core/components/MetadataAudits/MetadataAudits';
import { MetadataSourcecode } from '../../Core/components/MetadataSourcecode/MetadataSourcecode';

export function ContractCode({ id }: { id: string }) {
  const {
    data: contract,
    isLoading: isContractLoading,
    error: contractError,
  } = useContract(id);
  const {
    data: metadataData,
    isLoading: isMetadataLoading,
    error: metadataError,
  } = useContractMetadata(id);
  const { metadata } = metadataData || { metadata: null };

  // Show loading state only for contract data (required)
  if (isContractLoading) {
    return (
      <VStack gap="4">
        <CodeBlock value="" title="Bytecode" height={600} isLoading={true} />
      </VStack>
    );
  }

  // Show error state only for contract data (required)
  if (contractError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load contract data</p>
      </div>
    );
  }

  // Always show bytecode, metadata is optional
  return (
    <VStack gap="4" className="mt-0 tablet:mt-6">
      {/* Show metadata components only if not loading and no error */}
      {!isMetadataLoading && !metadataError && metadata && (
        <>
          {metadata.audits && <MetadataAudits audits={metadata.audits} />}
          {metadata.source && (
            <MetadataSourcecode
              url={metadata.source}
              commit={metadata.commit}
            />
          )}
        </>
      )}

      {/* Always show bytecode */}
      <CodeBlock
        value={contract?.bytecode || ''}
        title="Bytecode"
        height={
          !isMetadataLoading && !metadataError && metadata?.source ? 200 : 600
        }
      />
    </VStack>
  );
}
