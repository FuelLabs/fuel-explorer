import { Button, Card, Text, VStack } from '@fuels/ui';
import { useModal } from 'connectkit';
import { tv } from 'tailwind-variants';

export const StakingEmptyState = () => {
  const classes = styles();
  const { setOpen } = useModal();

  return (
    <Card className={classes.card()}>
      <Card.Body className={classes.cardBody()}>
        <VStack gap="2" align="start">
          <Text
            as="div"
            size="2"
            className="whitespace-nowrap overflow-hidden text-ellipsis"
          >
            Connect your wallet to view available tokens for staking.
          </Text>
          <Button
            onClick={() => setOpen(true)}
            size="2"
            color="gray"
            variant="outline"
          >
            Connect Ethereum Wallet
          </Button>
        </VStack>
      </Card.Body>
    </Card>
  );
};

export const styles = tv({
  slots: {
    card: 'p-4 px-5 flex-1 gap-2 justify-between',
    cardBody: 'p-0 flex flex-col gap-5',
  },
});
