import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import type { TxDialogNames } from '~staking/systems/Staking/store/stakingTxDialogStore';
import { type StakingEvent, StakingEventType } from '../../types/l1/events';

export const typeLabelKey: Record<StakingEventType, string> = {
  [StakingEventType.Stake]: 'staking.event_type.stake',
  [StakingEventType.ReDelegate]: 'staking.event_type.redelegate',
  [StakingEventType.Undelegate]: 'staking.event_type.undelegate',
  [StakingEventType.ClaimRewards]: 'staking.event_type.claim_rewards',
  [StakingEventType.Withdraw]: 'staking.event_type.withdraw',
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
