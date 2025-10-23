import { Card, HStack, Skeleton, Text, VStack } from '@fuels/ui';

export const ConversionToolLoader = () => {
  return (
    <div>
      <HStack
        direction={{
          initial: 'column',
          md: 'row',
        }}
        justify="between"
        className="mt-5"
      >
        <Skeleton>
          <Card className="grow h-[120px]" />
        </Skeleton>
        <Skeleton>
          <Card className="grow h-[120px]" />
        </Skeleton>
      </HStack>

      <VStack className="mt-16 gap-16">
        <VStack gap="2">
          <Text className="font-mono" size="4" weight="bold">
            Fuel Token Vesting
          </Text>
          <div className="filter-single-clip-polygon">
            <Card className="p-6 border-single-clip-polygon h-[124px]" />
          </div>
        </VStack>
      </VStack>
    </div>
  );
};
