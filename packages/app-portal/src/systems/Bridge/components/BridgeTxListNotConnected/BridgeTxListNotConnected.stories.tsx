import { cssObj } from '@fuel-ui/css';
import { Box } from '@fuel-ui/react';

import { BridgeTxListNotConnected } from './BridgeTxListNotConnected';

export default {
  component: BridgeTxListNotConnected,
  title: 'BridgeTxListNotConnected',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxListNotConnected isConnecting={false} onClick={() => {}} />
    </Box.Flex>
  );
};

export const IsConnecting = () => {
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxListNotConnected isConnecting={true} onClick={() => {}} />
    </Box.Flex>
  );
};

const styles = {
  storybook: cssObj({
    margin: '20px',
    width: '100%',
  }),
};
