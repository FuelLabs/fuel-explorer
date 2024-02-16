import { ContentLoader } from '@fuel-ui/react';
import { Flex } from '@fuels/ui';

export const TagLoader = () => {
  return (
    <ContentLoader height={32} width={80} viewBox="0 0 80 32">
      <rect height={32} width={80} rx="4" />
    </ContentLoader>
  );
};

type EcosystemTagsLoadingProps = {
  items?: number;
};

export const EcosystemTagsLoading = ({
  items = 8,
}: EcosystemTagsLoadingProps) => {
  return (
    <Flex justify="start" align="center" gap="3" wrap="wrap">
      {Array.from({ length: items }).map((_, i) => (
        <TagLoader key={i} />
      ))}
    </Flex>
  );
};
