import { type BN, bn } from 'fuels';

export function roundToNearest(time: number, roundUp = false): number {
  const msInHour = 60 * 60 * 1000;
  return roundUp
    ? Math.ceil(time / msInHour) * msInHour
    : Math.floor(time / msInHour) * msInHour;
}

// General interval creation function
export function createIntervals(
  startTime: number,
  endTime: number,
  unit: 'minute' | 'hour' | 'day',
  intervalSize: number,
): Array<{ start: Date; end: Date; txCount: number; totalGas: number }> {
  const roundedStartTime = roundToNearest(startTime);
  const roundedEndTime = roundToNearest(endTime, true);

  const intervals: Array<{
    start: Date;
    end: Date;
    txCount: number;
    totalGas: number;
  }> = [];

  let currentTime = roundedStartTime;

  // Handle minute, hour, and day intervals
  const msInUnit = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
  };

  const intervalDuration = intervalSize * msInUnit[unit];

  while (currentTime < roundedEndTime) {
    const startInterval = new Date(currentTime);
    const endInterval = new Date(currentTime + intervalDuration);
    intervals.push({
      start: startInterval,
      end: endInterval,
      txCount: 0,
      totalGas: 0,
    });
    currentTime += intervalDuration;
  }

  return intervals;
}

export function removeScientificNotation(value: number) {
  const valueString = String(value);
  if (valueString.includes('e') || valueString.includes('E')) {
    return value.toFixed(20).replace(/\.?0+$/, '');
  }
  return String(value);
}

export function removeExtraDecimals(value: string) {
  const numberOfZeros = String(value).match(/(0\.0*)/)?.[0].length || 0;
  if (!numberOfZeros) return value;
  return String(value).slice(0, numberOfZeros + 1);
}

const MONEY_PRECISION = 2;

function countDecimals(value: number): number {
  if (Math.floor(value) === value) return 0;

  // Really low numbers will add a scientific notation
  const str = value.toString();

  // Handle scientific notation
  if (str.includes('e-')) {
    const [nonExp, exp] = str.split('e-');
    if (nonExp.includes('.')) {
      const [, decimals] = nonExp.split('.');
      return Number(exp) + decimals.length;
    }
    return Number(exp);
  }
  return str.split('.')[1]?.length || 0;
}

function getTargetPrecision(rateDecimals: number, amountDecimals: number) {
  return Math.max(rateDecimals, amountDecimals);
}

export function convertToUsd(
  amount: string | BN | undefined | null,
  decimals: number,
  rate: number,
): { value: number; formatted: string } {
  // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
  if (!rate || amount == undefined) return { value: 0, formatted: '$0' };

  // Convert string amount to BN if needed
  const amountBN = typeof amount === 'string' ? bn(amount) : amount;

  // Get the number of decimals in the rate and what's target precision
  const rateDecimals = countDecimals(rate);
  const targetPrecision = getTargetPrecision(rateDecimals, decimals);

  // Get how many decimal places we need to apply to the rate to match the amount precision
  // Usually the amount has more decimals than the rate, so we need to add zeros to the rate
  const ratePrecision = Math.max(decimals - rateDecimals, 0);
  const rateUnits = bn.parseUnits(rate.toFixed(rateDecimals), rateDecimals);
  const rateFixed = rateUnits.mul(bn(10).pow(ratePrecision));

  // Get how many decimal places we need to apply to the amount to match the rate precision
  // Sometimes the rate has more decimals than the amount, so we need to add zeros to the amount
  const amountPrecision = Math.max(rateDecimals - decimals, 0);

  // Calculate the USD value in fixed-point: ((amount * 10^amountPrecision) * rateFixed) / 10^targetPrecision
  const amountFixed = amountBN.mul(bn(10).pow(amountPrecision));
  const numerator = amountFixed.mul(bn(rateFixed));
  const denominator = bn(10).pow(bn(targetPrecision));
  const scaledUsdBN = numerator.div(denominator);

  // Use BN.format to insert the decimal point
  const formattedUsd = scaledUsdBN.format({
    minPrecision: MONEY_PRECISION,
    precision: MONEY_PRECISION,
    units: targetPrecision,
  });

  return scaledUsdBN.isZero()
    ? { value: 0, formatted: '$0' }
    : {
        value: Number(formattedUsd.replace(/,/g, '')),
        formatted: `$${formattedUsd}`,
      };
}
