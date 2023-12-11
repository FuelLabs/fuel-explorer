'use client';

import { bn } from '@fuel-ts/math';
import {
  Card,
  Text,
  Badge,
  Box,
  shortAddress,
  cx,
  LoadingBox,
  LoadingWrapper,
} from '@fuels/ui';
import type { BaseProps } from '@fuels/ui';
import { IconGasStation } from '@tabler/icons-react';
import NextLink from 'next/link';

import type { TransactionNode } from '../../types';
import { TX_INTENT_MAP } from '../TxIcon/TxIcon';

type TxCardProps = BaseProps<{
  transaction: TransactionNode;
  isLoading?: boolean;
}>;

export function TxCard({
  transaction: tx,
  className,
  isLoading,
  ...props
}: TxCardProps) {
  const fee = bn(tx.fee);

  return (
    <NextLink scroll href={`/tx/${tx.id}/simple`}>
      <Card {...props} className={cx(className)}>
        <Card.Body className="flex flex-col gap-4 laptop:flex-row laptop:justify-between">
          <Box className="flex gap-3 h-[26px]">
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
                regularEl={
                  <span className="font-mono">{shortAddress(tx.id)}</span>
                }
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
}
