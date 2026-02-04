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
import { responsiveDialogStyles } from '~staking/systems/Staking/constants/styles/dialogContent';
import { useClaimRewardStatusDialog } from '~staking/systems/Staking/hooks/useClaimRewardStatusDialog';
import { useClaimRewardStatusFlags } from '~staking/systems/Staking/hooks/useClaimRewardStatusFlags';
import { StatusItem } from '../StatusItem/StatusItem';
import { CLAIM_STEPS } from './constants';

type ClaimRewardStatusDialogProps = {
  identifier: string | undefined;
};
const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

export const ClaimRewardStatusDialog = ({
  identifier,
}: ClaimRewardStatusDialogProps) => {
  if (!identifier) return null;

  const {
    claimEvent,
    error,
    isPaused,
    isFinalized,
    isError,
    isLoading,
    dateFinalized,
    rates,
  } = useClaimRewardStatusDialog({
    identifier,
  });
  const amount = bn(claimEvent?.amount, 10);

  const { formattedAmount, originalAmount, tooltipAmount, formattedAmountUsd } =
    useFormattedTokenAmount({
      amount,
      decimals,
      symbol,
      rates,
    });

  const { statusFlags } = useClaimRewardStatusFlags(claimEvent);

  const currentTime = new Date();
  const eta = claimEvent?.timestampToFinish;

  const responsiveDialogStyle = responsiveDialogStyles();

  const isSkipped = claimEvent?.status === 'Skipped';

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
      aria-describedby="ClaimReward"
      className={clsx(
        responsiveDialogStyle.content({ sizing: 'auto' }),
        'h-[350px] min-h-[350px]',
      )}
    >
      <VStack className="h-full" gap="7">
        <AnimatedDialog.Title>Claim Rewards</AnimatedDialog.Title>
        <VStack gap="3">
          <VStack gap="2">
            <Text className="font-medium text-gray-12">
              {isFinalized ? 'You have claimed' : `You're claiming`}
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
            {CLAIM_STEPS.filter((step) => {
              if (step.status === 'Skipped') {
                return claimEvent?.status === 'Skipped';
              }
              return true;
            }).map((step) => {
              const isCompleted =
                !!statusFlags[step.status as keyof typeof statusFlags];

              const isCurrent = step.status === claimEvent?.status;
              const txHash = (claimEvent?.statusInfo as any)?.[step.status]
                ?.ethTx?.txHash;

              const isActionNeeded = false; // In claim process, no action is needed
              const isProcessing =
                isCurrent && !isError && !isActionNeeded && !isCompleted;

              return (
                <StatusItem
                  key={step.status}
                  step={step}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  statusInfo={claimEvent?.statusInfo}
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
                !!isFinalized &&
                dateFinalized && (
                  <>
                    <Separator size="4" />
                    <HStack gap="2">
                      <Text className="font-medium text-sm text-gray-10">
                        Rewards claimed on{' '}
                      </Text>
                      <Text className="font-medium text-sm text-heading">
                        {dayjs(dateFinalized).format('MMMM D, YYYY')} at{' '}
                        {dayjs(dateFinalized).format('h:mm A')}
                      </Text>
                    </HStack>
                  </>
                )
              }
            />
          </VStack>
        </VStack>
      </VStack>
    </AnimatedDialog.Content>
  );
};
