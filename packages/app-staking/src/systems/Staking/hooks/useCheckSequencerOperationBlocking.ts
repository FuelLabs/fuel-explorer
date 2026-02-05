import { useMemo } from 'react';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import {
  type PendingTransactionTypeL1,
  usePendingTransactions,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import { checkOperationBlocking } from '~staking/systems/Core/utils/blocking';
import type { OperationBlockingInfo } from '~staking/systems/Core/utils/blocking';

export const useCheckSequencerOperationBlocking = (
  action: PendingTransactionTypeL1,
  validatorAddress?: SequencerValidatorAddress,
): OperationBlockingInfo => {
  const { data: pendingTransactions } = usePendingTransactions();

  return useMemo(() => {
    return checkOperationBlocking(
      pendingTransactions,
      action,
      validatorAddress,
    );
  }, [pendingTransactions, action, validatorAddress]);
};
