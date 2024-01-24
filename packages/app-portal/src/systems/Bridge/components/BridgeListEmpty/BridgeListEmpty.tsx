import { cssObj } from '@fuel-ui/css';
import { Box, Text } from '@fuel-ui/react';

export const BridgeListEmpty = () => {
  return (
    <Box.Stack align="center" justify="center" css={styles.stack}>
      <Text fontSize="lg" css={{ fontWeight: '$bold' }}>
        No activity yet
      </Text>
      <Text>When you make a transaction you&apos;ll see it here</Text>
    </Box.Stack>
  );
};

const styles = {
  stack: cssObj({
    height: '200px',
  }),
};
