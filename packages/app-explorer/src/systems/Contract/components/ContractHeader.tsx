import { Address, Flex, HStack, Text, VStack } from '@fuels/ui';

import { DEFAULT_PAGETITLE_MB, PageTitle } from 'app-commons';
import { useContractMetadata } from '~/hooks/useApi';
import { MetadataLogo } from '~/systems/Core/components/MetadataLogo/MetadataLogo';
import { ContractLinks } from './ContractLinks';
import { ContractTabs } from './ContractTabs';

export function ContractHeader({ id }: { id: string }) {
  const hasValidId = Boolean(id && id.length > 0);
  const { data, isLoading } = useContractMetadata(hasValidId ? id : null);

  const { metadata, project } = data || { metadata: null, project: null };

  if (!hasValidId) {
    return (
      <VStack gap="2" mb={DEFAULT_PAGETITLE_MB}>
        <div className="h-10" />
      </VStack>
    );
  }

  return (
    <>
      <VStack gap="2" mb={DEFAULT_PAGETITLE_MB}>
        <Flex
          gap="2"
          align="start"
          direction={{
            initial: 'column',
            md: 'row',
          }}
          justify="between"
        >
          <HStack align="start" gap="4">
            <MetadataLogo
              type="ContractCall"
              name={!isLoading && metadata?.name}
              image={!isLoading && project?.image}
            />
            <PageTitle
              title={metadata?.name ? `Contract: ${metadata.name}` : 'Contract'}
              subtitle={<Address value={id} full={true} />}
              mb="0"
            />
          </HStack>
          {<ContractLinks project={project} links={metadata?.links} />}
        </Flex>
        {metadata?.description && (
          <Text as="div" color="gray" size="1">
            {metadata.description}
          </Text>
        )}
      </VStack>
      <ContractTabs contractId={id} />
    </>
  );
}
