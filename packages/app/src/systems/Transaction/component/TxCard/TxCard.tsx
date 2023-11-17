'use client';

import { bn } from '@fuel-ts/math';
import {
  Card,
  Text,
  Badge,
  createComponent,
  VStack,
  HStack,
  withNamespace,
  Box,
  shortAddress,
  cx,
} from '@fuels/ui';
import type { BaseProps, CardProps } from '@fuels/ui';
import { IconGasStation } from '@tabler/icons-react';
import NextLink from 'next/link';
import { LoadingBox } from '~/systems/Core/components/LoadingBox/LoadingBox';
import { LoadingWrapper } from '~/systems/Core/components/LoadingWrapper/LoadingWrapper';

import type { TransactionNode } from '../../types';
import { TX_INTENT_MAP } from '../TxIcon/TxIcon';

type TxCardProps = BaseProps<{
  transaction: TransactionNode;
  isLoading?: boolean;
}>;

const TxCardRoot = createComponent<TxCardProps, typeof Card>({
  id: 'TxCard',
  render: (
    _,
    { transaction: tx, className, isLoading, ...props }: TxCardProps,
  ) => {
    const fee = bn(tx.fee);

    return (
      <NextLink href={`/tx/${tx.id}`}>
        <Card {...props} className={cx(className)}>
          <Card.Body className="flex flex-col gap-4 laptop:flex-row laptop:justify-between">
            <Box className="flex gap-3">
              <LoadingWrapper
                isLoading={isLoading}
                loadingEl={<LoadingBox className="w-16 h-6" />}
                regularEl={
                  <Badge color="gray" variant="ghost">
                    {tx.title}
                  </Badge>
                }
              />
              <Text className="text-gray-11 text-md font-medium">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={<LoadingBox className="w-32 h-6" />}
                  regularEl={shortAddress(tx.id)}
                />
              </Text>
            </Box>
            <Box className="flex flex-wrap gap-3 items-center laptop:flex-nowrap">
              {fee.gt(0) && (
                <Text
                  className="text-sm order-3 laptop:order-none"
                  leftIcon={IconGasStation}
                >
                  {bn(tx.fee).format()} ETH
                </Text>
              )}
              <LoadingWrapper
                isLoading={isLoading}
                loadingEl={<LoadingBox className="w-16 h-6" />}
                regularEl={
                  <Badge
                    color={TX_INTENT_MAP[tx.statusType as string]}
                    variant="ghost"
                  >
                    {tx.statusType}
                  </Badge>
                }
              />
              <Text className="text-sm">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={<LoadingBox className="w-32 h-6" />}
                  regularEl={tx.time?.fromNow}
                />
              </Text>
            </Box>
          </Card.Body>
        </Card>
      </NextLink>
    );
  },
});

const TxCardSkeleton = createComponent<CardProps, typeof Card>({
  id: 'TxCardLoader',
  render: (_, props) => {
    return (
      <Card {...props}>
        <Card.Header>
          <HStack>
            <LoadingBox className="h-14 w-14" />
            <LoadingBox className="h-14 flex-1" />
          </HStack>
        </Card.Header>
        <Card.Body>
          <VStack gap="2">
            <LoadingBox className="h-6 w-full" />
            <LoadingBox className="h-6 w-full" />
            <LoadingBox className="h-6 w-full" />
          </VStack>
        </Card.Body>
      </Card>
    );
  },
});

export const TxCard = withNamespace(TxCardRoot, {
  Skeleton: TxCardSkeleton,
});
