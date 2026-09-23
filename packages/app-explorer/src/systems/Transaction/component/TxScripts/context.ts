import type { Maybe } from '@fuel-explorer/graphql/sdk';
import type { BaseProps } from '@fuels/ui';
import { createContext } from 'react';
import type { DecodedOperationReceipt } from '~/systems/Transaction/utils/abiDecoder';

export type ReceiptItemContext = BaseProps<{
  receipt?: Maybe<DecodedOperationReceipt>;
  isIndented?: boolean;
  hasPanic?: boolean;
}>;

export const ReceiptContext = createContext<ReceiptItemContext>(
  {} as ReceiptItemContext,
);
