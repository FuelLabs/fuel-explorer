import type {
  PublicClient,
  TransactionReceipt,
  WaitForTransactionReceiptParameters,
} from 'viem';
import type { HexAddress } from '../types';

/**
 * Fetches transaction receipt with fallback to waitForTransactionReceipt
 */
export async function getTransactionReceipt({
  publicClient,
  txHash,
  waitOptions,
}: {
  publicClient: PublicClient;
  txHash: HexAddress;
  waitOptions?: Omit<WaitForTransactionReceiptParameters, 'hash'>;
}): Promise<TransactionReceipt> {
  let receipt: TransactionReceipt;
  try {
    receipt = await publicClient.getTransactionReceipt({
      hash: txHash,
    });
  } catch (_err: unknown) {
    // workaround in place because waitForTransactionReceipt stop working after first time using it
    receipt = await publicClient.waitForTransactionReceipt({
      ...(waitOptions ? waitOptions : {}),
      hash: txHash,
    });
  }
  return receipt;
}
