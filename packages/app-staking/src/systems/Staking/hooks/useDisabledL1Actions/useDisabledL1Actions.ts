import { useVerifySelectedChain } from 'app-commons';
import { useMemo } from 'react';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import {
  type PendingSequencerOperationType,
  type PendingTransactionTypeL1,
  isPendingSequencerOperation,
  usePendingTransactions,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import {
  GLOBAL_DISABLED_ACTIONS,
  VALIDATOR_SPECIFIC_DISABLED_ACTIONS,
  getBlockingReason,
} from './constants';

export interface DisabledL1ActionsResult {
  disabledActions: Partial<Record<PendingTransactionTypeL1, boolean>>;
  disabledReasons: Partial<Record<PendingTransactionTypeL1, string>>;
}

export const useDisabledL1Actions = (
  validatorAddress?: SequencerValidatorAddress,
): DisabledL1ActionsResult => {
  const { data: pendingTransactions } = usePendingTransactions();
  const { isChainSupported } = useVerifySelectedChain();

  const result = useMemo(() => {
    let _disabledActions: Partial<Record<PendingTransactionTypeL1, boolean>> =
      {};
    const _disabledReasons: Partial<Record<PendingTransactionTypeL1, string>> =
      {};

    if (!isChainSupported) {
      const allGlobals = Object.values(GLOBAL_DISABLED_ACTIONS).reduce(
        (acc, curr) => Object.assign(acc, curr),
        {},
      );
      _disabledActions = { ..._disabledActions, ...allGlobals };
    }

    for (const tx of pendingTransactions || []) {
      if (tx.completed) continue;

      // Get disabled actions from both L1 and sequencer operation types
      const disabledActionsByValidator =
        tx?.type && VALIDATOR_SPECIFIC_DISABLED_ACTIONS[tx.type];
      const disabledActionsByTransactionType =
        tx?.type && GLOBAL_DISABLED_ACTIONS[tx.type];

      // For sequencer operations, also check validator-specific rules
      if (disabledActionsByValidator) {
        // For sequencer operations: check if it matches the validator address
        if (isPendingSequencerOperation(tx)) {
          if (validatorAddress === tx.validator) {
            // Add disabled actions
            _disabledActions = {
              ..._disabledActions,
              ...disabledActionsByValidator,
            };
            // Add reasons for each disabled action
            const reason = getBlockingReason(
              tx.type as PendingSequencerOperationType,
              'processing',
            );
            for (const action of Object.keys(
              disabledActionsByValidator,
            ) as PendingTransactionTypeL1[]) {
              _disabledReasons[action] = reason;
            }
          }
        } else {
          // For L1 transactions: check validator address for specific actions
          if (validatorAddress === tx.validator) {
            _disabledActions = {
              ..._disabledActions,
              ...disabledActionsByValidator,
            };
          }
        }
      }

      if (disabledActionsByTransactionType) {
        _disabledActions = {
          ..._disabledActions,
          ...disabledActionsByTransactionType,
        };

        // Add reasons for sequencer operations blocking global actions
        if (isPendingSequencerOperation(tx)) {
          const reason = getBlockingReason(
            tx.type as PendingSequencerOperationType,
            'processing',
          );
          for (const action of Object.keys(
            disabledActionsByTransactionType,
          ) as PendingTransactionTypeL1[]) {
            _disabledReasons[action] = reason;
          }
        }
      }
    }

    return {
      disabledActions: _disabledActions,
      disabledReasons: _disabledReasons,
    };
  }, [pendingTransactions, validatorAddress, isChainSupported]);

  return result;
};
