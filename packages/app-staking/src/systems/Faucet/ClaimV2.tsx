import { Button, toast } from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS, IS_FUEL_MAINNET_CHAIN } from 'app-commons';
import { usePausedContract } from 'app-commons/usePausedContract';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useClaimFuelV2 } from '~staking/systems/Staking/hooks/useClaimFuelV2';

export const ClaimV2Button = () => {
  const { t } = useTranslation();
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
        title: t('staking.faucet.error'),
        variant: 'error',
        description: error.message,
      });
    }
  }, [error, t]);

  if (IS_FUEL_MAINNET_CHAIN) return null;

  return (
    <Button
      variant="ghost"
      color="gray"
      onClick={claimReward}
      isLoading={isClaiming}
      disabled={isPaused}
    >
      {t('staking.faucet.button')}
    </Button>
  );
};
