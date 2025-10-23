import {
  GQLReceiptType,
  type GQLTransactionReceiptFragment,
  type Maybe,
} from '@fuel-explorer/graphql/sdk';
import { RETURN_TYPES } from './constants';

export function getBadgeColor(
  hasError: boolean,
  receipt?: Maybe<GQLTransactionReceiptFragment>,
) {
  const type = receipt?.receiptType ?? 'UNKNOWN';
  if (type === GQLReceiptType.Revert || type === GQLReceiptType.Panic) {
    return 'red';
  }
  if (
    RETURN_TYPES.some((t) => t === type) &&
    !hasError &&
    !receipt?.contractId
  ) {
    return 'green';
  }
  return 'gray';
}
