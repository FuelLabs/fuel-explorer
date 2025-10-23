import { DECIMAL_FUEL } from '@fuel-ts/math/configs';

import { parseUnitsAmount } from '../../utils/format';

function formatAmountLeadingZeros(text: string): string {
  if ((text.match(/\./g) || []).length > 1) {
    throw new Error('Invalid number format: more than one dot.');
  }

  const valueWithoutLeadingZeros = text
    .replace(/^0\d/, (substring) => substring.replace(/^0+(?=[\d])/, ''))
    .replace(/^0+(\d\.)/, '$1');
  const startsWithPoint = valueWithoutLeadingZeros.startsWith('.');

  if (!startsWithPoint) {
    return valueWithoutLeadingZeros;
  }
  if (valueWithoutLeadingZeros.length < 3) {
    return `0${valueWithoutLeadingZeros}`;
  }
  return text;
}

function formatAmountDecimals(text: string, units: number): string {
  const [integer, decimal] = text.split('.');

  if (!decimal) {
    return text;
  }
  return `${integer}.${decimal.slice(0, units)}`;
}

export function createAmount(text: string, units: number = DECIMAL_FUEL) {
  const textAmountFixed = formatAmountDecimals(
    formatAmountLeadingZeros(text),
    units,
  );

  return {
    text: textAmountFixed,
    amount: parseUnitsAmount(
      formatAmountDecimals(text, units).replaceAll(',', ''),
      units,
    ),
  };
}
