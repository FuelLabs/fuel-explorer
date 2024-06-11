import type {
  Operation,
  OperationReceipt,
  SuccessStatus,
  TransactionItemFragment,
  TransactionReceiptFragment,
} from '../generated/types';

type Tx = TransactionItemFragment;
type TxReceipt = TransactionReceiptFragment;

function createReceiptTypeChecker(types: string[]) {
  return (receipt: TxReceipt) =>
    types.some((type) => type === receipt?.receiptType);
}

const isCall = createReceiptTypeChecker(['CALL']);
const isReturnData = createReceiptTypeChecker(['RETURN_DATA']);
const isReturn = createReceiptTypeChecker(['RETURN']);
const isResult = createReceiptTypeChecker(['SCRIPT_RESULT']);
const isError = createReceiptTypeChecker(['PANIC', 'REVERT']);

function getType(receipt: TxReceipt) {
  if (receipt?.sender) {
    return 'FROM_ACCOUNT';
  }
  if (receipt?.contractId ?? receipt?.contractId ?? receipt?.to) {
    return 'FROM_CONTRACT';
  }
  if (isReturn(receipt)) {
    return 'FINAL_RESULT';
  }
  return null;
}

export class OperationDomain {
  async operationsFromTransaction(transaction: Tx) {
    if (transaction.status?.__typename !== 'SuccessStatus') return [];
    const status = transaction.status as SuccessStatus;
    const receipts = status?.receipts || [];
    return this._createOperations(receipts);
  }

  private _createOperations(receipts: TxReceipt[]) {
    if (!receipts.length) return null;
    const hasError = receipts.some(isError);
    return receipts.reduce((acc, receipt, idx) => {
      const prev = receipts[idx - 1];
      const isPrevReturnData = isReturnData(prev);
      const isFirstCall = isCall(receipt) && idx === 0;
      const isCurrentCall = isCall(receipt) && isPrevReturnData;
      const isRootCall = isFirstCall || isCurrentCall;
      const isOnlyResult = hasError && isResult(receipt);
      const isFinalReturn = isReturn(receipt);

      if (isRootCall || isOnlyResult || isFinalReturn) {
        const type = getType(receipt);
        const findNextReturnIdx = this._findNextReturnIdx(
          receipts,
          idx,
          hasError,
        );
        const nextReturnIdx = receipts.findIndex(findNextReturnIdx);
        const range = isRootCall
          ? [...receipts].slice(idx, nextReturnIdx + 1)
          : [...receipts].slice(idx);
        const items = this._createItems(range);
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        return [...acc, { type, receipts: items }] as Operation[];
      }
      return acc;
    }, [] as Operation[]);
  }

  private _createItems(receipts: TxReceipt[]) {
    const nestedIntervals = this._findNestedIntervals(receipts);
    return receipts.reduce((acc, receipt, idx) => {
      const range = nestedIntervals.find(([start, end]) => {
        return idx >= start && idx <= end;
      });
      if (range && isCall(receipt)) {
        const startRange = range[0] + 1;
        const endRange = range[1] + 1;
        const nested = [...receipts].slice(startRange, endRange);
        const items = this._createItems(nested) as OperationReceipt[];
        const next = { item: receipt, receipts: items };
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        return [...acc, next] as OperationReceipt[];
      }
      if (!range) {
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        return [...acc, { item: receipt }] as OperationReceipt[];
      }
      return acc;
    }, [] as OperationReceipt[]);
  }

  private _findNestedIntervals(receipts: TxReceipt[]) {
    return receipts.reduce((acc, r, idx) => {
      const prev = receipts[idx - 1];
      const isPrevReturn = isReturn(prev);
      const isFirstCall = isCall(r) && idx === 0;

      if (isCall(r) && !isFirstCall && !isPrevReturn) {
        const findNextReturnIdx = this._findNextReturnIdx(receipts, idx);
        const nextReturnIdx = receipts.findIndex(findNextReturnIdx);
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        return [...acc, [idx, nextReturnIdx]];
      }
      return acc;
    }, [] as number[][]);
  }

  private _findNextReturnIdx(
    receipts: TxReceipt[],
    idx: number,
    hasError?: boolean,
  ) {
    return (receipt: TxReceipt, nIdx: number) => {
      if (hasError) return nIdx > idx && isError(receipt);

      // only can find receipts after the idx inputted
      if (nIdx <= idx) return false;

      // only can find return receipts
      if (!isReturnData(receipt)) return false;

      const hasSameId = receipts[idx]?.to === receipt.id;
      return hasSameId;
    };
  }
}
