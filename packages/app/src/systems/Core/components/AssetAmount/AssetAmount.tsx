import { cssObj } from '@fuel-ui/css';
import type { BaseProps, TextProps } from '@fuel-ui/react';
import { Text } from '@fuel-ui/react';
import { bn, type BNInput } from 'fuels';

export type AssetAmountProps = BaseProps<
  Omit<TextProps, 'leftIcon' | 'rightIcon'>
> & {
  symbol: string;
  amount: BNInput;
  full?: boolean;
  negative?: boolean;
  hideIcon?: boolean;
};

export function AssetAmount({
  symbol,
  amount,
  full,
  css,
  negative,
  hideIcon,
  ...props
}: AssetAmountProps) {
  const num = bn(amount);
  return (
    <Text
      as="span"
      {...props}
      css={{ ...styles.root, ...css }}
      iconColor={negative ? 'intentsError9' : 'brand'}
      {...(!hideIcon && {
        leftIcon: negative ? 'ArrowDown' : 'ArrowUp',
      })}
    >
      {num.format(full ? {} : { units: 3 })} {symbol}
    </Text>
  );
}

const styles = {
  root: cssObj({
    color: '$textColor',
  }),
};
