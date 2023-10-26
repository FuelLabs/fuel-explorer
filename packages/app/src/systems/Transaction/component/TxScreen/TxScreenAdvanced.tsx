'use client';

import type { Maybe } from '@fuel-explorer/graphql';
import { Button, Card, Flex, ScrollArea, Text, VStack } from '@fuels/ui';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import CopyButton from '~/systems/Core/components/CopyButton/CopyButton';
import { JsonViewer } from '~/systems/Core/components/JsonViewer/JsonViewer';

import type { TransactionNode } from '../../types';

type TxScreenProps = {
  transaction?: Maybe<TransactionNode>;
};

export function TxScreenAdvanced({ transaction: tx }: TxScreenProps) {
  const [compact, setCompact] = useState<boolean>(true);
  const classes = styles();
  if (!tx) return null;

  return (
    <VStack gap="6" data-compact={compact} className={classes.root()}>
      <Card className="p-0 flex-1 gap-0">
        <Card.Header className={classes.cardHeader()}>
          <Flex align="center" justify="between">
            <Text size="1" weight="bold">
              JSON
            </Text>
            <CopyButton size="1" value={JSON.stringify(tx, null, 2)} />
          </Flex>
        </Card.Header>
        <ScrollArea className="flex-1">
          <JsonViewer data={tx} />
        </ScrollArea>
        <Card.Footer className={classes.cardFooter()}>
          <Button
            variant="link"
            size="1"
            color="gray"
            onClick={() => setCompact(!compact)}
          >
            Show {compact ? 'more' : 'less'}
            <IconChevronDown size={13} className={classes.chevronIcon()} />
          </Button>
        </Card.Footer>
      </Card>
    </VStack>
  );
}

const styles = tv({
  slots: {
    root: [
      'group',
      'data-[compact=true]:max-h-[440px] data-[compact=true]:svg:-rotate-180',
    ],
    cardHeader: 'border-b border-card-border py-3 flex-none',
    cardFooter:
      'border-t border-card-border py-3 self-stretch flex-none justify-center',
    chevronIcon: 'transition-transform group-data-[compact=true]:-rotate-180',
  },
});
