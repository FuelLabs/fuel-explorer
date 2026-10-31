import { ClaimStatus } from '../../machines/claimRewardStatusDialogMachine';
import { SyncFailedDescription } from '../StatusItem/SyncFailedDescription';

export const CLAIM_STEPS = [
  {
    status: ClaimStatus.TransactionSent,
    label: 'staking.status.step_sent',
  },
  {
    status: ClaimStatus.WaitingSync,
    label: 'staking.status.step_waiting_sync',
  },
  {
    status: ClaimStatus.Skipped,
    label: 'staking.status.step_sync_failed',
    description: <SyncFailedDescription />,
  },
];
