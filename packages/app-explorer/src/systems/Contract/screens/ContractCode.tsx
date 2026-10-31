import { VStack } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { useContract } from '~/hooks/useApi';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';
import { PageState } from '~/systems/Core/components/PageState/PageState';
import { useContractMetadata } from '~/systems/Transaction/hooks/useContractMetadata';
import { MetadataAudits } from '../../Core/components/MetadataAudits/MetadataAudits';
import { MetadataSourcecode } from '../../Core/components/MetadataSourcecode/MetadataSourcecode';

export function ContractCode({ id }: { id: string }) {
  const { t } = useTranslation();
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
        <CodeBlock
          value=""
          title={t('contract.bytecode')}
          height={600}
          isLoading={true}
        />
      </VStack>
    );
  }

  // Show error state only for contract data (required)
  if (contractError) {
    return <PageState tone="error" title={t('contract.error_code')} />;
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
        title={t('contract.bytecode')}
        height={
          !isMetadataLoading && !metadataError && metadata?.source ? 200 : 600
        }
      />
    </VStack>
  );
}
