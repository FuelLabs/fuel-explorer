import { Box, Copyable, HStack, VStack } from '@fuels/ui';

type BlockHashItemProps = {
  hashAddress: string;
  width: string;
};

export default function BlockHashItem({
  hashAddress,
  width,
}: BlockHashItemProps) {
  return (
    <VStack gap="1">
      <Box>
        <HStack width={width} maxWidth={'1'}>
          <Copyable
            value={hashAddress}
            className="font-mono text-gray-10 w-full"
          >
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {hashAddress}
            </p>
          </Copyable>
        </HStack>
      </Box>
    </VStack>
  );
}
