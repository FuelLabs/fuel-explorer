import { Box, Flex } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import Blocks from './pages/Blocks';

export function BlocksPage() {
  const classes = styles();
  return (
    <Flex justify="center">
      <Box className={classes.content()}>
        <Blocks />
      </Box>
    </Flex>
  );
}
const styles = tv({
  slots: {
    content: 'w-full max-w-[95%]',
  },
});
