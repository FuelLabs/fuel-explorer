import { Button, Card, Flex, Text, VStack } from '@fuels/ui';
import { tv } from 'tailwind-variants';

type BridgeTxListEmptyProps = {
  isConnecting: boolean;
  onClick: () => void;
};

export const BridgeTxListNotConnected = ({
  isConnecting,
  onClick,
}: BridgeTxListEmptyProps) => {
  const classes = styles();

  return (
    <Card className="border-0">
      <Card.Body className={classes.cardBody()}>
        <VStack justify="center" align="center" gap="6">
          <VStack justify="center" align="center" gap="1">
            <Text className={classes.title()}>Wallet not detected</Text>
            <Text className={classes.subtitle()}>
              Connect a wallet to see your transactions
            </Text>
          </VStack>
          <Flex justify="center">
            <Button
              isLoading={isConnecting}
              color="green"
              className={classes.connectButton()}
              onClick={onClick}
            >
              Connect Fuel Wallet
            </Button>
          </Flex>
        </VStack>
      </Card.Body>
    </Card>
  );
};

const styles = tv({
  slots: {
    connectButton: 'w-[180px]',
    cardBody: 'p-3',
    title: 'text-md text-heading',
    subtitle: 'text-xs text-muted',
  },
});
