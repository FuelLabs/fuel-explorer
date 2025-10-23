import type {
  GQLGenericStatusType,
  GQLUndelegateStatusType,
  GQLWithdrawStatusType,
} from '@fuel-explorer/graphql/sdk';
import type { StakingEvent } from '~staking/systems/Staking/types/l1/events';

export type StakingStep = {
  label: string;
  status:
    | keyof typeof GQLWithdrawStatusType
    | keyof typeof GQLUndelegateStatusType
    | keyof typeof GQLGenericStatusType;
  description?: string | React.ReactNode;
  getTxHash?: (info: StakingEvent['statusInfo']) => string | undefined;
  getETA?: (info: StakingEvent['statusInfo']) => string | undefined;
  network?: 'l1' | 'sequencer';
};

export type StakingStatusDialogStepProps = {
  step: StakingStep;
  isCompleted: boolean;
  isCurrent: boolean;
  statusInfo?: StakingEvent['statusInfo'] | null;
  eta?: string;
  isContractPaused?: boolean;
  currentTime: Date;
  isLoading: boolean;
  txHash?: string;
  isActionNeeded?: boolean;
  isProcessing?: boolean;
};
