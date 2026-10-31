import { StakeStatus } from '../../machines/stakeStatusDialogMachine';
import { SyncFailedDescription } from '../StatusItem/SyncFailedDescription';

export const STAKE_STEPS = [
  {
    status: StakeStatus.TransactionSent,
    label: 'staking.status.step_sent',
  },
  {
    status: StakeStatus.WaitingSync,
    label: 'staking.status.step_waiting_sync',
  },
  {
    status: StakeStatus.Skipped,
    label: 'staking.status.step_sync_failed',
    description: <SyncFailedDescription />,
  },
];
