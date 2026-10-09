import type { BN } from 'fuels';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { convertToUsd } from '../../utils/convertToUsd';
import { InputAmountSimpleContext } from '../InputAmountSimple/InputAmountSimpleContext';
import { Text } from '../Text';

export interface InputAmountRelativeValueProps {
  rate: number;
  value?: BN;
  decimals?: number;
}

export function InputAmountRelativeValue({
  rate,
  value: propsValue,
  decimals: propsDecimals,
}: InputAmountRelativeValueProps) {
  const { t } = useTranslation();
  // Try to get values from context, fall back to props
  const ctx = useContext(InputAmountSimpleContext);
  const value = propsValue ?? ctx?.value;
  const decimals = propsDecimals ?? ctx?.decimals;

  const { formatted } = useMemo(() => {
    if (value === undefined || decimals === undefined) {
      return { formatted: '', value: undefined };
    }
    return convertToUsd(value, decimals, rate);
  }, [value, decimals, rate]);

  if (!formatted) return null;

  return (
    <Text
      size="2"
      weight="medium"
      className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-[var(--fuel-element-low-em)] font-semibold"
    >
      {t('core.amount.relative_usd')}{' '}
      <span className="text-[var(--fuel-element-high-em)]">{formatted}</span>
    </Text>
  );
}
