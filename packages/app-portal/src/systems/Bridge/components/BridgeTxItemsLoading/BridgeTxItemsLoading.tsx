import { LoadingBox, VStack } from '@fuels/ui';

export const BridgeTxItemsLoading = () => {
  return (
    <VStack justify="center" gap="3" aria-label="Loading Bridge Transactions">
      <LoadingBox className="w-full h-[56px]" />
      <LoadingBox className="w-full h-[56px]" />
      <LoadingBox className="w-full h-[56px]" />
      <LoadingBox className="w-full h-[56px]" />
      <LoadingBox className="w-full h-[56px]" />
    </VStack>
  );
};
