import {
  PublicClient,
  TransactionReceipt,
  WaitForTransactionReceiptParameters,
} from 'viem';

export async function getTransactionReceipt({
  ethPublicClient,
  txHash,
  waitOptions,
}: {
  ethPublicClient: PublicClient;
  txHash: `0x${string}`;
  waitOptions?: Omit<WaitForTransactionReceiptParameters, 'hash'>;
}): Promise<TransactionReceipt> {
  let receipt: TransactionReceipt;
  try {
    receipt = await ethPublicClient.getTransactionReceipt({
      hash: txHash,
    });
  } catch (_err: unknown) {
    // workaround in place because waitForTransactionReceipt stop working after first time using it
    receipt = await ethPublicClient.waitForTransactionReceipt({
      ...(waitOptions ? waitOptions : {}),
      hash: txHash,
    });
  }
  return receipt;
}
