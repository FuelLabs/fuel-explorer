import type { GQLOperationReceipt, Maybe } from '@fuel-explorer/graphql/sdk';
import type { BaseProps } from '@fuels/ui';
import { createContext } from 'react';

export type ReceiptItemContext = BaseProps<{
  receipt?: Maybe<GQLOperationReceipt>;
  isIndented?: boolean;
  hasPanic?: boolean;
}>;

export const ReceiptContext = createContext<ReceiptItemContext>(
  {} as ReceiptItemContext,
);
