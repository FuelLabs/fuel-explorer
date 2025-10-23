import { bn } from '@fuel-ts/math';
import type { BaseProps } from '@fuels/ui';
import {
  Badge,
  Box,
  Card,
  HStack,
  LoadingBox,
  LoadingWrapper,
  Text,
  cx,
  shortAddress,
} from '@fuels/ui';
import { IconGasStation } from '@tabler/icons-react';
import { Routes as CommonRoutes } from 'app-commons';
import { Link } from 'react-router-dom';

import type { GQLRecentTransactionsQuery } from '@fuel-explorer/graphql';
import { memo, useMemo } from 'react';
import { isValidAddress } from '~/systems/Core/utils/address';
import { TxFullDateTimestamp } from '~/systems/Transaction/component/TxFullDateTimestamp/TxFullDateTimestamp';
import type { TxStatus } from '~/systems/Transaction/types';
import { TX_INTENT_MAP } from '../../../Transaction/component/TxIcon/TxIcon';

type TxCardProps = BaseProps<{
  transaction: GQLRecentTransactionsQuery['transactions']['nodes'][number];
  isLoading?: boolean;
  onPrefetch?: () => void;
}>;

function _TxCard({
  transaction: tx,
  className,
  isLoading,
  onPrefetch,
  ...props
}: TxCardProps) {
  const isValid = useMemo(() => isValidAddress(tx.id), [tx.id]);
  const fee = bn(tx.gasCosts?.fee ?? 0);

  return (
    <Link
      to={CommonRoutes.txSimple(tx.id)}
      onClickCapture={(e) => {
        // Avoid navigation to invalid address
        if (!isValid) e.preventDefault();
      }}
    >
      <Card {...props} className={cx(className)}>
        <Card.Body className="flex flex-col gap-4 laptop:flex-row laptop:justify-between">
          <Box className="flex gap-3 h-[26px]">
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-[50px] h-6" />}
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
            {(fee.gt(0) || isLoading) && (
              <HStack align="center" className="order-3 laptop:order-none">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={
                    <HStack align="center">
                      <LoadingBox className="w-16 h-5" />
                      <LoadingBox className="w-[111px] h-4" />
                    </HStack>
                  }
                  regularEl={
                    <HStack align="center">
                      <Text
                        className="text-primary text-sm"
                        leftIcon={IconGasStation}
                        iconColor="text-heading"
                      >
                        {tx.gasCosts?.feeInUsd}
                      </Text>
                      <Text className="text-secondary text-xs">
                        ({bn(tx.gasCosts?.fee ?? 0).format()} ETH)
                      </Text>
                    </HStack>
                  }
                />
              </HStack>
            )}
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-16 h-6" />}
              regularEl={
                <Badge
                  color={TX_INTENT_MAP[tx.statusType as TxStatus]}
                  variant="ghost"
                >
                  {tx.statusType}
                </Badge>
              }
            />
            <Text className="text-sm">
              <LoadingWrapper
                isLoading={isLoading}
                loadingEl={<LoadingBox className="w-[166px] h-6" />}
                regularEl={
                  <TxFullDateTimestamp timeStamp={tx?.time?.rawUnix as any} />
                }
              />
            </Text>
          </Box>
        </Card.Body>
      </Card>
    </Link>
  );
}

export const TxCard = memo(_TxCard);
