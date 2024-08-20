import { Box, HStack, Text, VStack } from '@fuels/ui';

type BlockEfficiencyItemProps = {
  current: number;
  total: number;
  progress: number;
};

export default function BlockEfficiencyItem({
  current,
  total,
  progress,
}: BlockEfficiencyItemProps) {
  return (
    <Box>
      <VStack gap="2">
        <HStack className="justify-between">
          <Text className="font-inter text-gray-10 text-xs">
            {current}M/{total}M
          </Text>
          <Text className="font-inter text-gray-10 text-xs">({progress})%</Text>
        </HStack>
        <div className="mt-[4px]">
          <div className="w-full h-[4px] rounded-full bg-gray-5">
            <div
              className="h-full bg-brand rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </VStack>
    </Box>
  );
}
