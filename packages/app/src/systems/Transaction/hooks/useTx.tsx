import { bn } from 'fuels';
import { useMemo } from 'react';

import {
  type TxItem,
  type TransactionNode,
  type TxType,
  type TxStatus,
  TxAccountTypeEnum,
  TxTypeEnum,
} from '../types';

function parseType(transaction: TransactionNode): TxType {
  if (transaction.isMint) {
    return 'Mint';
  }
  return 'ContractCall';
}

function parseStatus(transaction: TransactionNode): TxStatus {
  const typename = transaction.status?.__typename;
  if (typename === 'SuccessStatus') {
    return 'Success';
  }
  if (typename === 'FailureStatus') {
    return 'Failure';
  }
  return 'Submitted';
}

function parseTime(transaction: TransactionNode): string {
  const status = transaction.status as any;
  return status?.time ?? 0;
}

function parseTotalOperations(transaction: TransactionNode): number {
  if (transaction.isMint) return 1;
  return transaction.inputs?.length ?? 0;
}

function parseTotalAccounts(transaction: TransactionNode): number {
  if (transaction.isMint) return 1;
  const ids = transaction.inputs?.flatMap((input) => {
    const typename = input?.__typename;
    if (typename === 'InputCoin') {
      return input.owner;
    }
    if (typename === 'InputMessage') {
      return [input.sender, input.recipient];
    }
    if (typename === 'InputContract') {
      return input.contract.id;
    }
  });
  return ids?.length ?? 0;
}

function parseTotalAssets(transaction: TransactionNode): number {
  if (transaction.isMint) return 1;
  return transaction.inputAssetIds?.length ?? 0;
}

function parseGasUsed(transaction: TransactionNode) {
  const receipts = transaction.receipts ?? [];
  return receipts.reduce((acc, receipt) => {
    return acc.add(receipt.gasUsed);
  }, bn(0));
}

export function useTx(transaction: TransactionNode): TxItem {
  const type = parseType(transaction);
  const status = parseStatus(transaction);
  const timestamp = parseTime(transaction);
  const totalOperations = parseTotalOperations(transaction);
  const totalAccounts = parseTotalAccounts(transaction);
  const totalAssets = parseTotalAssets(transaction);
  const gasUsed = parseGasUsed(transaction);
  const title = useMemo(
    () => TxTypeEnum[type] || TxAccountTypeEnum[type],
    [type],
  );

  return {
    title,
    type,
    status,
    transaction,
    totalOperations,
    gasUsed,
    timestamp,
    totalAssets,
    totalAccounts,
  };
}
