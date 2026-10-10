import type { ReactNode } from 'react';

// No runtime dependencies, so unit tests can import the ids without the UI kit.
export const BRIDGE_STEP_ID = {
  submitToBridge: 'submit_to_bridge',
  settlement: 'settlement',
  confirmTransaction: 'confirm_transaction',
  receiveOnEthereum: 'receive_on_ethereum',
  receiveOnFuel: 'receive_on_fuel',
} as const;

export type BridgeStepId = (typeof BRIDGE_STEP_ID)[keyof typeof BRIDGE_STEP_ID];

export const BRIDGE_STEP_STATUS_ID = {
  automatic: 'automatic',
  action: 'action',
  actionRequired: 'action_required',
  done: 'done',
  waiting: 'waiting',
  timeLeft: 'time_left',
} as const;

export type BridgeStepStatusId =
  (typeof BRIDGE_STEP_STATUS_ID)[keyof typeof BRIDGE_STEP_STATUS_ID];

export type BridgeStep = {
  id: BridgeStepId;
  name: string;
  status: ReactNode;
  statusId?: BridgeStepStatusId;
  /** Estimated time left, only set with the `timeLeft` status id. */
  eta?: string;
  isLoading?: boolean;
  isDone?: boolean;
  isSelected?: boolean;
};
