import { Button, toast } from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS, IS_FUEL_MAINNET_CHAIN } from 'app-commons';
import { usePausedContract } from 'app-commons/usePausedContract';
import { useEffect, useMemo } from 'react';
import { useClaimFuelV2 } from '~staking/systems/Staking/hooks/useClaimFuelV2';

export const ClaimV2Button = () => {
  const { data: pausers = [] } = usePausedContract({
    conditions: [CURRENT_NETWORK_CONTRACTS.FUEL_VESTING],
  });
  const { claimReward, isClaiming, error } = useClaimFuelV2();

  const isPaused = useMemo<boolean>(() => {
    return pausers.some((paused) => paused.result);
  }, [pausers]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error to claim Fuel token',
        variant: 'error',
        description: error.message,
      });
    }
  }, [error]);

  if (IS_FUEL_MAINNET_CHAIN) return null;

  return (
    <Button
      variant="outline"
      color="gray"
      onClick={claimReward}
      isLoading={isClaiming}
      disabled={isPaused}
    >
      Faucet Fuel Token
    </Button>
  );
};
