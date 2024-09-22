import type { GQLReceipt } from '@fuel-explorer/graphql/sdk';

export enum ReceiptHeaderOperationDataType {
  DEFAULT = 'DEFAULT',
  HEX_ADDRESS = 'HEX_ADDRESS',
  AMOUNT = 'AMOUNT',
}

interface ReceiptHeaderOperationBase {
  label?: string;
  type?: Omit<
    ReceiptHeaderOperationDataType,
    ReceiptHeaderOperationDataType.AMOUNT
  >;
  requiredField?: keyof GQLReceipt;
  fieldFallback?: keyof GQLReceipt;
  hrefFactory?: (value: string) => string;
}

export interface ReceiptHeaderOperationAmount
  extends ReceiptHeaderOperationBase {
  label?: never;
  type: ReceiptHeaderOperationDataType.AMOUNT;
  field?: keyof GQLReceipt;
  hrefFactory?: never;
}

interface ReceiptHeaderDefaultOperations extends ReceiptHeaderOperationBase {
  field: keyof GQLReceipt;
}

export type ReceiptHeaderOperation =
  | ReceiptHeaderDefaultOperations
  | ReceiptHeaderOperationAmount;
