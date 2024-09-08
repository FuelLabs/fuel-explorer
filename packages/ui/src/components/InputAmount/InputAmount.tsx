import { useContext, useEffect, useMemo, useState } from 'react';

import { type BN, type FormatConfig, bn } from '@fuel-ts/math';
import { DECIMAL_UNITS, DEFAULT_MIN_PRECISION } from '@fuel-ts/math/configs';

import { IconChevronDown } from '@tabler/icons-react';

import { Button, type ButtonProps } from '../Button';
import type { InputProps, InputSlotProps } from '../Input/Input';
import { Input } from '../Input/Input';
import { Text, type TextProps } from '../Text';
import { Tooltip } from '../Tooltip';

import clsx from 'clsx';
import { mergeProps } from 'react-aria';
import { tv } from 'tailwind-variants';
import { createComponent, withNamespace } from '../../utils/component';
import { Avatar } from '../Avatar';
import { Badge, type BadgeProps } from '../Badge';
import { VStack, type VStackProps } from '../Box';
import { InputAmountFieldCtx, InputAmountRootCtx } from './InputAmount.context';
import type { AmountChangeParameters } from './InputAmount.types';
import { createAmount } from './utils';

export type InputAmountFieldProps = Omit<
  InputProps,
  'size' | 'onChange' | 'value'
> & {
  disabled?: boolean;
  value?: BN | null;
  onChange?: (val: BN | null) => void;
};

export type InputAmountProps = VStackProps & {
  balance?: BN;
  formatOpts?: FormatConfig;
};
export type InputAmountBalanceProps = BadgeProps & {
  label?: string;
  balance?: BN;
};
export type InputAmountButtonMaxBalanceProps = ButtonProps;
export type InputAmountCoinSelectorProps = ButtonProps & {
  asset?: { name?: string; imageUrl?: string; address?: string };
  onClick?: () => void;
};

const DEFAULT_FORMAT: FormatConfig = {
  units: DECIMAL_UNITS,
  precision: DECIMAL_UNITS,
};

export const InputAmountRoot = createComponent<InputAmountProps, typeof VStack>(
  {
    id: 'InputAmountRoot',
    baseElement: VStack,
    defaultProps: {
      gap: '2',
    },
    render: (
      Root,
      {
        balance: initialBalance,
        formatOpts: initialFormatOpts,
        children,
        ...props
      },
    ) => {
      const balance = initialBalance ?? bn(initialBalance);
      const formatOpts = initialFormatOpts ?? DEFAULT_FORMAT;

      return (
        <InputAmountRootCtx.Provider
          value={{
            balance,
            formatOpts,
          }}
        >
          <Root {...props}>{children}</Root>
        </InputAmountRootCtx.Provider>
      );
    },
  },
);

export const InputAmountField = createComponent<
  InputAmountFieldProps,
  typeof Input
>({
  id: 'InputAmountField',
  render: (_, { className, value, onChange, disabled, children, ...props }) => {
    const classes = styles();

    const { formatOpts } = useContext(InputAmountRootCtx);

    const [assetAmount, setAssetAmount] = useState<string>(
      !value || value.eq(0) ? '' : value.format(formatOpts),
    );

    function handleAmountChange({
      text,
      incomingAmount,
    }: AmountChangeParameters) {
      let amountText = text ?? incomingAmount?.format?.(formatOpts) ?? '';
      const lastCharacter = amountText?.[amountText?.length - 1];
      const shouldRemoveLastCharacter =
        lastCharacter &&
        lastCharacter !== '.' &&
        Number.isNaN(Number.parseFloat(lastCharacter));
      if (shouldRemoveLastCharacter) {
        amountText = amountText.slice(0, amountText.length - 1);
      }

      const { text: newText, amount } = createAmount(
        amountText,
        formatOpts.units,
      );
      const { amount: currentAmount } = createAmount(
        assetAmount,
        formatOpts.units,
      );
      const amountChanged = !currentAmount.eq(amount);

      if (amountChanged || text) {
        setAssetAmount((prevText) =>
          prevText !== newText ? newText : prevText,
        );
      }
      if (amountChanged) {
        onChange?.(newText.length ? amount : null);
      }
    }

    useEffect(() => {
      handleAmountChange({ incomingAmount: value });
    }, [value?.toString()]);

    return (
      <InputAmountFieldCtx.Provider
        value={{
          disabled,
          assetAmount,
          handleAmountChange,
        }}
      >
        <Input
          className={classes.field({ className })}
          size="3"
          {...props}
          inputMode="decimal"
          autoComplete="off"
          placeholder="0.00"
          value={assetAmount}
          onChange={(e) => handleAmountChange({ text: e.target.value })}
          disabled={disabled}
        >
          {children}
        </Input>
      </InputAmountFieldCtx.Provider>
    );
  },
});

