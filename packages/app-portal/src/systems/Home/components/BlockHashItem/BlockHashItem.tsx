import { Box, Copyable, HStack, VStack } from '@fuels/ui';

type BlockHashItemProps = {
  hashAddress: string;
};

export default function BlockHashItem({ hashAddress }: BlockHashItemProps) {
  return (
    <VStack gap="1">
      <Box>
        <HStack>
          <Copyable value={hashAddress} className="font-mono text-gray-10">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {hashAddress}
            </p>
          </Copyable>
        </HStack>
      </Box>
    </VStack>
  );
}
