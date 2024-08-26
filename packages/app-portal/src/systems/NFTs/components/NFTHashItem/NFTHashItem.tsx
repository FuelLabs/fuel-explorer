import { Box, Copyable, HStack, VStack } from '@fuels/ui';

type NFTHashItemProps = {
  hashAddress: string;
  width: string;
};

export default function NFTHashItem({ hashAddress, width }: NFTHashItemProps) {
  return (
    <VStack gap="1">
      <Box>
        <HStack width={width} maxWidth={'1'}>
          <Copyable value={hashAddress} className="font-mono w-full">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {hashAddress}
            </p>
          </Copyable>
        </HStack>
      </Box>
    </VStack>
  );
}
