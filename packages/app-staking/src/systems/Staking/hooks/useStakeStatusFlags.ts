import { useMemo } from 'react';
import type { StakeEvent } from '~staking/systems/Staking/machines/stakeStatusDialogMachine';
import { StakeStatus } from '~staking/systems/Staking/machines/stakeStatusDialogMachine';

export type StakeStatusFlags = Record<StakeStatus, boolean>;

const statusOrder = [
  StakeStatus.TransactionSent,
  StakeStatus.WaitingSync,
  StakeStatus.Skipped,
  StakeStatus.Finalized,
];

export function useStakeStatusFlags(stakeEvent?: StakeEvent | null) {
  const statusFlags = useMemo(() => {
    // Initialize all flags to false
    const flags: StakeStatusFlags = {
      [StakeStatus.TransactionSent]: false,
      [StakeStatus.WaitingSync]: false,
      [StakeStatus.Skipped]: false,
      [StakeStatus.Finalized]: false,
    };

    // If no operation or status is provided, return default flags
    if (!stakeEvent?.status) return flags;

    const currentIndex = statusOrder.findIndex(
      (status) => status === stakeEvent.status,
    );

    if (currentIndex === -1) return flags;

    // Mark all previous steps as done
    for (let i = 0; i < currentIndex; i++) {
      const statusKey = statusOrder[i];
      flags[statusKey] = true;
    }

    return flags;
  }, [stakeEvent?.status]);

  return { statusFlags };
}
