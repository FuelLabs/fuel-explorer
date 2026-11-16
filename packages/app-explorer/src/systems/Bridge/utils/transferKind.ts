import {
  BRIDGE_STEP_ID,
  BRIDGE_STEP_STATUS_ID,
  type BridgeStep,
} from '~portal/systems/Bridge/components/BridgeSteps/constants';

export type TransferKind = 'loading' | 'action' | 'progress' | 'settled';

export type TransferState = {
  steps?: BridgeStep[];
  settled: boolean;
};

export function currentStep(steps: BridgeStep[] | undefined) {
  return steps?.find((s) => s.isSelected) ?? steps?.find((s) => !s.isDone);
}

export function kindOf({ steps, settled }: TransferState): TransferKind {
  if (settled) return 'settled';
  if (!steps) return 'loading';
  const current = currentStep(steps);
  // Automatic confirmations need nothing from the user.
  if (
    current?.id === BRIDGE_STEP_ID.confirmTransaction &&
    !current.isLoading &&
    current.statusId !== BRIDGE_STEP_STATUS_ID.automatic
  ) {
    return 'action';
  }
  return 'progress';
}
