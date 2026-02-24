import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import type { StatusInfo } from '../types/l1/events';

export const getWithdrawStepTiming = (
  status: string | undefined,
  statusInfo: StatusInfo | null | undefined,
  timestampToFinish: string | undefined,
) => {
  const sentDate = statusInfo?.TransactionSent?.ethTx.timestamp;

  if (status === GQLWithdrawStatusType.WaitingSync) {
    return {
      startDate: sentDate,
      fallbackDuration: 120, // ~2 mins for sync
    };
  }

  if (status === GQLWithdrawStatusType.WaitingCommittingToL1) {
    return {
      startDate: sentDate,
      endDate: statusInfo?.WaitingCommittingToL1?.dateExpectedToComplete,
      fallbackDuration: statusInfo?.WaitingCommittingToL1
        ?.dateExpectedToComplete
        ? undefined
        : 600, // ~10 mins for committing
    };
  }

  return {
    startDate: sentDate,
    endDate: timestampToFinish,
  };
};
