import type { BaseProps } from '@fuels/ui';
import { TransactionNode } from '~/systems/Transaction/types';

export type TxScriptsProps = BaseProps<{
  tx: TransactionNode | undefined;
  isLoading?: boolean;
}>;
