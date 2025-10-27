import { UndelegateStatus } from '../../machines/undelegateStatusDialogMachine';

export const UNDELEGATE_STEPS = [
  {
    status: UndelegateStatus.TransactionSent,
    label: 'Transaction Sent',
  },
  {
    status: UndelegateStatus.WaitingSync,
    label: 'Waiting for Synchronization',
  },
  {
    status: UndelegateStatus.Skipped,
    label: 'Synchronization Failed',
    description: (
      <>
        Likely due to the balance not being available at the moment of
        synchronization. If you believe the sync should have been successful,
        please contact Fuel support on{' '}
        <a
          href="https://discord.com/invite/xfpK4Pe"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Discord
        </a>
        .
      </>
    ),
  },
  {
    status: UndelegateStatus.WaitingUnbonding,
    label: 'Waiting for Unbonding',
  },
];
