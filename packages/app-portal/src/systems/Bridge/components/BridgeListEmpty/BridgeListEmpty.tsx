import { Card, Text, VStack } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export const BridgeListEmpty = () => {
  const classes = styles();

  return (
    <Card>
      <Card.Body className={classes.cardBody()}>
        <VStack justify="center" align="center" gap="1">
          <Text className={classes.title()}>No activity yet</Text>
          <Text className={classes.subtitle()}>
            When you make a transaction you&apos;ll see it here
          </Text>
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
    subtitle: 'text-xs text-heading',
  },
});
