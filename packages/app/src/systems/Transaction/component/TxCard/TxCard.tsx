'use client';

import { bn } from '@fuel-ts/math';
import { Flex, Card, EntityItem, Text } from '@fuels/ui';
import type { BaseProps } from '@fuels/ui';
import {
  IconClockHour1,
  IconCoins,
  IconGasStation,
  IconTransfer,
  IconUsers,
} from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
import { fromNow } from '~/systems/Core/utils/dayjs';

import type { TransactionNode, TxStatus } from '../../types';
import { TxIcon } from '../TxIcon/TxIcon';

type TxCardProps = BaseProps<{
  transaction: TransactionNode;
}>;

export function TxCard({ transaction: tx, className, ...props }: TxCardProps) {
  const classes = styles();
  const title = tx.title as string;
  const time = fromNow(tx.time as string);
  return (
    <Card {...props} className={classes.root({ className })}>
      <Card.Header>
        <EntityItem>
          <EntityItem.Slot>
            <TxIcon status={tx.statusType as TxStatus} type={title} />
          </EntityItem.Slot>
          <EntityItem.Info id={tx.id} title={title} />
        </EntityItem>
      </Card.Header>
      <Card.Body className={classes.body()}>
        <Flex className={classes.row()} justify="between">
          <Text leftIcon={IconUsers}>{tx.totalAccounts} accounts</Text>
        </Flex>
        <Flex className={classes.row()} justify="between">
          <Text leftIcon={IconTransfer}>{tx.totalOperations} operations</Text>
          <Text className={classes.small()} leftIcon={IconClockHour1}>
            {time}
          </Text>
        </Flex>
        <Flex className={classes.row()} justify="between">
          <Text leftIcon={IconCoins}>{tx.totalAssets} assets</Text>
          <Text className={classes.small()} leftIcon={IconGasStation}>
            {bn(tx.gasUsed).format({ units: 3 })} ETH
          </Text>
        </Flex>
      </Card.Body>
    </Card>
  );
}

const styles = tv({
  slots: {
    root: [
      'py-0 gap-0 border border-card-border transition-all',
      'duration-200 ease-out hover:border-border-hover',
      'fuel-[CardHeader]:py-4',
    ],
    body: 'border-t border-card-border py-4 px-4',
    row: 'items-center py-px [.fuel-Text:first-of-type]:flex-1 gap-3',
    small: 'text-sm',
  },
});
