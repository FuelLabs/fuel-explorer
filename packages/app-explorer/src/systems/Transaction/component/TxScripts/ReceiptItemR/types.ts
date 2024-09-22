import type { GQLOperationReceipt } from '@fuel-explorer/graphql';

export interface ReceiptItemRProps {
  receipts?: GQLOperationReceipt[];
  hasPanic: boolean;
}
