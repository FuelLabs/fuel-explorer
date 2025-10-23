import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';

export const WITHDRAW_STEPS = [
  {
    label: 'Withdraw transaction sent...',
    status: GQLWithdrawStatusType.TransactionSent,
  },
  {
    label: 'Synchronizing with Sequencer...',
    status: GQLWithdrawStatusType.WaitingSync,
  },
  {
    label: 'Synchronization Failed',
    status: GQLWithdrawStatusType.Skipped,
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
    label: 'Sequencer committing to L1...',
    status: GQLWithdrawStatusType.WaitingCommittingToL1,
  },
  {
    label: 'Waiting for finalization...',
    status: GQLWithdrawStatusType.WaitingFinalization,
  },
  {
    label: 'Ready for withdrawal...',
    status: GQLWithdrawStatusType.ReadyToProcessWithdraw,
  },
];
