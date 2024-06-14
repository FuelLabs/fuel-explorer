import type {
  GQLOperation,
  GQLOperationReceipt,
  GQLReceipt,
  GQLTransaction,
} from '~/graphql/generated/sdk';
import { OperationEntity } from '../OperationEntity';

export class OperationsFactory {
  private operations!: GQLOperation[] | null;
  private constructor(receipts?: GQLReceipt[] | null) {
    this.operations = this.operationsFromTransaction(receipts ?? []);
  }

  static create(transaction: GQLTransaction) {
    const status = transaction?.status;
    if (status?.__typename !== 'SuccessStatus') {
      return new OperationsFactory([]);
    }
    const receipts = status?.receipts ?? [];
    return new OperationsFactory(receipts);
  }

  value() {
    return this.operations;
  }

  entities(txId: string, txHash: string) {
    return this.operations?.map((operation) =>
      OperationEntity.create(operation, txId, txHash),
    );
  }

  private operationsFromTransaction(receipts: GQLReceipt[]) {
    return this.createOperations(receipts);
  }

  private createOperations(receipts: GQLReceipt[]) {
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
        const findNextReturnIdx = this.findNextReturnIdx(
          receipts,
          idx,
          hasError,
        );
        const nextReturnIdx = receipts.findIndex(findNextReturnIdx);
        const range = isRootCall
          ? [...receipts].slice(idx, nextReturnIdx + 1)
          : [...receipts].slice(idx);
        const items = this.createItems(range);
        return [...acc, { type, receipts: items }] as GQLOperation[];
      }
      return acc;
    }, [] as GQLOperation[]);
  }

  private createItems(receipts: GQLReceipt[]) {
    const nestedIntervals = this.findNestedIntervals(receipts);
    return receipts.reduce((acc, receipt, idx) => {
      const range = nestedIntervals.find(([start, end]) => {
        return idx >= start && idx <= end;
      });
      if (range && isCall(receipt)) {
        const startRange = range[0] + 1;
        const endRange = range[1] + 1;
        const nested = [...receipts].slice(startRange, endRange);
        const items = this.createItems(nested) as GQLOperationReceipt[];
        const next = { item: receipt, receipts: items };
        return [...acc, next] as GQLOperationReceipt[];
      }
      if (!range) {
        return [...acc, { item: receipt }] as GQLOperationReceipt[];
      }
      return acc;
    }, [] as GQLOperationReceipt[]);
  }

  private findNestedIntervals(receipts: GQLReceipt[]) {
    return receipts.reduce((acc, r, idx) => {
      const prev = receipts[idx - 1];
      const isPrevReturn = isReturn(prev);
      const isFirstCall = isCall(r) && idx === 0;

      if (isCall(r) && !isFirstCall && !isPrevReturn) {
        const findNextReturnIdx = this.findNextReturnIdx(receipts, idx);
        const nextReturnIdx = receipts.findIndex(findNextReturnIdx);
        return [...acc, [idx, nextReturnIdx]];
      }
      return acc;
    }, [] as number[][]);
  }

  private findNextReturnIdx(
    receipts: GQLReceipt[],
    idx: number,
    hasError?: boolean,
  ) {
    return (receipt: GQLReceipt, nIdx: number) => {
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

function createReceiptTypeChecker(types: string[]) {
  return (receipt: GQLReceipt) =>
    types.some((type) => type === receipt?.receiptType);
}

const isCall = createReceiptTypeChecker(['CALL']);
const isReturnData = createReceiptTypeChecker(['RETURN_DATA']);
const isReturn = createReceiptTypeChecker(['RETURN']);
const isResult = createReceiptTypeChecker(['SCRIPT_RESULT']);
const isError = createReceiptTypeChecker(['PANIC', 'REVERT']);

function getType(receipt: GQLReceipt) {
  if (receipt?.sender) {
    return 'FROM_ACCOUNT';
  }
  if (receipt?.contractId ?? receipt?.contractId ?? receipt?.to) {
    return 'FROM_CONTRACT';
  }
  if (isReturn(receipt) && !receipt?.contractId) {
    return 'FINAL_RESULT';
  }
  return null;
}
