import { Box, HStack, Text, VStack } from '@fuels/ui';

type BlockEfficiencyItemProps = {
  current: number;
  total: number;
};

export default function BlockEfficiencyItem({
  current,
  total,
}: BlockEfficiencyItemProps) {
  // Convert current and total to millions
  const currentInMillions = current / 1_000_000;
  const totalInMillions = total / 1_000_000;

  // Calculate progress percentage
  const progress = (current / total) * 100;

  return (
    <Box>
      <VStack gap="2">
        <HStack className="justify-between items-center">
          {/* Format current and total as M (millions) */}
          <Text className="font-inter text-gray-10 text-[0.7rem] whitespace-nowrap">
            {currentInMillions % 1 === 0
              ? currentInMillions.toFixed(0)
              : currentInMillions.toFixed(1)}
            M /
            {totalInMillions % 1 === 0
              ? totalInMillions.toFixed(0)
              : totalInMillions.toFixed(1)}
            M
          </Text>
          <Text className="font-inter text-gray-10 text-[0.7rem] whitespace-nowrap">
            ({progress.toFixed(2)}%)
          </Text>
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
