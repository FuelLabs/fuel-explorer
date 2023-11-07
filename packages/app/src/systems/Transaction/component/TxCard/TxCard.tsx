'use client';

import { bn } from '@fuel-ts/math';
import {
  Flex,
  Card,
  EntityItem,
  Text,
  Badge,
  createComponent,
  VStack,
  HStack,
} from '@fuels/ui';
import type { BaseProps, CardProps } from '@fuels/ui';
import {
  IconCoins,
  IconGasStation,
  IconTransfer,
  IconUsers,
} from '@tabler/icons-react';
import NextLink from 'next/link';
import { tv } from 'tailwind-variants';

import type { TransactionNode, TxStatus } from '../../types';
import { TX_INTENT_MAP, TxIcon } from '../TxIcon/TxIcon';

type TxCardProps = BaseProps<{
  transaction: TransactionNode;
}>;

export const TxCard = createComponent<TxCardProps, typeof Card>({
  id: 'TxCard',
  render: (_, { transaction: tx, className, ...props }: TxCardProps) => {
    const classes = styles();
    const title = tx.title as string;
    return (
      <NextLink href={`/tx/${tx.id}`}>
        <Card {...props} className={classes.root({ className })}>
          <Card.Header>
            <EntityItem>
              <EntityItem.Slot>
                <TxIcon
                  status={tx.isPredicate ? 'Info' : (tx.statusType as TxStatus)}
                  type={title}
                />
              </EntityItem.Slot>
              <EntityItem.Info id={tx.id} title={title} />
            </EntityItem>
          </Card.Header>
          <Card.Body className={classes.body()}>
            <Flex className={classes.row()} justify="between">
              <Text leftIcon={IconUsers}>{tx.totalAccounts} accounts</Text>
              {tx.isPredicate && (
                <Text className={classes.small()}>
                  <Badge color="blue">Predicate</Badge>
                </Text>
              )}
            </Flex>
            <Flex className={classes.row()} justify="between">
              <Text leftIcon={IconTransfer}>
                {tx.totalOperations} operations
              </Text>
              <Text className={classes.small()}>
                <Badge color={TX_INTENT_MAP[tx.statusType as string]}>
                  {tx.statusType}
                </Badge>
              </Text>
            </Flex>
            <Flex className={classes.row()} justify="between">
              <Text leftIcon={IconCoins}>{tx.totalAssets} assets</Text>
              <Text className={classes.small()} leftIcon={IconGasStation}>
                {bn(tx.gasUsed).format()} ETH
              </Text>
            </Flex>
          </Card.Body>
        </Card>
      </NextLink>
    );
  },
});

export const TxCardLoader = createComponent<CardProps, typeof Card>({
  id: 'TxCardLoader',
  render: (_, props) => {
    return (
      <Card {...props}>
        <Card.Header>
          <HStack>
            <div
              className={loader({ className: 'h-14 w-14 bg-gray-3 rounded' })}
            />
            <div
              className={loader({ className: 'h-14 flex-1 bg-gray-3 rounded' })}
            />
          </HStack>
        </Card.Header>
        <Card.Body>
          <VStack gap="2">
            <div
              className={loader({ className: 'h-6 w-full bg-gray-3 rounded' })}
            />
            <div
              className={loader({ className: 'h-6 w-full bg-gray-3 rounded' })}
            />
            <div
              className={loader({ className: 'h-6 w-full bg-gray-3 rounded' })}
            />
          </VStack>
        </Card.Body>
      </Card>
    );
  },
});

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

const loader = tv({
  base: [
    'isolate overflow-hidden shadow-xl shadow-black/5 before:border-t before:border-gray-5',
    'relative before:absolute before:inset-0 before:-translate-x-full',
    'before:animate-[shimmer_2s_infinite]',
    'before:block before:content-[""] before:w-full before:h-full',
    'before:bg-gradient-to-r',
    'before:from-transparent before:via-gray-4 before:to-transparent',
  ],
});
