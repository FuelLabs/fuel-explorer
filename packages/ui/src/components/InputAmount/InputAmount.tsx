import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { type BN, FormatConfig, bn, format } from '@fuel-ts/math';
import { DECIMAL_UNITS, DEFAULT_MIN_PRECISION } from '@fuel-ts/math/configs';

import { IconChevronDown } from '@tabler/icons-react';

import { Button, ButtonProps } from '../Button';
import type { InputProps, InputSlotProps } from '../Input/Input';
import { Input } from '../Input/Input';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';

import { mergeProps } from 'react-aria';
import { tv } from 'tailwind-variants';
import { createComponent, withNamespace } from '../../utils/component';
import { Avatar } from '../Avatar';
import { createAmount } from './utils';

export type InputAmountProps = Omit<
  InputProps,
  'size' | 'onChange' | 'value'
> & {
  disabled?: boolean;
  balance?: BN;
  value?: BN | null;
  onChange?: (val: BN | null) => void;
};

export type InputAmountBalanceProps = InputSlotProps;
export type InputAmountButtonMaxBalanceProps = ButtonProps;
export type InputAmountCoinSelectorProps = ButtonProps & {
  asset?: { name?: string; imageUrl?: string; address?: string };
  onClick?: () => void;
};

type Context = {
  disabled?: boolean;
  balance: BN;
  assetAmount: string;
  handleAmountChange: (text: string) => void;
};

const ctx = createContext<Context>({} as Context);

const formatOpts: FormatConfig = {
  units: DECIMAL_UNITS,
  precision: DECIMAL_UNITS,
};

export const InputAmountRoot = createComponent<InputAmountProps, typeof Input>({
  id: 'InputAmount',
  render: (
    _,
    {
      className,
      value,
      balance: initialBalance,
      onChange,
      disabled,
      children,
      ...props
    },
  ) => {
    const classes = styles();
    const [assetAmount, setAssetAmount] = useState<string>(() =>
      !value || value.eq(0) ? '' : value.format(formatOpts),
    );

    const balance = initialBalance ?? bn(initialBalance);

    function handleAmountChange(text: string) {
      const { text: newText, amount } = createAmount(text, formatOpts.units);
      const { amount: currentAmount } = createAmount(
        assetAmount,
        formatOpts.units,
      );
      if (!currentAmount.eq(amount)) {
        onChange?.(newText.length ? amount : null);
        setAssetAmount(newText);
      }
    }

    useEffect(() => {
      handleAmountChange(value ? value.format(formatOpts) : '');
    }, [value?.toString()]);

    return (
      <ctx.Provider
        value={{
          balance,
          disabled,
          assetAmount,
          handleAmountChange,
        }}
      >
        <Input className={classes.root({ className })} size="3" {...props}>
          {children}
        </Input>
      </ctx.Provider>
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

export const InputAmountBalance = createComponent<
  InputAmountBalanceProps,
  typeof Input.Slot
>({
  id: 'InputAmountBalance',
  render: (_, { className, ...props }) => {
    const { balance } = useContext(ctx);
    const classes = styles();

    const formattedBalance = useMemo<string>(() => {
      return balance.format({
        ...formatOpts,
        precision: balance.eq(0) ? 1 : DEFAULT_MIN_PRECISION,
      });
    }, [balance]);

    return (
      <Input.Slot {...props} className={classes.balance({ className })}>
        <Tooltip content={format(balance, formatOpts)} sideOffset={-5}>
          <Text
            size="1"
            className="self-start"
            aria-label={`Balance: ${formattedBalance}`}
          >
            Balance: {formattedBalance}
          </Text>
        </Tooltip>
      </Input.Slot>
    );
  },
});

export const InputAmountButtonMaxBalance = createComponent<
  InputAmountButtonMaxBalanceProps,
  typeof Button
>({
  id: 'InputAmountButtonMaxBalance',
  defaultProps: {
    variant: 'link',
    size: '1',
    color: 'green',
    children: 'MAX',
  },
  render: (_, { className, children, ...props }) => {
    const classes = styles();
    const { disabled, balance, handleAmountChange } = useContext(ctx);

    const mergedProps = mergeProps(props, {
      onClick: () => {
        if (balance) {
          handleAmountChange(balance.format(formatOpts));
        }
      },
    });

    return (
      <Button
        aria-label="MAX"
        {...mergedProps}
        className={classes.maxBalance({ className })}
        disabled={disabled}
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
    const { disabled } = useContext(ctx);

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
  Slot: InputAmountSlot,
  Balance: InputAmountBalance,
  ButtonMaxBalance: InputAmountButtonMaxBalance,
  CoinSelector: InputAmountCoinSelector,
});

const styles = tv({
  slots: {
    root: [
      'flex-row flex-wrap bg-clip-border w-auto h-auto py-3',
      'first-child:flex-1 first-child:basis-1/2 first-child:indent-[var(--space-3)]',
    ],
    balance: 'pt-3 mb-auto',
    maxBalance: 'font-mono self-center item-center items-center',
    inputNumber: 'p-0.5 font-mono text-lg',
    coinSelector: 'gap-1.5 text-xs py-1',
  },
});
