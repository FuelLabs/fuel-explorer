import { GQLReceiptType } from '@fuel-explorer/graphql/sdk';
import { CountReceipt } from '~/systems/Transaction/component/TxScripts/CountReceipt';
import type { TypesCounterProps } from './types';

export function TypesCounter({ receipts: items = [] }: TypesCounterProps) {
  const receipts = items ?? [];
  const calls = receipts.filter((i) => i?.receiptType === GQLReceiptType.Call);
  const transfers = receipts.filter(
    (i) =>
      i?.receiptType === GQLReceiptType.Transfer ||
      i?.receiptType === GQLReceiptType.TransferOut,
  );
  const mints = receipts.filter((i) => i?.receiptType === GQLReceiptType.Mint);
  const burns = receipts.filter((i) => i?.receiptType === GQLReceiptType.Burn);
  const messages = receipts.filter(
    (i) => i?.receiptType === GQLReceiptType.MessageOut,
  );
  const returns = receipts.filter(
    (i) =>
      i?.receiptType === GQLReceiptType.Return ||
      i?.receiptType === GQLReceiptType.ReturnData,
  );
  const results = receipts.filter(
    (i) => i?.receiptType === GQLReceiptType.ScriptResult,
  );
  const errors = receipts.filter(
    (i) =>
      i?.receiptType === GQLReceiptType.Panic ||
      i?.receiptType === GQLReceiptType.Revert,
  );
  const logs = receipts.filter(
    (i) =>
      i?.receiptType === GQLReceiptType.Log ||
      i?.receiptType === GQLReceiptType.LogData,
  );
  return (
    <div className="flex flex-col gap-0 text-sm font-mono w-full">
      {Boolean(calls.length) && <CountReceipt num={calls.length} op="Call" />}
      {Boolean(logs.length) && <CountReceipt num={logs.length} op="Log" />}
      {Boolean(transfers.length) && (
        <CountReceipt num={transfers.length} op="Transfer" />
      )}
      {Boolean(messages.length) && (
        <CountReceipt num={messages.length} op="Message" />
      )}
      {Boolean(mints.length) && <CountReceipt num={mints.length} op="Mint" />}
      {Boolean(burns.length) && <CountReceipt num={burns.length} op="Burn" />}
      {Boolean(returns.length) && (
        <CountReceipt num={returns.length} op="Return" />
      )}
      {Boolean(results.length) && (
        <CountReceipt num={results.length} op="Result" />
      )}
      {Boolean(errors.length) && (
        <CountReceipt num={errors.length} op="Error" />
      )}
    </div>
  );
}
