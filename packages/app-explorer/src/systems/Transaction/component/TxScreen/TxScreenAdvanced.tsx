import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

import type { TransactionNode } from '../../types';

type TxScreenProps =
  | {
      transaction: TransactionNode;
      isLoading?: false;
    }
  | {
      transaction?: TransactionNode;
      isLoading: true;
    };

export function TxScreenAdvanced({
  transaction: tx,
  isLoading,
}: TxScreenProps) {
  return <CodeBlock value={tx || {}} type="json" isLoading={isLoading} />;
}
