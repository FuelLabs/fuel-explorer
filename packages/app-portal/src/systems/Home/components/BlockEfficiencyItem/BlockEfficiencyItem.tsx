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
    <Box width={'160px'}>
      <VStack gap="2">
        <HStack className="justify-between">
          <Text className="font-inter text-gray-10">
            {current}M/{total}M
          </Text>
          <Text className="font-inter text-gray-10">({progress})%</Text>
        </HStack>
        <div className="mt-[8px]">
          <div className="w-full h-[8px] rounded-full bg-white/10">
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
