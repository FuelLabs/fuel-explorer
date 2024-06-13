import type { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import type {
  GQLOperation,
  GQLOperationReceipt,
  GQLReceipt,
} from '~/graphql/generated/sdk';

export class OperationsFactory {
  private operations!: GQLOperation[] | null;
  private constructor(receipts?: GQLReceipt[] | null) {
    this.operations = this.operationsFromTransaction(receipts ?? []);
  }

  static create(transaction: TransactionEntity) {
    return new OperationsFactory(transaction.receipts);
  }

  value() {
    return this.operations;
  }

  private operationsFromTransaction(receipts: GQLReceipt[]) {
    return this.createOperations(receipts);
  }

  private createOperations(receipts: GQLReceipt[]) {
    if (!receipts.length) return null;
    const hasError = receipts.some(isError);
    return receipts.reduce((acc, receipt, idx) => {
      const last = receipts[idx - 1];
      const isLastReturn = isReturn(last);
      const isFirstCall = isCall(receipt) && idx === 0;
      const isCurrentCall = isCall(receipt) && isLastReturn;
      const findNextReturnIdx = this.findNextReturnIdx(receipt, idx, hasError);
      const nextReturnIdx = receipts.findIndex(findNextReturnIdx);
      const isTypeCall = isFirstCall || isCurrentCall;
      const isOnlyResult = hasError && isResult(receipt);
      const isFinalReturn = isReturn(receipt) && !receipt.contractId;

      if (isTypeCall || isOnlyResult || isFinalReturn) {
        const type = getType(receipt);
        const range = isTypeCall
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
      const last = receipts[idx - 1];
      const isLastReturn = isReturn(last);
      const isFirstCall = isCall(r) && idx === 0;
      const findNextReturnIdx = this.findNextReturnIdx(r, idx);
      const nextReturnIdx = receipts.findIndex(findNextReturnIdx);

      if (isCall(r) && !isFirstCall && !isLastReturn) {
        return [...acc, [idx, nextReturnIdx]];
      }
      return acc;
    }, [] as number[][]);
  }

  private findNextReturnIdx(
    current: GQLReceipt,
    idx: number,
    hasError?: boolean,
  ) {
    return (receipt: GQLReceipt, nIdx: number) => {
      if (hasError) return nIdx > idx && isError(receipt);
      const hasSameId = current.to === receipt.contractId;
      return nIdx > idx && isReturn(receipt) && hasSameId;
    };
  }
}

function createReceiptTypeChecker(types: string[]) {
  return (receipt: GQLReceipt) =>
    types.some((type) => type === receipt?.receiptType);
}

const isCall = createReceiptTypeChecker(['CALL']);
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
