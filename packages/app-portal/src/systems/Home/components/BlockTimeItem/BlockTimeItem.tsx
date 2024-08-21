import { Text, VStack } from '@fuels/ui';

type BlockTimeItemProps = {
  time: Date;
};

export default function BlockTimeItem({ time }: BlockTimeItemProps) {
  const now = new Date();
  const timeDate = new Date(time);

  const diffInHours = Math.floor(
    (now.getTime() - timeDate.getTime()) / (1000 * 60 * 60),
  );
  const timeAgo = diffInHours > 0 ? `${diffInHours}h Ago` : 'Just Now';

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
      <Text className="text-[0.7rem] p-0 m-0 text-[#9f9f9f]">
        {formattedTime}
      </Text>
    </VStack>
  );
}
