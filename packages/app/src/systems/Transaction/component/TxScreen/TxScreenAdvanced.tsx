'use client';

import type { Maybe } from '@fuel-explorer/graphql';
import { Card, Flex, Text, VStack } from '@fuels/ui';
import CopyButton from '~/systems/Core/components/CopyButton/CopyButton';
import { JsonViewer } from '~/systems/Core/components/JsonViewer/JsonViewer';

import type { TransactionNode } from '../../types';

type TxScreenProps = {
  transaction?: Maybe<TransactionNode>;
};

export function TxScreenAdvanced({ transaction: tx }: TxScreenProps) {
  if (!tx) return null;

  return (
    <VStack gap="6" className="min-h-[75vh]">
      <Card className="p-0">
        <Card.Header className="border-b border-card-border py-3">
          <Flex align="center" justify="between">
            <Text size="1" weight="bold">
              JSON
            </Text>
            <CopyButton size="1" value={JSON.stringify(tx, null, 2)} />
          </Flex>
        </Card.Header>
        <Card.Body>
          <JsonViewer data={tx} />
        </Card.Body>
        <Card.Footer className="border-t border-card-border py-3 self-stretch">
          Test
        </Card.Footer>
      </Card>
    </VStack>
  );
}
