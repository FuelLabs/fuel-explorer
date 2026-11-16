import { UndelegateStatus } from '../../machines/undelegateStatusDialogMachine';
import { SyncFailedDescription } from '../StatusItem/SyncFailedDescription';

export const UNDELEGATE_STEPS = [
  {
    status: UndelegateStatus.TransactionSent,
    label: 'staking.status.step_sent',
  },
  {
    status: UndelegateStatus.WaitingSync,
    label: 'staking.status.step_waiting_sync',
  },
  {
    status: UndelegateStatus.Skipped,
    label: 'staking.status.step_sync_failed',
    description: <SyncFailedDescription />,
  },
  {
    status: UndelegateStatus.WaitingUnbonding,
    label: 'staking.status.step_unbonding',
  },
];
