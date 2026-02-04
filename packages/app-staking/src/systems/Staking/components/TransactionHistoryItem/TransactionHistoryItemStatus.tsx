import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import { HStack, Progress, Text, VStack } from '@fuels/ui';
import {
  IconCircleCheck,
  IconHourglassEmpty,
  IconX,
} from '@tabler/icons-react';
import { useMemo } from 'react';
import { DEFAULT_SECURITY_PERIOD_ETA } from '~staking/systems/Staking/constants/eta';
import { useETA } from '~staking/systems/Staking/hooks/useETA';
import type { StakingEvent } from '../../types/l1/events';

interface TransactionHistoryItemStatusProps {
  event: StakingEvent;
}

export const TransactionHistoryItemStatus = ({
  event,
}: TransactionHistoryItemStatusProps) => {
  const startDate = event.statusInfo?.TransactionSent?.ethTx.timestamp;
  const endDate: string | undefined = event.timestampToFinish;
  const isCompleted = event.status === GQLWithdrawStatusType.Finalized;
  const isWaitingForAction =
    event.status === GQLWithdrawStatusType.ReadyToProcessWithdraw;
  const isSkipped = event.status === GQLWithdrawStatusType.Skipped;

  const { eta, totalDuration, progress } = useETA({
    startDate,
    endDate,
  });

  const label = useMemo<string>(() => {
    if (isCompleted) return 'Completed';
    if (isWaitingForAction) return 'Action needed';
    if (isSkipped) return 'Failed';
    return 'In Progress';
  }, [isCompleted, isWaitingForAction, isSkipped]);
  const isInProgress = label === 'In Progress';

  return (
    <VStack gap="1">
      <HStack gap="1" align="center">
        {isCompleted && (
          <IconCircleCheck size={20} color="var(--brand-11)" className="mr-1" />
        )}
        {isWaitingForAction && (
          <IconHourglassEmpty
            size={20}
            color="var(--blue-11)"
            className="mr-1"
          />
        )}
        {isSkipped && (
          <IconX size={20} color="var(--red-11)" className="mr-1" />
        )}
        <Text className="text-sm">{label}</Text>
        {isInProgress && eta && (
          <Text className="text-sm text-muted">
            (~{eta} remaining of {totalDuration || DEFAULT_SECURITY_PERIOD_ETA})
          </Text>
        )}
      </HStack>
      {isInProgress && (
        <Progress
          color="yellow"
          value={progress}
          className="w-full max-w-[150px]"
          size="1"
        />
      )}
    </VStack>
  );
};
