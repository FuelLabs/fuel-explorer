import { Text, VStack } from '@fuels/ui';

type BlockTimeItemProps = {
  timeAgo: string;
};

export default function BlockTimeItem({ timeAgo }: BlockTimeItemProps) {
  // const timeDate = new Date(time);

  // const formattedTime = timeDate.toLocaleString('en-US', {
  //   year: 'numeric',
  //   month: 'short',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   hour12: true,
  // });

  return (
    <VStack gap="0px">
      <Text className="text-[0.7rem] m-0 text-center whitespace-nowrap">
        {timeAgo}
      </Text>
      {/* <Text className="text-[0.7rem] p-0 m-0 text-[#9f9f9f] whitespace-nowrap">
        {formattedTime}
      </Text> */}
    </VStack>
  );
}
