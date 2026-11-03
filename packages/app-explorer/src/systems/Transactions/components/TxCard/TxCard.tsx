import { bn } from '@fuel-ts/math';
import type { BaseProps } from '@fuels/ui';
import {
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
import { useTranslation } from 'react-i18next';
import { isValidAddress } from '~/systems/Core/utils/address';
import { TxChip } from '~/systems/Transaction/component/TxItem/TxChip';
import { TX_STATUS_CHIP } from '~/systems/Transaction/component/TxItem/txStatusChip';
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
  const { t } = useTranslation();
  const statusChip = TX_STATUS_CHIP[tx.statusType as string];
  const isValid = useMemo(() => isValidAddress(tx.id), [tx.id]);
  const fee = bn(tx.gasCosts?.fee ?? 0);

  return (
    <div className="fuel-card-link relative">
      <Link
        to={CommonRoutes.txSimple(tx.id)}
        aria-label={`${tx.title ?? t('tx.transaction_label')} ${shortAddress(tx.id)}`}
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
          <Box className="flex flex-wrap gap-x-3 gap-y-1 min-h-[26px] min-w-0 items-center">
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-[50px] h-6" />}
              regularEl={<TxChip>{tx.title}</TxChip>}
            />
            <Text className="text-md font-medium text-[var(--fuel-element-mid-em)]">
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
                      <span className="pointer-events-auto flex items-center gap-2">
                        <Text
                          className="text-sm text-[var(--fuel-element-mid-em)]"
                          leftIcon={IconGasStation}
                          iconColor="text-heading"
                        >
                          {tx.gasCosts?.feeInUsd}
                        </Text>
                        <span className="hidden laptop:inline fuel-caption font-mono tabular-nums">
                          {fee.format()} ETH
                        </span>
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
                <TxChip kind={statusChip?.kind ?? 'plain'}>
                  {statusChip ? t(statusChip.label) : tx.statusType}
                </TxChip>
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
