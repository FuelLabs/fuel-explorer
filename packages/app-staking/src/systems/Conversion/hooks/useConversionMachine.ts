import { useMachine, useSelector } from '@xstate/react';
import { useCallback, useMemo } from 'react';
import type { StepAllowanceFormValues } from '~staking/systems/Conversion/hooks/useStepAllowanceForm';
import {
  type ConversionMachineState,
  conversionMachine,
} from '../machines/conversionMachine';

const selectors = {
  amount: (state: ConversionMachineState) => state.context.amount,
};

export const useConversionMachine = () => {
  const [state, send, actor] = useMachine(conversionMachine);
  const amount = useSelector(actor, selectors.amount);

  const step = useMemo<number>(() => {
    if (state.matches('allowance')) return 1;
    if (state.matches('convert')) return 2;
    return 0;
  }, [state]);

  const goToConvert = useCallback(
    (input: StepAllowanceFormValues) => {
      send({ type: 'GO_TO_CONVERT', input });
    },
    [send],
  );

  return {
    step,
    data: {
      amount,
    },
    handlers: { goToConvert },
  };
};
