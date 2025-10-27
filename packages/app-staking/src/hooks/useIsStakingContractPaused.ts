import { usePausedContract } from 'app-commons/usePausedContract';
import { useMemo } from 'react';
import type { Conditions } from '~staking/systems/Staking/types/l1/conditions';

export function useIsStakingContractPaused({
  conditions,
}: { conditions: Conditions }) {
  const { data: pausers = [] } = usePausedContract({
    conditions: conditions.pauser,
  });
  const isPaused = useMemo<boolean>(() => {
    return pausers.some((paused) => paused.result);
  }, [pausers]);

  return isPaused;
}
