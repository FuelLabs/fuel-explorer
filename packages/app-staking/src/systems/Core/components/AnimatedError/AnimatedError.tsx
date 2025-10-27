import { AnimatedHeight, Text, cx } from '@fuels/ui';

type AnimatedErrorProps = {
  error: string | undefined | null;
  className?: string;
};

export function AnimatedError({ error, className }: AnimatedErrorProps) {
  return (
    <AnimatedHeight enabled={Boolean(error)}>
      {/* // should line break and not overflow parent */}
      <Text
        color="red"
        className={cx(
          'break-words break-all whitespace-pre-wrap font-semibold',
          className,
        )}
      >
        {error}
      </Text>
    </AnimatedHeight>
  );
}
