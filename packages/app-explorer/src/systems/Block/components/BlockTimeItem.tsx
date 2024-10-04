import { Text, VStack, useBreakpoints } from '@fuels/ui';

type BlockTimeItemProps = {
  timeAgo: string;
};

export default function BlockTimeItem({ timeAgo }: BlockTimeItemProps) {
  const { isMobile } = useBreakpoints();

  return (
    <VStack gap="0px">
      <Text
        className={
          isMobile
            ? 'text-[0.7rem] pr-[0px] text-end whitespace-nowrap'
            : 'text-[0.7rem]  text-center whitespace-nowrap'
        }
      >
        {timeAgo}
      </Text>
    </VStack>
  );
}
