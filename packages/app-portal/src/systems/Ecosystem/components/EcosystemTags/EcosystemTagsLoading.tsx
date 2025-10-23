import { Flex, LoadingBox } from '@fuels/ui';

export const TagLoader = () => {
  return <LoadingBox className="w-[80px] h-[32px]" />;
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
