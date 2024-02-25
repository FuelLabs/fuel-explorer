import { bn } from '@fuel-ts/math';
import { DECIMAL_UNITS } from '@fuel-ts/math/configs';

export function formatAmountLeadingZeros(text: string): string {
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

export function createAmount(text: string, units: number = DECIMAL_UNITS) {
  const textAmountFixed = formatAmountLeadingZeros(text);
  return {
    text: textAmountFixed,
    amount: bn.parseUnits(text.replaceAll(',', ''), units),
  };
}
