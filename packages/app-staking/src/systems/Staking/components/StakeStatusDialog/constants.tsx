import { StakeStatus } from '../../machines/stakeStatusDialogMachine';

export const STAKE_STEPS = [
  {
    status: StakeStatus.TransactionSent,
    label: 'Transaction Sent',
  },
  {
    status: StakeStatus.WaitingSync,
    label: 'Waiting for Synchronization',
  },
  {
    status: StakeStatus.Skipped,
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
