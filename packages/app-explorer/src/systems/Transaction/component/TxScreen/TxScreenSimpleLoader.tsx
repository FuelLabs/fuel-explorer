import { Card, HStack, VStack } from '@fuels/ui';

export function TxScreenSimpleLoader() {
  return (
    <VStack>
      {/* Header with badges and time */}
      <HStack className="mobile:max-tablet:flex-col">
        <HStack>
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
        </HStack>
      </HStack>

      {/* Main transaction card */}
      <Card className="px-4 mt-9 relative h-60 animate-pulse bg-gray-100" />
    </VStack>
  );
}
