import { HStack, LoadingBox, VStack } from '@fuels/ui';
import { TokenBadge } from '@fuels/ui';

export function InputAmountLoader() {
  return (
    <VStack gap="4" width="100%">
      {/* Token amount row */}
      <HStack gap="3" align="center" width="100%" className="mt-2.5">
        <TokenBadge image="/assets/fuel.png" symbol="FUEL" size="small" />
        <LoadingBox className="w-32 h-7" /> {/* For 1000.2 */}
      </HStack>
      <LoadingBox className="w-40 h-[18px]" />{' '}
      {/* For "Relative value in USD:" */}
    </VStack>
  );
}
