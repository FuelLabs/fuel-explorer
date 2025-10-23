import type { BNInput, FormatConfig } from 'fuels';
import { bn } from 'fuels';

/**
 * Formats the given amount by multiplying it by 10 and formatting it with 1 unit.
 * This is a workaround because formatting with zero units doesn't work.
 * @param amount - The amount to format.
 * @returns The formatted amount.
 */
export function formatZeroUnits(amount: BNInput) {
  const formatted = bn(amount).mul(10).format({ units: 1, precision: 0 });
  return formatted;
}

export function parseZeroUnits(value: string) {
  return bn.parseUnits(value, 1).div(10);
}

/**
 * Formats the given amount handling automatically if decimals are zero.
 * This method only exists because of a bug when formatting with zero units.
 * @param amount - The amount to format.
 * @param config - The config to format.
 * @returns The formatted amount.
 */
export function formatAmount(amount?: BNInput, config?: FormatConfig) {
  if (!amount) return '';
  const units = config?.units ?? 0;
  const precision =
    config?.precision != null
      ? // avoid precision bigger than units
        Math.min(config.precision, units)
      : // if precision is not defined, we use the units as precision
        units;

  if (units === 0) {
    return formatZeroUnits(amount);
  }

  const formatConfig = {
    units,
    precision,
  };

  return bn(amount).format(formatConfig);
}

export function parseUnitsAmount(amount: string, units?: number) {
  const inputUnits = units ?? 0;
  if (inputUnits === 0) {
    return parseZeroUnits(amount);
  }
  return bn.parseUnits(amount, inputUnits);
}
