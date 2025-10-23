import type { BN } from 'fuels';

export type FormatAmountResult = {
  amount: BN;
  tooltip: boolean;
  formatted: {
    display: string;
    fractionDigits: number;
  };
  original: {
    display: string;
    fractionDigits: number;
  };
};
