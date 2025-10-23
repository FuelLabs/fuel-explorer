import { RedelegateStatus } from '../../machines/redelegateStatusDialogMachine';

export const REDELEGATE_STEPS = [
  {
    status: RedelegateStatus.TransactionSent,
    label: 'Transaction Sent',
  },
  {
    status: RedelegateStatus.WaitingSync,
    label: 'Waiting for Synchronization',
  },
  {
    status: RedelegateStatus.Skipped,
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
];
