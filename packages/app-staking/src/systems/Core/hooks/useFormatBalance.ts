import type { BN } from 'fuels';
import { useMemo } from 'react';
import type { FormatAmountResult } from '~staking/systems/Core/types/bn';
import { formatAmount } from '../utils/bn';

export const useFormatBalance = (
  raw: bigint | BN | undefined,
  decimals: number | undefined,
) => {
  const result = useMemo<FormatAmountResult>(() => {
    const value = raw ? raw.toString() : '0';
    return formatAmount(value, decimals);
  }, [raw, decimals]);

  return result;
};
