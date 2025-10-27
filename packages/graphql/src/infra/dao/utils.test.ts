import {
  convertToUsd,
  removeExtraDecimals,
  removeScientificNotation,
} from './utils';

test('Should remove scientific notation', () => {
  expect(removeScientificNotation(0.0000000000001)).toBe('0.0000000000001');
  expect(removeScientificNotation(0.0000000000002798798)).toBe(
    '0.0000000000002798798',
  );
});

test('Should remove extra decimals', () => {
  expect(removeExtraDecimals('0.0000000000017897987')).toBe('0.000000000001');
  expect(removeExtraDecimals('1.11111')).toBe('1.11111');
  expect(removeExtraDecimals('0.0000101010101')).toBe('0.00001');
  expect(removeExtraDecimals('0.000028')).toBe('0.00002');
  expect(removeExtraDecimals('0.00008')).toBe('0.00008');
  expect(removeExtraDecimals('0')).toBe('0');
  expect(removeExtraDecimals('10000')).toBe('10000');
});

test('Should format to usd', () => {
  expect(convertToUsd('1', 9, 1).formatted).toBe('$0.000000001');
  expect(convertToUsd('100', 9, 3088.54).formatted).toBe('$0.0003');
  expect(convertToUsd('4763069935', 9, 3088.54).formatted).toBe('$14,710.93');
  expect(convertToUsd('50914437160339649', 9, 0.058969).formatted).toBe(
    '$3,002,373.44',
  );
  expect(convertToUsd('50914437160339649', 9, 0.000000001).formatted).toBe(
    '$0.05',
  );
});

test('Should handle zero and no rate cases', () => {
  expect(convertToUsd('0', 9, 1)).toEqual({ value: 0, formatted: '$0' });

  expect(convertToUsd(null as any, 9, 1)).toEqual({
    value: 0,
    formatted: '$0',
  });

  expect(convertToUsd(undefined as any, 9, 1)).toEqual({
    value: 0,
    formatted: '$0',
  });

  expect(convertToUsd('1000', 9, 0)).toEqual({ value: 0, formatted: '$0' });
  expect(convertToUsd('0', 9, 0)).toEqual({ value: 0, formatted: '$0' });
  expect(convertToUsd(null as any, 9, 0)).toEqual({
    value: 0,
    formatted: '$0',
  });
  expect(convertToUsd(undefined as any, 9, 0)).toEqual({
    value: 0,
    formatted: '$0',
  });
});

test('Should handle very small numbers', () => {
  expect(convertToUsd('1', 18, 0.000000001).formatted).toBe('$0.000000001');
  expect(convertToUsd('1', 18, 0.0000000001).formatted).toBe('$0.0000000001');
});