export const InputAmountSlot = createComponent<
  InputSlotProps,
  typeof Input.Slot
>({
  id: 'InputAmountSlot',
  baseElement: Input.Slot,
  defaultProps: {
    gap: '4',
    className: 'mt-2',
    side: 'right',
  },
});

export const InputAmountLabel = createComponent<TextProps, typeof Text>({
  id: 'InputAmountLabel',
  baseElement: Text,
  defaultProps: {
    size: '2',
    weight: 'medium',
    as: 'label',
  },
});

export const InputAmountBalance = createComponent<
  InputAmountBalanceProps,
  typeof Badge
>({
  id: 'InputAmountBalance',
  render: (
    _,
    { className, label = 'Balance', balance: customBalance, ...props },
  ) => {
    const { balance: originalBalance, formatOpts } =
      useContext(InputAmountRootCtx);
    const balance = customBalance ?? originalBalance;

    const preview = useMemo<string>(() => {
      return balance.format({
        units: formatOpts.units,
        minPrecision: formatOpts.minPrecision,
        precision: balance.isZero() ? 1 : DEFAULT_MIN_PRECISION,
      });
    }, [balance, formatOpts]);

    const complete = useMemo<string>(() => {
      return balance.format({
        units: formatOpts.units,
        precision: formatOpts.precision,
      });
    }, [balance, formatOpts]);

    return (
      <Tooltip content={complete} delayDuration={0}>
        <Badge
          variant="ghost"
          color="green"
          size="1"
          radius="full"
          className={clsx('self-start', className)}
          aria-label="Balance"
          {...props}
        >
          {label}: {preview}
        </Badge>
      </Tooltip>
    );
  },
});

export const InputAmountButtonMaxBalance = createComponent<
  InputAmountButtonMaxBalanceProps,
  typeof Button
>({
  id: 'InputAmountButtonMaxBalance',
  defaultProps: {
    variant: 'ghost',
    size: '1',
    color: 'green',
    children: 'MAX',
  },
  render: (_, { className, children, ...props }) => {
    const classes = styles();
    const { balance, formatOpts } = useContext(InputAmountRootCtx);
    const { disabled, handleAmountChange } = useContext(InputAmountFieldCtx);

    const mergedProps = mergeProps(props, {
      onClick: () => {
        if (balance) {
          handleAmountChange({
            text: balance.format(formatOpts ?? DEFAULT_FORMAT),
          });
        }
      },
    });

    return (
      <Button
        aria-label="MAX"
        type="button"
        {...mergedProps}
        className={classes.maxBalance({ className })}
        disabled={disabled || balance.isZero()}
      >
        {children}
      </Button>
    );
  },
});

export const InputAmountCoinSelector = createComponent<
  InputAmountCoinSelectorProps,
  typeof Button
>({
  id: 'InputAmountCoinSelector',
  render: (_, { className, asset, onClick, ...props }) => {
    const classes = styles();
    const { disabled } = useContext(InputAmountFieldCtx);

    if (!asset) {
      return null;
    }

    return (
      <Button
        id="CoinSelector"
        aria-label="Coin Selector"
        variant="surface"
        color="gray"
        onClick={onClick}
        disabled={disabled || !onClick}
        {...props}
        className={classes.coinSelector({ className })}
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
    );
  },
});

export const InputAmount = withNamespace(InputAmountRoot, {
  Label: InputAmountLabel,
  Field: InputAmountField,
  Slot: InputAmountSlot,
  Balance: InputAmountBalance,
  ButtonMaxBalance: InputAmountButtonMaxBalance,
  CoinSelector: InputAmountCoinSelector,
});

const styles = tv({
  slots: {
    field: [
      'flex-row flex-wrap bg-clip-border w-auto h-auto py-3',
      'first-child:flex-1 first-child:basis-1/2 first-child:indent-[var(--space-3)]',
    ],
    maxBalance: ['font-medium text-sm', 'h-6 px-2', 'mr-2', 'rounded-md'],
    coinSelector: 'gap-1.5 text-xs py-1',
  },
});
