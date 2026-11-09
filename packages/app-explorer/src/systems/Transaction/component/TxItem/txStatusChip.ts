import type { TxChipKind } from './TxChip';

type StatusChip = { kind: TxChipKind; label: string };

const SUCCESS: StatusChip = { kind: 'success', label: 'tx.status.success' };
const FAILED: StatusChip = { kind: 'failed', label: 'tx.status.failed' };
const PENDING: StatusChip = { kind: 'pending', label: 'tx.status.pending' };

// Keyed by both the `statusType` of list/detail queries and the `__typename`
// of the status union, so every screen shares one map.
export const TX_STATUS_CHIP: Record<string, StatusChip> = {
  Success: SUCCESS,
  Failure: FAILED,
  Submitted: PENDING,
  Info: { kind: 'neutral', label: 'tx.status.info' },
  Warning: { kind: 'pending', label: 'tx.status.waiting' },
  SuccessStatus: SUCCESS,
  FailureStatus: FAILED,
  SubmittedStatus: PENDING,
  SqueezedOutStatus: { kind: 'failed', label: 'tx.status.squeezed_out' },
};
