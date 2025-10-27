import type { BN } from 'fuels';
import { useCallback, useContext, useMemo } from 'react';
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
  label = 'Available',
  onMax,
  decimals: propsDecimals,
  symbol: propsSymbol,
  disabled: propsDisabled,
}: InputAmountMaxProps) {
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
      <span className="flex-shrink-0 text-gray-10">{label}:</span>{' '}
      <span
        style={{ color: 'var(--gray-12)' }}
        className="whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {formatted}
      </span>
      <span style={{ color: 'var(--gray-12)' }} className="flex-shrink-0">
        {symbol}
      </span>
      <button
        type="button"
        onClick={handleMax}
        disabled={disabled}
        tabIndex={-1}
        style={{
          all: 'unset',
          display: 'inline-flex',
          gap: '0.25rem',
          flexShrink: 0,
          alignItems: 'center',
          fontFamily: 'sans-serif',
          fontWeight: 500,
          fontSize: '13px',
          lineHeight: '20px',
          marginLeft: '0.5rem',
          color: 'var(--green-11)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.4 : 1,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.color = 'var(--green-12)';
            e.currentTarget.style.textDecoration = 'underline';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--green-11)';
          e.currentTarget.style.textDecoration = 'none';
        }}
      >
        Max
      </button>
    </Text>
  );
}
