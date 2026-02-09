import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import { HStack, Progress, Text, VStack } from '@fuels/ui';
import {
  IconCircleCheck,
  IconHourglassEmpty,
  IconX,
} from '@tabler/icons-react';
import { useMemo } from 'react';
import { useETA } from '~staking/systems/Staking/hooks/useETA';
import type { StakingEvent } from '../../types/l1/events';

interface TransactionHistoryItemStatusProps {
  event: StakingEvent;
}

export const TransactionHistoryItemStatus = ({
  event,
}: TransactionHistoryItemStatusProps) => {
  const isCompleted = event.status === GQLWithdrawStatusType.Finalized;
  const isWaitingForAction =
    event.status === GQLWithdrawStatusType.ReadyToProcessWithdraw;
  const isSkipped = event.status === GQLWithdrawStatusType.Skipped;

  // Determine timing parameters for the current step
  const timing = useMemo(() => {
    const status = event.status;
    const info = event.statusInfo;
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
      endDate: event.timestampToFinish,
    };
  }, [event.status, event.statusInfo, event.timestampToFinish]);

  const { eta, progress } = useETA(timing);

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
          <Text className="text-sm text-muted">(~{eta} left)</Text>
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
