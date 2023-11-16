import type { BNInput } from 'fuels';
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
