import { ReceiptType } from '../generated/types';
import type {
  TransactionItemFragment,
  TransactionReceiptFragment,
} from '../generated/types';

type Tx = TransactionItemFragment;

const isCall = (r: TransactionReceiptFragment) =>
  r.receiptType === ReceiptType.Call;

const isReturn = (r: TransactionReceiptFragment) =>
  r.receiptType === ReceiptType.Return;

const isError = (r: TransactionReceiptFragment) =>
  r.receiptType === ReceiptType.Panic || r.receiptType === ReceiptType.Revert;

const isResult = (r: TransactionReceiptFragment) =>
  r.receiptType === ReceiptType.ScriptResult;

function getType(receipt: TransactionReceiptFragment) {
  if (receipt.sender) return 'FROM_ACCOUNT';
  if (receipt.contract?.id ?? receipt.contractId ?? receipt.to?.id) {
    return 'FROM_CONTRACT';
  }
  if (isReturn(receipt) && !receipt.contract?.id) {
    return 'FROM_RESULT';
  }
  return null;
}

export class OperationDomain {
  constructor() {}

  async operationsFromTransaction(transaction: Tx) {
    const receipts = transaction.receipts || [];
    const hasError = receipts.some(isError);
    const calls = receipts.reduce((acc, receipt, idx) => {
      if (isCall(receipt)) {
        return [...acc, idx];
      }
      if (isReturn(receipt) && !receipt.contract?.id) {
        return [...acc, idx];
      }
      if (isResult(receipt) && hasError) {
        return [...acc, idx];
      }
      return acc;
    }, [] as number[]);

    const operations = calls.map((id, idx) => {
      const items = [...receipts].slice(id, calls[idx + 1] || receipts.length);
      const first = receipts[id];
      const type = getType(first);
      return { type, receipts: items };
    });

    return operations;
  }
}
