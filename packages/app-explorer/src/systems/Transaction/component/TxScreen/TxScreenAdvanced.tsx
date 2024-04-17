'use client';

import type { GQLTransactionDetailsFragment } from '@fuel-explorer/graphql';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

type TxScreenProps = {
  transaction?: GQLTransactionDetailsFragment;
};

export function TxScreenAdvanced({ transaction: tx }: TxScreenProps) {
  if (!tx) return null;
  return <CodeBlock value={tx} type="json" />;
}
