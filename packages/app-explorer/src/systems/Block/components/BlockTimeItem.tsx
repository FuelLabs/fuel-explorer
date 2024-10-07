import { Box, Text, VStack, useBreakpoints } from '@fuels/ui';

type BlockTimeItemProps = {
  timeAgo: string;
};

export default function BlockTimeItem({ timeAgo }: BlockTimeItemProps) {
  const { isMobile } = useBreakpoints();

  return (
    <Box className="text-ellipsis">
      <VStack gap="0px" className={isMobile ? 'w-full' : ''}>
        <Text
          className={
            isMobile
              ? 'truncate w-100 text-[0.7rem] text-end text-ellipsis overflow-hidden'
              : 'text-[0.7rem] text-center whitespace-nowrap max-w-full'
          }
        >
          {timeAgo}
        </Text>
      </VStack>
    </Box>
  );
}
