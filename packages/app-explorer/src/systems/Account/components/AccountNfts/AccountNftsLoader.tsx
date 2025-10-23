import { Badge, Grid, HStack, Skeleton, Text, VStack } from '@fuels/ui';

const placeholders = Array.from({ length: 10 }, (_, i) => i);

export function AccountNftsLoader() {
  return (
    <VStack className="min-h-[45vh]">
      <div className="mb-10">
        <HStack align="center" gap="2" className="mb-5">
          <Text className="font-bold text-md text-primary font-mono">
            <Skeleton width="180px" height="14px" />
          </Text>
          <Badge variant="ghost" color="gray" size="2">
            ...
          </Badge>
        </HStack>
        <Grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {placeholders.map((placeholder) => {
            return (
              <VStack key={placeholder} gap="0" align="center">
                <div className="w-full aspect-square rounded-[12px] overflow-hidden">
                  <Skeleton width="100%" height="100%" />
                </div>

                <Skeleton
                  width="80%"
                  height="12px"
                  className="mt-[22px] mb-2"
                />
              </VStack>
            );
          })}
        </Grid>
      </div>
    </VStack>
  );
}
