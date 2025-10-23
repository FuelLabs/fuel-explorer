import { convertToUsd } from '@fuels/ui';
import { BN } from 'fuels';
import { useMemo } from 'react';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import { formatAmount } from '~staking/systems/Core/utils/bn';

export function useFormattedTokenAmount({
  amount,
  decimals,
  symbol,
  rates = [],
}: {
  amount: BN | null;
  decimals: number;
  symbol: string;
  rates: AssetRate[];
}) {
  const ratesData = useMemo(() => {
    const tokenRate = rates?.find(
      (rate) => rate.symbol.toLowerCase() === symbol.toLowerCase(),
    );

    const ethRate = rates?.find((rate) => rate.symbol.toLowerCase() === 'eth');

    return {
      token: tokenRate?.rate || 0,
      eth: ethRate?.rate || 0,
    };
  }, [rates, symbol]);

  const formattedResult = useMemo(() => {
    const {
      formatted: formattedAmount,
      original: originalAmount,
      tooltip: tooltipAmount,
    } = formatAmount(amount || new BN(0), decimals);

    const { formatted: formattedAmountUsd } = convertToUsd(
      amount || new BN(0),
      decimals,
      ratesData.token,
    );

    return {
      formattedAmount,
      originalAmount,
      tooltipAmount,
      formattedAmountUsd,
      ratesData,
    };
  }, [amount, decimals, ratesData.token]);

  return formattedResult;
}
