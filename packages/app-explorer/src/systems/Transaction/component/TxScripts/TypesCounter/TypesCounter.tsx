import { GQLReceiptType } from '@fuel-explorer/graphql/sdk';
import { useMemo } from 'react';
import { CountReceipt } from '~/systems/Transaction/component/TxScripts/CountReceipt';
import type { TypesCounterProps } from './types';

const EMPTY_ARRAY = [] as NonNullable<TypesCounterProps['receipts']>;

export function TypesCounter({ receipts: items }: TypesCounterProps) {
  const counts = useMemo(
    () =>
      (items ?? EMPTY_ARRAY).reduce(
        (acc, receipt) => {
          switch (receipt?.receiptType) {
            case GQLReceiptType.Call:
              acc.calls += 1;
              break;
            case GQLReceiptType.Transfer:
            case GQLReceiptType.TransferOut:
              acc.transfers += 1;
              break;
            case GQLReceiptType.Mint:
              acc.mints += 1;
              break;
            case GQLReceiptType.Burn:
              acc.burns += 1;
              break;
            case GQLReceiptType.MessageOut:
              acc.messages += 1;
              break;
            case GQLReceiptType.Return:
            case GQLReceiptType.ReturnData:
              acc.returns += 1;
              break;
            case GQLReceiptType.ScriptResult:
              acc.results += 1;
              break;
            case GQLReceiptType.Panic:
            case GQLReceiptType.Revert:
              acc.errors += 1;
              break;
            case GQLReceiptType.Log:
            case GQLReceiptType.LogData:
              acc.logs += 1;
              break;
            default:
              break;
          }
          return acc;
        },
        {
          calls: 0,
          transfers: 0,
          mints: 0,
          burns: 0,
          messages: 0,
          returns: 0,
          results: 0,
          errors: 0,
          logs: 0,
        },
      ),
    [items],
  );

  return (
    <div className="flex flex-col gap-0 text-sm font-mono w-full">
      {counts.calls > 0 && <CountReceipt num={counts.calls} op="call" />}
      {counts.logs > 0 && <CountReceipt num={counts.logs} op="log" />}
      {counts.transfers > 0 && (
        <CountReceipt num={counts.transfers} op="transfer" />
      )}
      {counts.messages > 0 && (
        <CountReceipt num={counts.messages} op="message" />
      )}
      {counts.mints > 0 && <CountReceipt num={counts.mints} op="mint" />}
      {counts.burns > 0 && <CountReceipt num={counts.burns} op="burn" />}
      {counts.returns > 0 && <CountReceipt num={counts.returns} op="return" />}
      {counts.results > 0 && <CountReceipt num={counts.results} op="result" />}
      {counts.errors > 0 && <CountReceipt num={counts.errors} op="error" />}
    </div>
  );
}
