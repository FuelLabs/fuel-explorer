import { intlLanguage } from 'app-commons';
import type { FormatAmountResult } from '~staking/systems/Core/types/bn';

type FormatAnimatedBalanceParams = {
  value: number;
  formatted: FormatAmountResult['formatted'];
};

export const formatAnimatedBalance = ({
  value,
  formatted,
}: FormatAnimatedBalanceParams) => {
  if (!value) {
    return '0';
  }

  const reFormatted = value.toLocaleString(intlLanguage(), {
    minimumFractionDigits: formatted.fractionDigits,
    maximumFractionDigits: formatted.fractionDigits,
  });

  // Sometimes we'll have something like "<0.001", which is important to show
  if (formatted.display.includes('<')) {
    return `<${reFormatted}`;
  }

  return reFormatted;
};
