'use client';

import {
  IconClockHour1,
  IconCoins,
  IconGasStation,
  IconTransfer,
  IconUsers,
} from '@tabler/icons-react';
import { bn } from 'fuels';
import { Flex } from 'pn-ui-primitives/Box';
import { Card } from 'pn-ui-primitives/Card';
import { Text } from 'pn-ui-primitives/Text';
import type { BaseProps } from 'pn-ui-primitives/dist/utils/types';
import { tv } from 'tailwind-variants';
import { fromNow } from '~/systems/Core/utils/dayjs';

import { useTx } from '../../hooks/useTx';
import type { TransactionNode } from '../../types';
import { TxTitle } from '../TxTitle/TxTitle';

type TxCardProps = BaseProps<{
  transaction: TransactionNode;
}>;

export function TxCard({ transaction, className, ...props }: TxCardProps) {
  const classes = styles();
  const tx = useTx(transaction);
  return (
    <Card {...props} className={classes.root({ className })}>
      <TxTitle
        type={tx.type}
        status={tx.status}
        txHash={tx.transaction?.id}
        className={classes.title()}
      />
      <Card.Body className={classes.body()}>
        <Flex justify="between" className={classes.row()}>
          <Text leftIcon={IconUsers}>{tx.totalAccounts} accounts</Text>
        </Flex>
        <Flex justify="between" className={classes.row()}>
          <Text leftIcon={IconTransfer}>{tx.totalOperations} operations</Text>
          <Text leftIcon={IconClockHour1} className={classes.small()}>
            {fromNow(tx.timestamp)}
          </Text>
        </Flex>
        <Flex justify="between" className={classes.row()}>
          <Text leftIcon={IconCoins}>{tx.totalAssets} assets</Text>
          <Text leftIcon={IconGasStation} className={classes.small()}>
            {bn(tx.gasUsed).format({ units: 3 })} ETH
          </Text>
        </Flex>
      </Card.Body>
    </Card>
  );
}

const styles = tv({
  slots: {
    root: 'py-0 gap-0 border border-card-border transition-all duration-200 ease-out hover:border-border-hover',
    title: 'py-4 px-4',
    body: 'border-t border-card-border py-4 px-4',
    row: 'items-center py-px [.fuel-Text:first-of-type]:flex-1',
    small: 'text-sm',
  },
});
