import { Text, VStack } from '@fuels/ui';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type BlockTimeItemProps = {
  time: Date;
  timeAgo?: string | null;
};

export default function BlockTimeItem({ time, timeAgo }: BlockTimeItemProps) {
  const timeDate = new Date(time);
  const computedTimeAgo = timeAgo || dayjs(timeDate).fromNow();

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
      <Text className="text-[0.7rem] p-0 m-0 text-[#9f9f9f]">
        {computedTimeAgo}
      </Text>
      <Text className="text-[0.7rem] p-0 m-0 text-[#9f9f9f] whitespace-nowrap">
        {formattedTime}
      </Text>
    </VStack>
  );
}
