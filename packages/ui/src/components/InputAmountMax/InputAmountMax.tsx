import type { BN } from 'fuels';
import { useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { InputAmountSimpleContext } from '../InputAmountSimple/InputAmountSimpleContext';
import { Text } from '../Text';

export interface InputAmountMaxProps {
  amount: BN | undefined;
  label?: string;
  onMax: () => void;
  decimals?: number;
  symbol?: string;
  disabled?: boolean;
}

export function InputAmountMax({
  amount,
  label,
  onMax,
  decimals: propsDecimals,
  symbol: propsSymbol,
  disabled: propsDisabled,
}: InputAmountMaxProps) {
  const { t } = useTranslation();
  const availableLabel = label ?? t('core.amount.available');
  const maxLabel = t('core.amount.max_label');
  // Try to get values from context, fall back to props
  const ctx = useContext(InputAmountSimpleContext);
  const decimals = propsDecimals ?? ctx?.decimals ?? 9;
  const symbol = propsSymbol ?? ctx?.symbol ?? '';
  const disabled = propsDisabled ?? ctx?.disabled ?? false;

  const handleMax = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (disabled) {
        return;
      }

      onMax();
    },
    [onMax, disabled],
  );

  const formatted = useMemo<string>(() => {
    if (!amount || amount?.isZero()) {
      return '0';
    }

    return amount.format({
      units: decimals,
      minPrecision: 0,
    });
  }, [amount, decimals]);

  return (
    <Text size="2" color="gray" className="inline-flex gap-1 w-full mb-5">
      <span className="flex-shrink-0 text-[var(--fuel-element-low-em)]">
        {availableLabel}:
      </span>{' '}
      <span className="whitespace-nowrap overflow-hidden text-ellipsis text-[var(--fuel-element-high-em)]">
        {formatted}
      </span>
      <span className="flex-shrink-0 text-[var(--fuel-element-high-em)]">
        {symbol}
      </span>
      <button
        type="button"
        onClick={handleMax}
        disabled={disabled}
        tabIndex={-1}
        aria-label={maxLabel}
        className="fuel-hover-fill fuel-label ml-2 inline-flex flex-shrink-0 items-center border border-[var(--fuel-line)] px-2 text-[var(--fuel-element-high-em)] enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
      >
        {maxLabel}
      </button>
    </Text>
  );
}
