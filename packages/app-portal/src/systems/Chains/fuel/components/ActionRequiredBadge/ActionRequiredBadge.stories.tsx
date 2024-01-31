import { cssObj } from '@fuel-ui/css';
import { Box } from '@fuel-ui/react';

import { ActionRequiredBadge } from './ActionRequiredBadge';

export default {
  component: ActionRequiredBadge,
  title: 'ActionRequiredBadge',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <ActionRequiredBadge />
    </Box.Flex>
  );
};

const styles = {
  storybook: cssObj({
    margin: '20px',
  }),
};
