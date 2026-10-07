import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import type { TxDialogNames } from '~staking/systems/Staking/store/stakingTxDialogStore';
import { type StakingEvent, StakingEventType } from '../../types/l1/events';

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

export type EventStatus = 'action' | 'progress' | 'completed' | 'failed';

// The one reading of an event's status, shared by the history rows, its
// filters and the board.
export function eventStatus(event: StakingEvent): EventStatus {
  if (event.status === GQLWithdrawStatusType.Finalized) return 'completed';
  if (event.status === GQLWithdrawStatusType.ReadyToProcessWithdraw) {
    return 'action';
  }
  if (event.status === GQLWithdrawStatusType.Skipped) return 'failed';
  return 'progress';
}
