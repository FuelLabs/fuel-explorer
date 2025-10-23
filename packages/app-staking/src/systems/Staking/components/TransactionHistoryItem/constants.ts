import type { TxDialogNames } from '~staking/systems/Staking/store/stakingTxDialogStore';
import { StakingEventType } from '../../types/l1/events';

export const typeLabel: Record<StakingEventType, string> = {
  [StakingEventType.Stake]: 'Stake',
  [StakingEventType.ReDelegate]: 'Redelegation',
  [StakingEventType.Undelegate]: 'Undelegation',
  [StakingEventType.ClaimRewards]: 'Reward Claim',
  [StakingEventType.Withdraw]: 'Withdraw',
};

export const withdrawType: Record<StakingEventType, TxDialogNames> = {
  [StakingEventType.ClaimRewards]: 'TxClaimRewardStatus',
  [StakingEventType.Stake]: 'TxStakeStatus',
  [StakingEventType.Undelegate]: 'TxUndelegateStatus',
  [StakingEventType.ReDelegate]: 'TxRedelegateStatus',
  [StakingEventType.Withdraw]: 'TxWithdrawStatus',
};
