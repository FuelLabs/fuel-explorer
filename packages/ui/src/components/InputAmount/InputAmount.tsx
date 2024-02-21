import { useEffect, useState } from 'react';

import { type BN, FormatConfig, bn, format } from '@fuel-ts/math';
import { DECIMAL_UNITS, DEFAULT_MIN_PRECISION } from '@fuel-ts/math/configs';

import { IconChevronDown } from '@tabler/icons-react';

import { cx } from '../../utils/css';
import { Flex } from '../Box';
import { Button } from '../Button';
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
          className="mt-1 p-0.5 font-mono text-lg"
          autoComplete="off"
          inputMode="decimal"
          placeholder="0.00"
          allowedDecimalSeparators={['.', ',']}
          allowNegative={false}
          thousandSeparator={false}
          value={assetAmount}
          onChange={(e) => {
            handleAmountChange(e.target.value);
          }}
          decimalScale={DECIMAL_UNITS}
        />

        <Input.Slot gap="4" className="mt-2">
          <Button
            aria-label="Max"
            variant="link"
            size="1"
            color="green"
            className="font-mono"
            onClick={handleSetBalance}
          >
            MAX
          </Button>
          {asset && (
            <Button
              id="CoinSelector"
              aria-label="Coin Selector"
              variant="surface"
              color="gray"
              className="gap-1.5 text-xs py-1 px-2"
              onClick={onClickAsset}
              disabled={!onClickAsset}
            >
              <Avatar
                src={asset?.imageUrl}
                fallback=""
                radius="full"
                className="w-5 h-5"
              />

              {asset.name}
              <IconChevronDown height={20} width={20} />
            </Button>
          )}
        </Input.Slot>
      </Flex>

      <Input.Slot>
        <Tooltip content={format(balance, formatOpts)} sideOffset={-5}>
          <Text
            size="1"
            className="pb-3 self-start"
            aria-label={`Balance: ${formattedBalance}`}
          >
            Balance: {formattedBalance}
          </Text>
        </Tooltip>
      </Input.Slot>
    </Input>
  );
};
