/** One key for an Ethereum to Fuel transfer: its store entry, actor name and machine id. */
export function ethToFuelTxKey(
  txHash: string | undefined,
  nonce: BigInt | undefined,
) {
  return `${txHash}-${nonce}`;
}
