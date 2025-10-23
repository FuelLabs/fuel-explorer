import { useVerifySelectedChain } from 'app-commons';
import { useMemo } from 'react';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import {
  type PendingTransactionTypeL1,
  usePendingTransactions,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import {
  GLOBAL_DISABLED_ACTIONS,
  VALIDATOR_SPECIFIC_DISABLED_ACTIONS,
} from './constants';

export const useDisabledL1Actions = (
  validatorAddress?: SequencerValidatorAddress,
) => {
  const { data: pendingTransactions } = usePendingTransactions();
  const { isChainSupported } = useVerifySelectedChain();

  const disabledActions = useMemo(() => {
    let _disabledActions: Partial<Record<PendingTransactionTypeL1, boolean>> =
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
      const disabledActionsByValidator =
        tx?.type &&
        VALIDATOR_SPECIFIC_DISABLED_ACTIONS[
          tx.type as PendingTransactionTypeL1
        ];
      const disabledActionsByTransactionType =
        tx?.type &&
        GLOBAL_DISABLED_ACTIONS[tx.type as PendingTransactionTypeL1];

      if (disabledActionsByValidator && validatorAddress === tx.validator) {
        _disabledActions = {
          ..._disabledActions,
          ...disabledActionsByValidator,
        };
      }

      if (disabledActionsByTransactionType) {
        _disabledActions = {
          ..._disabledActions,
          ...disabledActionsByTransactionType,
        };
      }
    }

    return _disabledActions;
  }, [pendingTransactions, validatorAddress, isChainSupported]);

  return disabledActions;
};
