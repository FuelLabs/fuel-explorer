import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import {
  Alert,
  AnimatedDialog,
  Badge,
  Button,
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
import { FuelToken, L1_DISABLE_WITHDRAW, TOKENS } from 'app-commons';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { bn } from 'fuels';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import { PausedContractAlertStaking } from '~staking/systems/Staking/components/PausedContractAlertStaking/PausedContractAlertStaking';
import { responsiveDialogStyles } from '~staking/systems/Staking/constants/styles/dialogContent';
import { useWithdrawStatusDialog } from '~staking/systems/Staking/hooks/useWithdrawStatusDialog';
import { useWithdrawStatusFlags } from '~staking/systems/Staking/hooks/useWithdrawStatusFlags';
import { StatusItem } from '../StatusItem/StatusItem';
import { WITHDRAW_STEPS } from './constants';

type WithdrawStatusDialogProps = {
  identifier: string | undefined;
};
const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

export const WithdrawStatusDialog = ({
  identifier,
}: WithdrawStatusDialogProps) => {
  if (!identifier) return null;

  const {
    stakingEvent,
    error,
    isPaused,
    isFinalizing,
    isFinalized,
    isError,
    finalize,
    isLoading,
    dateFinalized,
    isWaitingForReceipt,
    rates,
  } = useWithdrawStatusDialog({
    identifier,
  });
  const amount = bn(stakingEvent?.amount, 10);

  const { formattedAmount, originalAmount, tooltipAmount, formattedAmountUsd } =
    useFormattedTokenAmount({
      amount,
      decimals,
      symbol,
      rates,
    });

  const { statusFlags } = useWithdrawStatusFlags(stakingEvent);
  const currentTime = new Date();

  const timing = useMemo(() => {
    const status = stakingEvent?.status;
    const info = stakingEvent?.statusInfo;
    const sentDate = info?.TransactionSent?.ethTx.timestamp;

    if (status === GQLWithdrawStatusType.WaitingSync) {
      return {
        startDate: sentDate,
        fallbackDuration: 120, // ~2 mins for sync
      };
    }

    if (status === GQLWithdrawStatusType.WaitingCommittingToL1) {
      return {
        startDate:
          info?.WaitingCommittingToL1?.dateExpectedToComplete || sentDate,
        fallbackDuration: 600, // ~10 mins for committing
      };
    }

    return {
      startDate: sentDate,
      endDate: stakingEvent?.timestampToFinish,
    };
  }, [
    stakingEvent?.status,
    stakingEvent?.statusInfo,
    stakingEvent?.timestampToFinish,
  ]);

  const { eta: formattedEta } = useETA(timing);

  const responsiveDialogStyle = responsiveDialogStyles();

  if (L1_DISABLE_WITHDRAW === 'true') return null;

  const isSkipped = stakingEvent?.status === GQLWithdrawStatusType.Skipped;

  const getStatusColor = () => {
    if (error) return 'red';
    if (isSkipped) return 'red';
    if (isFinalized) return 'green';
    if (statusFlags.WaitingFinalization) return 'blue';
    return 'yellow';
  };

  const getStatusText = () => {
    if (error) return 'Error';
    if (isSkipped) return 'Failed';
    if (isFinalized) return 'Completed';
    if (statusFlags.WaitingFinalization) return 'Waiting user action';
    return 'In Progress';
  };

  return (
    <AnimatedDialog.Content
      open
      aria-describedby="Withdraw"
      className={clsx(
        responsiveDialogStyle.content({ sizing: 'auto' }),
        'h-[520px] min-h-[520px]',
      )}
    >
      <VStack className="h-full" gap="7">
        <AnimatedDialog.Title>Withdrawal</AnimatedDialog.Title>
        <VStack gap="3">
          <VStack gap="2">
            <Text className="font-medium text-gray-12">
              {isFinalized ? 'You have withdrawn' : `You're withdrawing`}
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
          <VStack gap="0" className="overflow-y-auto max-h-[200px]">
            {WITHDRAW_STEPS.filter((step) => {
              if (step.status === GQLWithdrawStatusType.Skipped) {
                return stakingEvent?.status === GQLWithdrawStatusType.Skipped;
              }
              return true;
            }).map((step) => {
              const isCompleted =
                !!statusFlags[step.status as keyof typeof statusFlags];
              const isCurrent = step.status === stakingEvent?.status;
              const isReadyToProcess =
                step.status === GQLWithdrawStatusType.ReadyToProcessWithdraw;
              const eta =
                isCurrent &&
                (stakingEvent?.statusInfo as any)?.[step.status]
                  ?.dateExpectedToComplete;
              const txHash =
                (stakingEvent?.statusInfo as any)?.[step.status]?.ethTx
                  ?.txHash ||
                (stakingEvent?.statusInfo as any)?.[step.status]?.sequencerTx
                  ?.txHash;
              const isActionNeeded =
                isCurrent &&
                isReadyToProcess &&
                !isWaitingForReceipt &&
                !isPaused;
              const isProcessing =
                isCurrent && !isError && !isActionNeeded && !isCompleted;

              return (
                <StatusItem
                  key={step.status}
                  step={step}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  statusInfo={stakingEvent?.statusInfo}
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
          {!!isPaused && <PausedContractAlertStaking />}
          {!isPaused &&
            stakingEvent?.status ===
              GQLWithdrawStatusType.ReadyToProcessWithdraw && (
              <Button
                onClick={finalize}
                isLoading={isFinalizing || isWaitingForReceipt}
                loadingText={
                  isWaitingForReceipt
                    ? 'Waiting for transaction confirmation'
                    : 'Loading...'
                }
              >
                Finalize Withdraw
              </Button>
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
                          Withdrawal finalized on{' '}
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
