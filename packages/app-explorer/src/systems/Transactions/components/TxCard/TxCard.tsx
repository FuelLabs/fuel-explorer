import { bn } from '@fuel-ts/math';
import type { BaseProps } from '@fuels/ui';
import {
  Badge,
  Box,
  Card,
  LoadingBox,
  LoadingWrapper,
  Text,
  cx,
  shortAddress,
} from '@fuels/ui';
import { IconGasStation } from '@tabler/icons-react';
import Link from 'next/link';
import { Routes } from '~/routes';

import type { GQLRecentTransactionsQuery } from '@fuel-explorer/graphql';
import { isValidAddress } from '~/systems/Core/utils/address';
import { TX_INTENT_MAP } from '../../../Transaction/component/TxIcon/TxIcon';

type TxCardProps = BaseProps<{
  transaction: GQLRecentTransactionsQuery['transactions']['nodes'][number];
  isLoading?: boolean;
}>;

export function TxCard({
  transaction: tx,
  className,
  isLoading,
  ...props
}: TxCardProps) {
  const fee = bn(tx.gasCosts?.fee ?? 0);
  const isValidTxID = isValidAddress(tx.id);

  return (
    <Link scroll={true} href={Routes.txSimple(tx.id)} prefetch={isValidTxID}>
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
                {bn(tx.gasCosts?.fee ?? 0).format()} ETH
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
    </Link>
  );
}
