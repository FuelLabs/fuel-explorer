'use client';

import type { Maybe } from '@fuel-explorer/graphql';
import { Card, VStack } from '@fuels/ui';
import { JsonViewer } from '~/systems/Core/components/JsonViewer/JsonViewer';

import type { TransactionNode } from '../../types';

type TxScreenProps = {
  transaction?: Maybe<TransactionNode>;
};

export function TxScreenAdvanced({ transaction: tx }: TxScreenProps) {
  if (!tx) return null;

  return (
    <VStack gap="6" className="min-h-[75vh]">
      <Card>
        <Card.Body>
          <JsonViewer data={tx} />
        </Card.Body>
      </Card>
    </VStack>
  );
}
