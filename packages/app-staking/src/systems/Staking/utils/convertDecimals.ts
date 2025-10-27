import { type BN, bn } from 'fuels';

export const convertDecimals = (
  amount: BN,
  originDecimals: number,
  targetDecimals: number,
) => {
  if (originDecimals === targetDecimals) return amount;
  return bn.parseUnits(
    amount.format({ precision: originDecimals, units: originDecimals }),
    targetDecimals,
  );
};
