import { useEffect, useState } from 'react';

import { type BN, FormatConfig, bn, format } from '@fuel-ts/math';
import { DECIMAL_UNITS, DEFAULT_MIN_PRECISION } from '@fuel-ts/math/configs';

import { IconChevronDown } from '@tabler/icons-react';

import { cx } from '../../utils/css';
import { Flex } from '../Box';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { InputProps } from '../Input/Input';
import { Input } from '../Input/Input';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';

import { Avatar } from '../Avatar';
import { createAmount } from './utils';

export type InputAmountProps = Omit<InputProps, 'size' | 'onChange'> & {
  isDisabled?: boolean;
  balance?: BN;
  asset?: { name?: string; imageUrl?: string; address?: string };
  value?: BN | null;
  onChange?: (val: BN | null) => void;
  onClickAsset?: () => void;
};

const formatOpts: FormatConfig = {
  units: DECIMAL_UNITS,
  precision: DECIMAL_UNITS,
};

export const InputAmount = ({
  className,
  variant,
  color,
  value,
  balance: initialBalance,
  asset,
  onChange,
  onClickAsset,
}: InputAmountProps) => {
  const [assetAmount, setAssetAmount] = useState<string>(
    !value || value.eq(0) ? '' : value.format(formatOpts),
  );

  const balance = initialBalance ?? bn(initialBalance);
  const formattedBalance = balance.format({
    ...formatOpts,
    precision: balance.eq(0) ? 1 : DEFAULT_MIN_PRECISION,
  });

  const handleAmountChange = (text: string) => {
    const { text: newText, amount } = createAmount(text, formatOpts.units);
    const { amount: currentAmount } = createAmount(
      assetAmount,
      formatOpts.units,
    );
    if (!currentAmount.eq(amount)) {
      onChange?.(newText.length ? amount : null);
      setAssetAmount(newText);
    }
  };

  const handleSetBalance = () => {
    if (balance) {
      handleAmountChange(balance.format(formatOpts));
    }
  };

  useEffect(() => {
    handleAmountChange(value ? value.format(formatOpts) : '');
  }, [value?.toString()]);

  return (
    <Input
      className={cx(className, 'flex-col')}
      color={color}
      size="3"
      variant={variant}
    >
      <Flex>
        <Input.Number
          autoComplete="off"
          inputMode="decimal"
          placeholder="0.00"
          allowedDecimalSeparators={['.', ',']}
          allowNegative={false}
          thousandSeparator={false}
          value={assetAmount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleAmountChange(e.target.value);
          }}
          decimalScale={DECIMAL_UNITS}
        />

        <Input.Slot>
          <Button
            aria-label="Max"
            variant="link"
            size="1"
            onClick={handleSetBalance}
          >
            MAX
          </Button>
          {asset && (
            <Button
              aria-label="Coin Selector"
              variant="outline"
              onClick={onClickAsset}
              disabled={!onClickAsset}
              size="2"
            >
              <Avatar
                src={asset?.imageUrl}
                fallback=""
                radius="full"
                size="1"
              />

              {asset.name}
              <Icon color="text-green-10" icon={IconChevronDown} size={16} />
            </Button>
          )}
        </Input.Slot>
      </Flex>

      <Tooltip content={format(balance, formatOpts)} sideOffset={-5}>
        <Text
          size="2"
          color="blue"
          className="pl-2 pb-2 self-start"
          aria-label={`Balance: ${formattedBalance}`}
        >
          Balance: {formattedBalance}
        </Text>
      </Tooltip>
    </Input>
  );
};
