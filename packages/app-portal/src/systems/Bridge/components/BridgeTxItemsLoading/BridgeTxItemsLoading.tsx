import { LoadingBox, VStack } from '@fuels/ui';

export const BridgeTxItemsLoading = () => {
  return (
    <VStack justify="center" gap="4" aria-label="Loading Bridge Transactions">
      <LoadingBox className="w-full h-[58px]" />
      <LoadingBox className="w-full h-[58px]" />
      <LoadingBox className="w-full h-[58px]" />
    </VStack>
  );
};
