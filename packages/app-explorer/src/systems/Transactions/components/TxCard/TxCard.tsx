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
  Tooltip,
  cx,
  shortAddress,
} from '@fuels/ui';
import { IconGasStation } from '@fuels/ui';
import { Routes as CommonRoutes } from 'app-commons';
import { Link } from 'react-router-dom';

import type { GQLRecentTransactionsQuery } from '@fuel-explorer/graphql';
import { memo, useMemo } from 'react';
import { isValidAddress } from '~/systems/Core/utils/address';
import type { TxStatus } from '~/systems/Transaction/types';
import { TX_INTENT_MAP } from '../../../Transaction/component/TxIcon/TxIcon';
import type { TxApp } from '../../utils/txAppsCache';
import { TxAppTag } from '../TxAppTag/TxAppTag';
import { TxDayTime } from './TxDayTime';

type TxCardProps = BaseProps<{
  transaction: GQLRecentTransactionsQuery['transactions']['nodes'][number];
  isLoading?: boolean;
  apps?: TxApp[];
  appsPending?: boolean;
  appsDelay?: number;
  onPrefetch?: () => void;
}>;

function _TxCard({
  transaction: tx,
  className,
  isLoading,
  apps,
  appsPending,
  appsDelay,
  onPrefetch,
  ...props
}: TxCardProps) {
  const isValid = useMemo(() => isValidAddress(tx.id), [tx.id]);
  const fee = bn(tx.gasCosts?.fee ?? 0);

  return (
    <div className="fuel-card-link relative">
      <Link
        to={CommonRoutes.txSimple(tx.id)}
        aria-label={`${tx.title ?? 'Transaction'} ${shortAddress(tx.id)}`}
        className="absolute inset-0 z-0"
        onClickCapture={(e) => {
          // Avoid navigation to invalid address
          if (!isValid) e.preventDefault();
        }}
      />
      <Card
        {...props}
        className={cx(className, 'relative z-10 pointer-events-none')}
      >
        <Card.Body className="flex flex-col gap-4 laptop:flex-row laptop:justify-between">
          <Box className="flex gap-3 h-[26px] min-w-0 items-center">
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
            {!isLoading && (
              <TxAppTag apps={apps} pending={appsPending} delay={appsDelay} />
            )}
          </Box>
          <Box className="flex flex-wrap gap-3 items-center laptop:flex-nowrap">
            {(fee.gt(0) || isLoading) && (
              <HStack align="center" className="order-3 laptop:order-none">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={<LoadingBox className="w-16 h-5" />}
                  regularEl={
                    <Tooltip content={`${fee.format()} ETH`} delayDuration={0}>
                      <span className="pointer-events-auto">
                        <Text
                          className="text-primary text-sm"
                          leftIcon={IconGasStation}
                          iconColor="text-heading"
                        >
                          {tx.gasCosts?.feeInUsd}
                        </Text>
                      </span>
                    </Tooltip>
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
            <Text className="text-sm tabular-nums">
              <LoadingWrapper
                isLoading={isLoading}
                loadingEl={<LoadingBox className="w-[120px] h-6" />}
                regularEl={<TxDayTime timeStamp={tx?.time?.rawUnix} />}
              />
            </Text>
          </Box>
        </Card.Body>
      </Card>
    </div>
  );
}

export const TxCard = memo(_TxCard);
