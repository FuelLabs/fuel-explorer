import { Text, type TextProps, Tooltip } from '@fuels/ui';
import type { BN } from 'fuels';
import { useAnimatedCounter } from '~staking/systems/Core/hooks/useAnimatedCounter';
import { formatAnimatedBalance } from '~staking/systems/Core/utils/formatAnimatedBalance';
import { useFormatBalance } from '../../hooks/useFormatBalance';

type FormattedAmountProps = {
  amount: bigint | BN | undefined;
  decimals: number;
  symbol?: string;
  textProps?: TextProps;
};

export function FormattedAmount({
  amount,
  decimals,
  symbol,
  textProps,
}: FormattedAmountProps) {
  const balance = useFormatBalance(amount, decimals);

  const amountRef = useAnimatedCounter({
    to: balance.formatted.display,
    format: (value) => {
      return formatAnimatedBalance({
        value,
        formatted: balance.formatted,
      });
    },
  });

  return (
    <Tooltip
      content={`${balance.original.display}${symbol ? ` ${symbol}` : ''}`}
      delayDuration={0}
    >
      <Text ref={amountRef} {...textProps}>
        0
      </Text>
    </Tooltip>
  );
}
