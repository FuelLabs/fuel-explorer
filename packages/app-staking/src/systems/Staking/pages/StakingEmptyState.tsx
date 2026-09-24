import { Button, Card, Flex, Text } from '@fuels/ui';
import { useModal } from 'connectkit';
import { tv } from 'tailwind-variants';

export const StakingEmptyState = () => {
  const classes = styles();
  const { setOpen } = useModal();

  return (
    <Card className={classes.card()}>
      <Card.Body className={classes.cardBody()}>
        <Flex gap="2" className={classes.content()}>
          <Text as="div" size="2" className={classes.text()}>
            Connect your wallet to view available tokens for staking.
          </Text>
          <Button
            onClick={() => setOpen(true)}
            size="2"
            color="gray"
            variant="outline"
            className={classes.button()}
          >
            Connect Ethereum Wallet
          </Button>
        </Flex>
      </Card.Body>
    </Card>
  );
};

export const styles = tv({
  slots: {
    card: 'p-4 px-5 flex-1 gap-2 justify-between',
    cardBody: 'p-0 flex flex-col gap-5',
    content:
      'flex-col items-start tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-4',
    text: 'min-w-0 max-w-full whitespace-nowrap overflow-hidden text-ellipsis',
    button: 'shrink-0',
  },
});
