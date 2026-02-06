import {
  Alert,
  AnimatedDialog,
  Badge,
  Copyable,
  HStack,
  LoadingBox,
  LoadingWrapper,
  Separator,
  Text,
  TokenBadge,
  Tooltip,
  VStack,
} from '@fuels/ui';
import { IconCircleMinus } from '@tabler/icons-react';
import { FuelToken, TOKENS } from 'app-commons';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { bn } from 'fuels';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import { formatETA } from '~staking/systems/Core/utils/eta';
import { formatSecondsToETA } from '~staking/systems/Core/utils/formatSecondsToETA';
import { DEFAULT_SECURITY_PERIOD_ETA } from '~staking/systems/Staking/constants/eta';
import { responsiveDialogStyles } from '~staking/systems/Staking/constants/styles/dialogContent';
import { useUndelegateStatusDialog } from '~staking/systems/Staking/hooks/useUndelegateStatusDialog';
import { getSecondsBetweenDates } from '~staking/systems/Staking/utils/dateDiff';
import { useUndelegateStatusFlags } from '../../hooks/useUndelegateStatusFlags';
import { StatusItem } from '../StatusItem/StatusItem';
import { UNDELEGATE_STEPS } from './constants';

type UndelegateStatusDialogProps = {
  identifier: string | undefined;
};
const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

export const UndelegateStatusDialog = ({
  identifier,
}: UndelegateStatusDialogProps) => {
  if (!identifier) return null;

  const {
    undelegateEvent,
    error,
    isPaused,
    isFinalized,
    isError,
    isLoading,
    dateFinalized,
    rates,
  } = useUndelegateStatusDialog({
    identifier,
  });
  const amount = bn(undelegateEvent?.amount, 10);

  const { formattedAmount, originalAmount, tooltipAmount, formattedAmountUsd } =
    useFormattedTokenAmount({
      amount,
      decimals,
      symbol,
      rates,
    });

  const { statusFlags } = useUndelegateStatusFlags(undelegateEvent);

  const currentTime = new Date();
  const eta = undelegateEvent?.timestampToFinish;
  const formattedEta = formatETA(eta);

  const startDate =
    undelegateEvent?.statusInfo?.TransactionSent?.ethTx?.timestamp;
  const totalSeconds =
    startDate && eta ? getSecondsBetweenDates(startDate, eta) : 0;
  const totalDuration =
    totalSeconds > 0 ? formatSecondsToETA(totalSeconds, '~') : undefined;

  const responsiveDialogStyle = responsiveDialogStyles();

  const isSkipped = undelegateEvent?.status === 'Skipped';

  const getStatusColor = () => {
    if (error) return 'red';
    if (isSkipped) return 'red';
    if (isFinalized) return 'green';
    return 'yellow';
  };

  const getStatusText = () => {
    if (error) return 'Error';
    if (isSkipped) return 'Failed';
    if (isFinalized) return 'Completed';
    return 'In Progress';
  };

  return (
    <AnimatedDialog.Content
      open
      aria-describedby="Undelegate"
      className={clsx(
        responsiveDialogStyle.content({ sizing: 'auto' }),
        'h-[450px] min-h-[450px]',
      )}
    >
      <VStack className="h-full" gap="7">
        <AnimatedDialog.Title>Undelegate</AnimatedDialog.Title>
        <VStack gap="3">
          <VStack gap="2">
            <Text className="font-medium text-gray-12">
              {isFinalized ? 'You have undelegated' : `You're undelegating`}
            </Text>
            <div className="flex items-center gap-2">
              <TokenBadge
                image="/assets/fuel.png"
                symbol={symbol}
                size="small"
              />
              <LoadingWrapper
                isLoading={isLoading}
                loadingEl={<LoadingBox className="w-28 h-6" />}
                regularEl={
                  <>
                    <Tooltip
                      content={`${originalAmount.display} ${symbol}`}
                      delayDuration={0}
                      open={tooltipAmount ? undefined : false}
                    >
                      <Text
                        weight="bold"
                        className="font-mono text-[24px] text-gray-12"
                      >
                        {formattedAmount.display}
                      </Text>
                    </Tooltip>
                    <Text weight="regular" className="text-muted text-lg">
                      ({formattedAmountUsd})
                    </Text>
                  </>
                }
              />
            </div>
          </VStack>
          <Separator size="4" />
          <HStack gap="3" align="center">
            <Text className="font-medium text-gray-12">Status</Text>
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-20 h-6" />}
              regularEl={
                <Badge
                  color={getStatusColor()}
                  size="1"
                  variant="ghost"
                  className="py-1 px-2"
                >
                  {getStatusText()}
                </Badge>
              }
            />
          </HStack>
          <HStack gap="3" align="center">
            <Text className="font-medium text-gray-12 text-sm">
              Total time to complete
            </Text>
            <Text className="font-medium text-gray-10 text-sm">
              {totalDuration || DEFAULT_SECURITY_PERIOD_ETA}
            </Text>
          </HStack>
          <VStack gap="0" className="overflow-y-auto max-h-[200px]">
            {UNDELEGATE_STEPS.filter((step) => {
              if (step.status === 'Skipped') {
                return undelegateEvent?.status === 'Skipped';
              }
              return true;
            }).map((step) => {
              const isCompleted =
                !!statusFlags[step.status as keyof typeof statusFlags];

              const isCurrent = step.status === undelegateEvent?.status;
              const txHash = (undelegateEvent?.statusInfo as any)?.[step.status]
                ?.ethTx?.txHash;

              const isActionNeeded = false; // In undelegate process, no action is needed
              const isProcessing =
                isCurrent && !isError && !isActionNeeded && !isCompleted;

              return (
                <StatusItem
                  key={step.status}
                  step={step}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  statusInfo={undelegateEvent?.statusInfo}
                  currentTime={currentTime}
                  eta={eta}
                  isContractPaused={!!isPaused}
                  isLoading={isLoading}
                  txHash={txHash}
                  isActionNeeded={isActionNeeded}
                  isProcessing={isProcessing}
                />
              );
            })}
          </VStack>
          {isError && !!error && (
            <Alert color="red">
              <Alert.Icon>
                <IconCircleMinus size="md" />
              </Alert.Icon>
              <Copyable
                as="div"
                className="max-h-[150px] overflow-hidden"
                value={error || ''}
                iconClassName="mr-1"
              >
                <Alert.Text className="max-h-[120px] break-words overflow-hidden">
                  {error}
                </Alert.Text>
              </Copyable>
            </Alert>
          )}
          <VStack gap="3">
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={
                <>
                  <Separator size="4" />
                  <LoadingBox className="w-48 h-5" />
                </>
              }
              regularEl={
                <>
                  {!!formattedEta && (
                    <>
                      <Separator size="4" />
                      <HStack gap="2">
                        <Text className="font-medium text-sm text-gray-10">
                          Estimated completion time:
                        </Text>
                        <Text className="font-medium text-sm text-heading">
                          {formattedEta}
                        </Text>
                      </HStack>
                    </>
                  )}
                  {!!isFinalized && dateFinalized && (
                    <>
                      <Separator size="4" />
                      <HStack gap="2">
                        <Text className="font-medium text-sm text-gray-10">
                          Undelegation completed on{' '}
                        </Text>
                        <Text className="font-medium text-sm text-heading">
                          {dayjs(dateFinalized).format('MMMM D, YYYY')} at{' '}
                          {dayjs(dateFinalized).format('h:mm A')}
                        </Text>
                      </HStack>
                    </>
                  )}
                </>
              }
            />
          </VStack>
        </VStack>
      </VStack>
    </AnimatedDialog.Content>
  );
};
