import { Text, VStack } from '@fuels/ui';

type BlockTimeItemProps = {
  time: Date;
  timeAgo: string;
};

export default function BlockTimeItem({ time, timeAgo }: BlockTimeItemProps) {
  const timeDate = new Date(time);

  const formattedTime = timeDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <VStack gap="0px">
      <Text className="text-[0.7rem] p-0 m-0 text-[#9f9f9f]">{timeAgo}</Text>
      <Text className="text-[0.7rem] p-0 m-0 text-[#9f9f9f] whitespace-nowrap">
        {formattedTime}
      </Text>
    </VStack>
  );
}
