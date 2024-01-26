import { cssObj } from '@fuel-ui/css';
import { Box, Card, Text } from '@fuel-ui/react';

export const BridgeListEmpty = () => {
  return (
    <Card variant="outlined">
      <Card.Body css={styles.cardBody}>
        <Box.Stack justify="center" align="center" gap="$1">
          <Text fontSize="lg" color="intentsBase12">
            No activity yet
          </Text>
          <Text color="intentsBase10" fontSize="sm">
            When you make a transaction you&apos;ll see it here
          </Text>
        </Box.Stack>
      </Card.Body>
    </Card>
  );
};

const styles = {
  connectButton: cssObj({
    width: 180,
  }),
  cardBody: cssObj({
    py: '$8',
  }),
};
