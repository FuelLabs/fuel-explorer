import type { BaseProps } from '@fuels/ui';
import { TransactionNode } from '~/systems/Transaction/types';

export type ScriptsContentProps = BaseProps<{
  tx: TransactionNode | undefined;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}>;
