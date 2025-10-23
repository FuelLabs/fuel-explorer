import { ClaimStatus } from '../../machines/claimRewardStatusDialogMachine';

export const CLAIM_STEPS = [
  {
    status: ClaimStatus.TransactionSent,
    label: 'Transaction Sent',
  },
  {
    status: ClaimStatus.WaitingSync,
    label: 'Waiting for Synchronization',
  },
  {
    status: ClaimStatus.Skipped,
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
