import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import { useMemo } from 'react';

import type { StakingEvent } from '~staking/systems/Staking/types/l1/events';

export type WithdrawalStatusFlags = Record<GQLWithdrawStatusType, boolean>;

const statusOrder = [
  GQLWithdrawStatusType.TransactionSent,
  GQLWithdrawStatusType.WaitingSync,
  GQLWithdrawStatusType.WaitingCommittingToL1,
  GQLWithdrawStatusType.WaitingFinalization,
  GQLWithdrawStatusType.ReadyToProcessWithdraw,
  GQLWithdrawStatusType.Finalized,
];

export function useWithdrawStatusFlags(withdraw?: StakingEvent | null) {
  const statusFlags = useMemo(() => {
    // Initialize all flags to false
    const flags: Omit<WithdrawalStatusFlags, 'Skipped'> = {
      [GQLWithdrawStatusType.TransactionSent]: false,
      [GQLWithdrawStatusType.WaitingSync]: false,
      [GQLWithdrawStatusType.WaitingCommittingToL1]: false,
      [GQLWithdrawStatusType.WaitingFinalization]: false,
      [GQLWithdrawStatusType.ReadyToProcessWithdraw]: false,
      [GQLWithdrawStatusType.Finalized]: false,
    };

    const currentIndex = statusOrder.findIndex(
      (status) => status === withdraw?.status,
    );

    if (currentIndex === -1) return flags;

    // Mark all previous steps as done
    for (let i = 0; i < currentIndex; i++) {
      const statusKey = statusOrder[i];
      flags[statusKey as keyof typeof flags] = true;
    }

    if (withdraw?.status === GQLWithdrawStatusType.Finalized) {
      flags[GQLWithdrawStatusType.Finalized] = true;
    }

    return flags;
  }, [withdraw?.status]);

  return { statusFlags };
}
