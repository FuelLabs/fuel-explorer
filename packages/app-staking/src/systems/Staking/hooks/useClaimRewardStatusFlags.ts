import { useMemo } from 'react';
import type { ClaimEvent } from '~staking/systems/Staking/machines/claimRewardStatusDialogMachine';
import { ClaimStatus } from '~staking/systems/Staking/machines/claimRewardStatusDialogMachine';

export type ClaimRewardStatusFlags = Record<ClaimStatus, boolean>;

const statusOrder = [
  ClaimStatus.TransactionSent,
  ClaimStatus.WaitingSync,
  ClaimStatus.Skipped,
  ClaimStatus.Finalized,
];

export function useClaimRewardStatusFlags(claimEvent?: ClaimEvent | null) {
  const statusFlags = useMemo(() => {
    // Initialize all flags to false
    const flags: ClaimRewardStatusFlags = {
      [ClaimStatus.TransactionSent]: false,
      [ClaimStatus.WaitingSync]: false,
      [ClaimStatus.Skipped]: false,
      [ClaimStatus.Finalized]: false,
    };

    // If no operation or status is provided, return default flags
    if (!claimEvent?.status) return flags;

    const currentIndex = statusOrder.findIndex(
      (status) => status === claimEvent.status,
    );

    if (currentIndex === -1) return flags;

    // Mark all previous steps as done
    for (let i = 0; i < currentIndex; i++) {
      const statusKey = statusOrder[i];
      flags[statusKey] = true;
    }

    return flags;
  }, [claimEvent?.status]);

  return { statusFlags };
}
