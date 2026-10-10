import {
  GQLReceiptType,
  type GQLTransactionReceiptFragment,
  type Maybe,
} from '@fuel-explorer/graphql/sdk';
import type { TxChipKind } from '../../TxItem/TxChip';
import { RETURN_TYPES } from './constants';

export function getBadgeKind(
  hasError: boolean,
  receipt?: Maybe<GQLTransactionReceiptFragment>,
): TxChipKind {
  const type = receipt?.receiptType ?? 'UNKNOWN';
  if (type === GQLReceiptType.Revert || type === GQLReceiptType.Panic) {
    return 'failed';
  }
  if (
    RETURN_TYPES.some((t) => t === type) &&
    !hasError &&
    !receipt?.contractId
  ) {
    return 'success';
  }
  return 'pending';
}
