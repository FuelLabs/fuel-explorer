import { cssObj } from '@fuel-ui/css';
import { Box, Text, Button } from '@fuel-ui/react';

import { BridgeTxItemsLoading } from '../BridgeTxItemsLoading';

type BridgeTxListEmptyProps = {
  isConnecting: boolean;
  onClick: () => void;
};

export const BridgeTxListNotConnected = ({
  isConnecting,
  onClick,
}: BridgeTxListEmptyProps) => {
  return (
    <Box.Stack justify="center" gap="$4">
      <BridgeTxItemsLoading />
      <Box.Flex justify="center">
        <Text fontSize="lg" color="intentsBase12">
          Connect your wallet to see transactions
        </Text>
      </Box.Flex>
      <Box.Flex justify="center">
        <Button
          isLoading={isConnecting}
          intent="primary"
          css={styles.connectButton}
          onPress={onClick}
        >
          Connect Fuel Wallet
        </Button>
      </Box.Flex>
    </Box.Stack>
  );
};

const styles = {
  connectButton: cssObj({
    width: '$50',
  }),
};
