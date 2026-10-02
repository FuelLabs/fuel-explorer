import { Button, Flex, Text, VStack } from '@fuels/ui';
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
    <div className={classes.root()}>
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
            aria-label="Connect Fuel Wallet"
          >
            Connect Fuel Wallet
          </Button>
        </Flex>
      </VStack>
    </div>
  );
};

const styles = tv({
  slots: {
    root: 'border border-[var(--fuel-border)] px-4 py-8 text-center',
    connectButton: 'whitespace-nowrap',
    title: 'text-md font-medium text-heading',
    subtitle: 'text-sm text-[var(--fuel-element-low-em)]',
  },
});
