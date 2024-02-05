import type {
	Operation,
	OperationReceipt,
	TransactionItemFragment,
	TransactionReceiptFragment,
} from "../generated/types";

type Tx = TransactionItemFragment;
type TxReceipt = TransactionReceiptFragment;

function createReceiptTypeChecker(types: string[]) {
	return (receipt: TxReceipt) =>
		types.some((type) => type === receipt?.receiptType);
}

const isCall = createReceiptTypeChecker(["CALL"]);
const isReturn = createReceiptTypeChecker(["RETURN"]);
const isResult = createReceiptTypeChecker(["SCRIPT_RESULT"]);
const isError = createReceiptTypeChecker(["PANIC", "REVERT"]);

function getType(receipt: TxReceipt) {
	if (receipt?.sender) {
		return "FROM_ACCOUNT";
	}
	if (receipt?.contract?.id ?? receipt?.contractId ?? receipt?.to?.id) {
		return "FROM_CONTRACT";
	}
	if (isReturn(receipt) && !receipt?.contract?.id) {
		return "FINAL_RESULT";
	}
	return null;
}

export class OperationDomain {
	constructor() {}

	async operationsFromTransaction(transaction: Tx) {
		const receipts = transaction.receipts || [];
		return this._createOperations(receipts);
	}

	private _createOperations(receipts: TxReceipt[]) {
		if (!receipts.length) return null;
		const hasError = receipts.some(isError);
		return receipts.reduce((acc, receipt, idx) => {
			const last = receipts[idx - 1];
			const isLastReturn = isReturn(last);
			const isFirstCall = isCall(receipt) && idx === 0;
			const isCurrentCall = isCall(receipt) && isLastReturn;
			const findNextReturnIdx = this._findNextReturnIdx(receipt, idx, hasError);
			const nextReturnIdx = receipts.findIndex(findNextReturnIdx);
			const isTypeCall = isFirstCall || isCurrentCall;
			const isOnlyResult = hasError && isResult(receipt);
			const isFinalReturn = isReturn(receipt) && !receipt.contract?.id;

			if (isTypeCall || isOnlyResult || isFinalReturn) {
				const type = getType(receipt);
				const range = isTypeCall
					? [...receipts].slice(idx, nextReturnIdx + 1)
					: [...receipts].slice(idx);
				const items = this._createItems(range);
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
				return [...acc, next] as OperationReceipt[];
			}
			if (!range) {
				return [...acc, { item: receipt }] as OperationReceipt[];
			}
			return acc;
		}, [] as OperationReceipt[]);
	}

	private _findNestedIntervals(receipts: TxReceipt[]) {
		return receipts.reduce((acc, r, idx) => {
			const last = receipts[idx - 1];
			const isLastReturn = isReturn(last);
			const isFirstCall = isCall(r) && idx === 0;
			const findNextReturnIdx = this._findNextReturnIdx(r, idx);
			const nextReturnIdx = receipts.findIndex(findNextReturnIdx);

			if (isCall(r) && !isFirstCall && !isLastReturn) {
				return [...acc, [idx, nextReturnIdx]];
			}
			return acc;
		}, [] as number[][]);
	}

	private _findNextReturnIdx(
		current: TxReceipt,
		idx: number,
		hasError?: boolean,
	) {
		return (receipt: TxReceipt, nIdx: number) => {
			if (hasError) return nIdx > idx && isError(receipt);
			const hasSameId = current.to?.id === receipt.contract?.id;
			return nIdx > idx && isReturn(receipt) && hasSameId;
		};
	}
}
