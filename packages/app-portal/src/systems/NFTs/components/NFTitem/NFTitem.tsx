import { Box, Copyable, HStack, Text, VStack } from '@fuels/ui';

export default function NFTItem() {
  return (
    <VStack gap="1">
      <HStack>
        <Box>
          <Copyable
            value={'#275029958'}
            className="font-mono font-semibold text-sm "
          >
            #275029958
          </Copyable>
        </Box>
      </HStack>
      <Text className="text-gray-10 text-xs"> 0.004878700 ETH</Text>
    </VStack>
  );
}
