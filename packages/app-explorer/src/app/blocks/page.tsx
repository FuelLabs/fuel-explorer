'use client';
import { Box, Flex } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { BlocksScreen } from '~/systems/Block/screens/BlockScreen';

const Blocks = () => {
  const classes = styles();
  return (
    <Flex>
      <Box className={classes.content()}>
        <BlocksScreen />
      </Box>
    </Flex>
  );
};
const styles = tv({
  slots: {
    content: 'w-full max-w-[100%]',
  },
});
export default Blocks;

export const dynamic = 'force-static';
