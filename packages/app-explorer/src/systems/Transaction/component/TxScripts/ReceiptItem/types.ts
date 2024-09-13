import type { GQLOperationReceipt, Maybe } from '@fuel-explorer/graphql/sdk';
import type { BaseProps } from '@fuels/ui';

export type ReceiptItemProps = BaseProps<{
  receipt?: Maybe<GQLOperationReceipt>;
  isIndented?: boolean;
  hasPanic?: boolean;
}>;
