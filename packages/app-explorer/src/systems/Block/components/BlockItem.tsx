import { Box, Copyable, HStack, Text, VStack } from '@fuels/ui';

export interface BlockItemProps {
  blockId: string;
  ethValue: string;
}

export default function BlockItem({ blockId, ethValue }: BlockItemProps) {
  return (
    <VStack gap="1">
      <HStack>
        <Box>
          <Copyable
            value={blockId}
            className="font-mono font-semibold text-sm "
          >
            #{blockId}
          </Copyable>
        </Box>
      </HStack>
      <Text className="text-gray-10 text-xs text-ellipsis w-[7rem]">
        {ethValue} ETH
      </Text>
    </VStack>
  );
}
