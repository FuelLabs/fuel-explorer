import { useAccount, useWallet } from '@fuels/react';
import { useQuery } from '@tanstack/react-query';
import * as AppCommons from 'app-commons';
import { StakingMigration } from '~staking/contracts/rig/StakingMigration';

// stFUEL waiting to be claimed on The Rig, read from the L2 staking contract.
export function useRigClaimable() {
  const { account } = useAccount();
  const { wallet } = useWallet();
  const accountAddress = account ?? undefined;

  const { data: migrationData } = useQuery({
    queryKey: ['staking-migration-claimable', accountAddress],
    enabled:
      !!accountAddress &&
      !!wallet &&
      !!AppCommons.CURRENT_NETWORK_CONTRACTS?.L2_STAKING &&
      AppCommons.CURRENT_NETWORK_CONTRACTS.L2_STAKING !== '0x',
    queryFn: async () => {
      if (!wallet) return { pendingDeposit: undefined };

      try {
        const stakingMigration = new StakingMigration(
          AppCommons.CURRENT_NETWORK_CONTRACTS.L2_STAKING,
          wallet,
        );

        const identity = { Address: { bits: wallet.address.toB256() } } as any;

        const { value: pendingDeposit } = await stakingMigration.functions
          .get_pending_deposit_to_be_claimed(identity)
          .dryRun();

        return {
          pendingDeposit: pendingDeposit?.gt(0) ? pendingDeposit : undefined,
        };
      } catch (err) {
        console.error('[useRigClaimable] Error querying migration:', err);
        return { pendingDeposit: undefined };
      }
    },
  });

  return { pendingDeposit: migrationData?.pendingDeposit };
}
