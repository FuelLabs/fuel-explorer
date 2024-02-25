import { Flex } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { BridgeTxListNotConnected } from './BridgeTxListNotConnected';

export default {
  component: BridgeTxListNotConnected,
  title: 'BridgeTxListNotConnected',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  const classes = styles();

  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <BridgeTxListNotConnected isConnecting={false} onClick={() => {}} />
    </Flex>
  );
};

export const IsConnecting = () => {
  const classes = styles();

  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <BridgeTxListNotConnected isConnecting={true} onClick={() => {}} />
    </Flex>
  );
};

const styles = tv({
  slots: {
    storybook: 'm-4 w-full',
  },
});
