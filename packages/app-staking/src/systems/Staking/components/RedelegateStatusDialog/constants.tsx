import { RedelegateStatus } from '../../machines/redelegateStatusDialogMachine';
import { SyncFailedDescription } from '../StatusItem/SyncFailedDescription';

export const REDELEGATE_STEPS = [
  {
    status: RedelegateStatus.TransactionSent,
    label: 'staking.status.step_sent',
  },
  {
    status: RedelegateStatus.WaitingSync,
    label: 'staking.status.step_waiting_sync',
  },
  {
    status: RedelegateStatus.Skipped,
    label: 'staking.status.step_sync_failed',
    description: <SyncFailedDescription />,
  },
];
