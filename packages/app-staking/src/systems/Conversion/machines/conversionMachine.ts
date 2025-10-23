import type { BN } from 'fuels';
import { type StateFrom, assign, createMachine } from 'xstate';
import type { StepAllowanceFormValues } from '../hooks/useStepAllowanceForm';

type ConversionMachineContext = {
  amount: BN;
};

type ConversionMachineEvent =
  | {
      type: 'GO_TO_CONVERT';
      input: StepAllowanceFormValues;
    }
  | {
      type: 'SUBMIT';
    };

export const conversionMachine = createMachine(
  {
    predictableActionArguments: true,
    tsTypes: {} as import('./conversionMachine.typegen').Typegen0,
    schema: {
      context: {} as ConversionMachineContext,
      events: {} as ConversionMachineEvent,
    },
    id: 'conversionMachine',
    initial: 'allowance',
    states: {
      allowance: {
        on: {
          GO_TO_CONVERT: {
            actions: ['assignAmount'],
            target: 'convert',
          },
        },
      },
      convert: {
        on: { SUBMIT: 'submit' },
      },
      submit: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      assignAmount: assign({
        amount: (_, ev) => ev.input.amount,
      }),
    },
  },
);

type ConversionMachine = typeof conversionMachine;
export type ConversionMachineState = StateFrom<ConversionMachine>;
