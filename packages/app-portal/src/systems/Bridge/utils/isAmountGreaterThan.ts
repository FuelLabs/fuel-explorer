/**
 * Compares two asset amounts with different decimal scales.
 *
 * @param assetA - The first asset with { amount: bigint, decimals: number }.
 * @param assetB - The second asset with { amount: bigint, decimals: number }.
 * @returns boolean - True if assetA.amount > assetB.amount after scaling, otherwise false.
 */
export function isAmountGreaterThan(
  assetA: { amount: bigint; decimals: number },
  assetB: { amount: bigint; decimals: number },
): boolean {
  const { amount: amountA, decimals: decimalsA } = assetA;
  const { amount: amountB, decimals: decimalsB } = assetB;

  // Adjust scale to match decimals
  if (decimalsA > decimalsB) {
    const scaleDifference = decimalsA - decimalsB;
    return amountA > amountB * BigInt(10 ** scaleDifference);
  }

  if (decimalsB > decimalsA) {
    const scaleDifference = decimalsB - decimalsA;
    return amountA * BigInt(10 ** scaleDifference) > amountB;
  }

  // If decimals are equal, compare directly
  return amountA > amountB;
}
