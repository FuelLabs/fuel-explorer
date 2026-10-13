import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import { SyncFailedDescription } from '../StatusItem/SyncFailedDescription';

export const WITHDRAW_STEPS = [
  {
    label: 'staking.status.step_withdraw_sent',
    status: GQLWithdrawStatusType.TransactionSent,
  },
  {
    label: 'staking.status.step_withdraw_sync',
    status: GQLWithdrawStatusType.WaitingSync,
  },
  {
    label: 'staking.status.step_sync_failed',
    status: GQLWithdrawStatusType.Skipped,
    description: <SyncFailedDescription />,
  },
  {
    label: 'staking.status.step_withdraw_commit',
    status: GQLWithdrawStatusType.WaitingCommittingToL1,
  },
  {
    label: 'staking.status.step_withdraw_finalization',
    status: GQLWithdrawStatusType.WaitingFinalization,
  },
  {
    label: 'staking.status.step_withdraw_ready',
    status: GQLWithdrawStatusType.ReadyToProcessWithdraw,
  },
];
