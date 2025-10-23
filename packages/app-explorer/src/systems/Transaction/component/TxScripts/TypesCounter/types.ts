import type {
  GQLTransactionReceiptFragment,
  Maybe,
} from '@fuel-explorer/graphql/sdk';

export interface TypesCounterProps {
  receipts?: Maybe<GQLTransactionReceiptFragment[]>;
}
