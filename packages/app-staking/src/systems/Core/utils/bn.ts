import {
  type BN,
  type BNInput,
  DECIMAL_WEI,
  DEFAULT_MIN_PRECISION,
  bn,
} from 'fuels';
import type { FormatAmountResult } from '~staking/systems/Core/types/bn';

export const bnToBigInt = (bn: BN): bigint => BigInt(bn.toString());

export const bigIntToBn = (bigInt: bigint): BN => bn(bigInt.toString());

const MINIMUM_ZEROS_TO_DISPLAY = 2; // it means 0.001 (at least two zeros in decimals)

export const formatAmount = (
  input: BNInput | bigint | null | undefined = '0',
  units: number | undefined = DECIMAL_WEI,
): FormatAmountResult => {
  const val = typeof input === 'bigint' ? input.toString() : input;
  const amount = bn(val);
  const minimum = bn('1'.padEnd(units - MINIMUM_ZEROS_TO_DISPLAY, '0'));

  if (amount.isZero()) {
    return {
      amount,
      tooltip: false,
      formatted: {
        display: '0',
        fractionDigits: 0,
      },
      original: {
        display: '0',
        fractionDigits: 0,
      },
    };
  }

  // Format the original amount, example "0.000000000002409883". Good to use in tooltips.
  // But in UIs, it may break the layout, so we need to display only the "formatted" there.
  const originalDisplay = amount.format({
    units: units,
    precision: units,
  });

  if (minimum.gt(amount)) {
    return {
      amount,
      tooltip: true,
      formatted: {
        display: `<${minimum.format({
          units: units,
          precision: DEFAULT_MIN_PRECISION,
        })}`,
        fractionDigits: DEFAULT_MIN_PRECISION,
      },
      original: {
        display: originalDisplay,
        fractionDigits: units,
      },
    };
  }

  const formattedDisplay = amount.format({
    units: units,
    precision: DEFAULT_MIN_PRECISION,
  });

  return {
    amount,
    tooltip: formattedDisplay !== originalDisplay,
    formatted: {
      display: formattedDisplay,
      fractionDigits: DEFAULT_MIN_PRECISION,
    },
    original: {
      display: originalDisplay,
      fractionDigits: units,
    },
  };
};
