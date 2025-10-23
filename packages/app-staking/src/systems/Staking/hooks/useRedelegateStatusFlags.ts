import { useMemo } from 'react';
import type { RedelegateEvent } from '~staking/systems/Staking/machines/redelegateStatusDialogMachine';
import { RedelegateStatus } from '~staking/systems/Staking/machines/redelegateStatusDialogMachine';

export type RedelegateStatusFlags = Record<RedelegateStatus, boolean>;

const statusOrder = [
  RedelegateStatus.TransactionSent,
  RedelegateStatus.WaitingSync,
  RedelegateStatus.Skipped,
  RedelegateStatus.Finalized,
];

export function useRedelegateStatusFlags(
  redelegateEvent?: RedelegateEvent | null,
) {
  const statusFlags = useMemo(() => {
    // Initialize all flags to false
    const flags: RedelegateStatusFlags = {
      [RedelegateStatus.TransactionSent]: false,
      [RedelegateStatus.WaitingSync]: false,
      [RedelegateStatus.Skipped]: false,
      [RedelegateStatus.Finalized]: false,
    };

    // If no operation or status is provided, return default flags
    if (!redelegateEvent?.status) return flags;

    const currentIndex = statusOrder.findIndex(
      (status) => status === redelegateEvent.status,
    );

    if (currentIndex === -1) return flags;

    // Mark all previous steps as done
    for (let i = 0; i < currentIndex; i++) {
      const statusKey = statusOrder[i];
      flags[statusKey] = true;
    }

    return flags;
  }, [redelegateEvent?.status]);

  return { statusFlags };
}
