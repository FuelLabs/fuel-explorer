import { Text, VStack } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export const BridgeListEmpty = () => {
  const classes = styles();

  return (
    <div className={classes.root()}>
      <VStack justify="center" align="center" gap="1">
        <Text className={classes.title()}>No activity yet</Text>
        <Text className={classes.subtitle()}>
          When you make a transaction you&apos;ll see it here
        </Text>
      </VStack>
    </div>
  );
};

const styles = tv({
  slots: {
    root: 'border border-[var(--fuel-border)] px-4 py-8 text-center',
    title: 'text-md font-medium text-heading',
    subtitle: 'text-sm text-[var(--fuel-element-low-em)]',
  },
});
