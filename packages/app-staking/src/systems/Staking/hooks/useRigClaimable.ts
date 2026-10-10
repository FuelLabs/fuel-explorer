import { useAccount, useWallet } from '@fuels/react';
import { useQuery } from '@tanstack/react-query';
import * as AppCommons from 'app-commons';
import {
  type IdentityInput,
  StakingMigration,
} from '~staking/contracts/rig/StakingMigration';

// A missing Fuel wallet, an in-flight read, and a failed read are not a balance.
// Only `ready` means the contract answered, including a real zero.
export type RigClaimStatus = 'disconnected' | 'loading' | 'error' | 'ready';

export function selectRigClaimStatus(input: {
  isConnected: boolean;
  isResolvingConnection: boolean;
  isQueryLoading: boolean;
  isQueryError: boolean;
  isQuerySuccess: boolean;
}): RigClaimStatus {
  if (
    input.isResolvingConnection ||
    (input.isConnected && input.isQueryLoading)
  ) {
    return 'loading';
  }
  if (!input.isConnected) return 'disconnected';
  if (input.isQueryError || !input.isQuerySuccess) return 'error';
  return 'ready';
}

function hasStakingContract() {
  const address = AppCommons.CURRENT_NETWORK_CONTRACTS?.L2_STAKING;
  return !!address && address !== '0x';
}

// stFUEL waiting to be claimed on The Rig, read from the L2 staking contract.
// `enabled: false` skips the wallet read for screens that do not show it.
export function useRigClaimable({
  enabled = true,
}: { enabled?: boolean } = {}) {
  const accountQuery = useAccount();
  const walletQuery = useWallet();
  const accountAddress = accountQuery.account ?? undefined;
  const wallet = walletQuery.wallet ?? undefined;
  const isConnected = !!accountAddress && !!wallet;
  // Account lookup uses placeholder `null`, so an unread query is not "no wallet".
  // The wallet query stays disabled until an account exists, so its idle state is not a load.
  const isResolvingConnection =
    !isConnected &&
    (!accountQuery.isFetched ||
      accountQuery.isLoading ||
      (!!accountAddress &&
        !wallet &&
        (walletQuery.isLoading || walletQuery.isFetching)));

  const canQuery = enabled && isConnected && hasStakingContract();

  const query = useQuery({
    queryKey: ['staking-migration-claimable', accountAddress],
    enabled: canQuery,
    queryFn: async () => {
      if (!wallet) {
        throw new Error('Fuel wallet is not connected');
      }

      try {
        const stakingMigration = new StakingMigration(
          AppCommons.CURRENT_NETWORK_CONTRACTS.L2_STAKING,
          wallet,
        );

        const identity: IdentityInput = {
          Address: { bits: wallet.address.toB256() },
        };

        const { value: pendingDeposit } = await stakingMigration.functions
          .get_pending_deposit_to_be_claimed(identity)
          .dryRun();

        return {
          // A non-positive answer is a real zero. Callers that only list claims
          // still skip it via `gt(0)`.
          pendingDeposit: pendingDeposit?.gt(0) ? pendingDeposit : undefined,
        };
      } catch (err) {
        console.error('[useRigClaimable] Error querying migration:', err);
        throw err;
      }
    },
  });

  const status = selectRigClaimStatus({
    isConnected,
    isResolvingConnection,
    isQueryLoading: canQuery && query.isPending,
    isQueryError: query.isError,
    isQuerySuccess: query.isSuccess,
  });

  return {
    pendingDeposit: status === 'ready' ? query.data?.pendingDeposit : undefined,
    status,
  };
}
