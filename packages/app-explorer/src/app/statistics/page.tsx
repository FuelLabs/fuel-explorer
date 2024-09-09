'use client';
import { Box, Flex } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { StatisticsScreen } from '~/systems/Statistics/screens/StatisticsScreen';

const Statistics = () => {
  const classes = styles();
  return (
    <Flex justify="center">
      <Box className={classes.content()}>
        <StatisticsScreen />
      </Box>
    </Flex>
  );
};
const styles = tv({
  slots: {
    content: 'w-full max-w-[100%]',
  },
});
export default Statistics;

export const dynamic = 'force-static';
