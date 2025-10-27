import { Card, HStack, LoadingBox, VStack } from '@fuels/ui';

export function TxItemLoader() {
  return (
    <Card className="py-2 px-4">
      <VStack className="gap-2 flex tablet:hidden">
        <HStack className="items-center gap-2 ml-14">
          <LoadingBox className="w-[70px] h-[20px]" />
        </HStack>

        <VStack className="gap-2 w-full ml-2">
          <HStack className="items-center gap-2">
            <LoadingBox className="rounded-full w-[38px] h-[38px]" />
            <VStack className="flex-1 gap-2">
              <LoadingBox className="w-28 h-[20px]" />
              <LoadingBox className="w-32 h-[16px]" />
            </VStack>
          </HStack>
        </VStack>

        <HStack className="items-center gap-1 ml-14">
          <LoadingBox className="w-16 h-[20px]" />
          <LoadingBox className="w-16 h-[14px]" />
        </HStack>
      </VStack>

      <HStack className="items-center gap-2 w-full hidden tablet:flex">
        <LoadingBox className="w-[70px] h-[20px]" />
        <VStack className="flex-1 gap-2">
          <HStack className="items-center gap-2 w-full">
            <LoadingBox className="rounded-full w-[38px] h-[38px]" />
            <VStack className="flex-1 gap-2">
              <LoadingBox className="w-28 h-[20px]" />
              <LoadingBox className="w-32 h-[16px]" />
            </VStack>
          </HStack>
        </VStack>
        <HStack className="items-end gap-1">
          <LoadingBox className="w-32 h-[20px] mr-2" />
          <LoadingBox className="w-16 h-[14px] mb-1" />
        </HStack>
      </HStack>
    </Card>
  );
}
