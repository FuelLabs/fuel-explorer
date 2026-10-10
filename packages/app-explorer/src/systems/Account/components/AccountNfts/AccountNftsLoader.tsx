import { Grid, HStack, LoadingBox, VStack } from '@fuels/ui';

const placeholders = Array.from({ length: 10 }, (_, i) => i);

export function AccountNftsLoader() {
  return (
    <VStack className="min-h-[45vh]">
      <div className="mb-10">
        <HStack align="center" gap="2" className="mb-5">
          <LoadingBox className="h-[14px] w-[180px]" />
          <LoadingBox className="h-[14px] w-6" />
        </HStack>
        <Grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {placeholders.map((placeholder) => {
            return (
              <VStack key={placeholder} gap="0" align="center">
                <div className="w-full aspect-square overflow-hidden">
                  <LoadingBox className="size-full" />
                </div>
                <div className="flex h-6 w-full items-center justify-center">
                  <LoadingBox className="h-[14px] w-[80%]" />
                </div>
              </VStack>
            );
          })}
        </Grid>
      </div>
    </VStack>
  );
}
