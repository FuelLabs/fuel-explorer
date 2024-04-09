'use client';

import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

import type { TransactionNode } from '../../types';

type TxScreenProps = {
  transaction?: TransactionNode;
};

export function TxScreenAdvanced({ transaction: tx }: TxScreenProps) {
  if (!tx) return null;
  return <CodeBlock value={tx} type="json" />;
}
