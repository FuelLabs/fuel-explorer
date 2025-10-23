import { useMemo } from 'react';
import type { UndelegateEvent } from '~staking/systems/Staking/machines/undelegateStatusDialogMachine';
import { UndelegateStatus } from '~staking/systems/Staking/machines/undelegateStatusDialogMachine';

export type UndelegateStatusFlags = Record<UndelegateStatus, boolean>;

const statusOrder = [
  UndelegateStatus.TransactionSent,
  UndelegateStatus.WaitingSync,
  UndelegateStatus.Skipped,
  UndelegateStatus.WaitingUnbonding,
  UndelegateStatus.Finalized,
];

export function useUndelegateStatusFlags(
  undelegateEvent?: UndelegateEvent | null,
) {
  const statusFlags = useMemo(() => {
    // Initialize all flags to false
    const flags: UndelegateStatusFlags = {
      [UndelegateStatus.TransactionSent]: false,
      [UndelegateStatus.WaitingSync]: false,
      [UndelegateStatus.Skipped]: false,
      [UndelegateStatus.WaitingUnbonding]: false,
      [UndelegateStatus.Finalized]: false,
    };

    // If no operation or status is provided, return default flags
    if (!undelegateEvent?.status) return flags;

    const currentIndex = statusOrder.findIndex(
      (status) => status === undelegateEvent.status,
    );

    if (currentIndex === -1) return flags;

    // Mark all previous steps as done
    for (let i = 0; i < currentIndex; i++) {
      const statusKey = statusOrder[i];
      flags[statusKey] = true;
    }

    return flags;
  }, [undelegateEvent?.status]);

  return { statusFlags };
}
