import type { QueryClient } from '@tanstack/react-query';
import { FuelToken, type HexAddress, TOKENS } from 'app-commons';
import { type BN, bn } from 'fuels';
import type { PublicClient, WalletClient } from 'viem';
import { type StateFrom, assign, createMachine } from 'xstate';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import { PendingTransactionTypeL1 } from '~staking/systems/Core/hooks/usePendingTransactions';
import {
  type AssetRate,
  AssetsRateService,
} from '~staking/systems/Core/services/AssetsRateService';
import { bigIntToBn } from '~staking/systems/Core/utils/bn';
import { getShortError } from '~staking/systems/Core/utils/getShortError';
import { addPendingL1Transaction } from '~staking/systems/Core/utils/query';
import { stakingTxDialogStore } from '~staking/systems/Staking/store/stakingTxDialogStore';
import { UndelegateNewService } from '../services/undelegateNewService/undelegateNewService';

export interface UndelegateNewDialogContext {
  amount: BN | null;
  stakedAmount: BN;
  validator: SequencerValidatorAddress;
  // Clients for contract interaction
  publicClient?: PublicClient | null;
  walletClient?: WalletClient | null;
  queryClient?: QueryClient | null;
  // Fee and rates
  fee: BN;
  rates: AssetRate[];
  // Errors
  formError?: string | null;
  undelegateError?: string | null;
}

type UndelegateNewDialogServices = {
  getFee: {
    data: BN;
  };
  getAssetsRate: {
    data: AssetRate[];
  };
  submitUndelegate: {
    data: HexAddress;
  };
};

type UndelegateNewDialogEvents =
  | { type: 'SET_AMOUNT'; amount: BN | null }
  | { type: 'SET_VALIDATOR'; validator: string | undefined }
  | { type: 'SET_STAKED_AMOUNT'; stakedAmount: BN }
  | {
      type: 'SET_CLIENTS';
      publicClient: PublicClient;
      walletClient: WalletClient;
      queryClient: QueryClient;
    }
  | { type: 'REVIEW' }
  | { type: 'CONFIRM' }
  | { type: 'CLOSE' }
  | { type: 'BACK_TO_AMOUNT' };

export const undelegateNewDialogMachine = createMachine(
  {
    id: 'undelegate',
    predictableActionArguments: true,
    tsTypes: {} as import('./undelegateNewDialogMachine.typegen').Typegen0,
    schema: {
      context: {} as UndelegateNewDialogContext,
      events: {} as UndelegateNewDialogEvents,
      services: {} as UndelegateNewDialogServices,
    },
    initial: 'waitingInitialData',
    on: {
      CLOSE: 'closed',
    },
    states: {
      waitingInitialData: {
        always: {
          target: 'waitingForAmount',
          cond: (ctx) => {
            return (
              !!ctx.validator &&
              !!ctx.stakedAmount &&
              ctx.stakedAmount.gt(0) &&
              !!ctx.publicClient &&
              !!ctx.walletClient &&
              !!ctx.queryClient
            );
          },
        },
        on: {
          SET_STAKED_AMOUNT: {
            actions: assign({
              stakedAmount: (_, event) => event.stakedAmount,
            }),
          },
          SET_CLIENTS: {
            actions: assign((_, event) => ({
              publicClient: event.publicClient,
              walletClient: event.walletClient,
              queryClient: event.queryClient,
            })),
          },
          SET_VALIDATOR: {
            actions: assign({
              validator: (_, event) =>
                event.validator as SequencerValidatorAddress,
            }),
          },
        },
      },
      waitingForAmount: {
        type: 'parallel',
        states: {
          amount: {
            initial: 'idle',
            states: {
              idle: {
                on: {
                  SET_AMOUNT: {
                    actions: assign((ctx, event) => {
                      const amountIsLowerThanStaked = ctx.stakedAmount.lt(
                        bn(event.amount),
                      );

                      return {
                        amount: event.amount,
                        formError: amountIsLowerThanStaked
                          ? 'Not enough staked tokens to undelegate'
                          : null,
                        undelegateError: null,
                      };
                    }),
                  },
                  REVIEW: [
                    {
                      target: 'success',
                      cond: (ctx) => !ctx.formError,
                    },
                  ],
                },
              },
              success: {
                type: 'final',
              },
            },
          },
          rates: {
            initial: 'fetching',
            states: {
              fetching: {
                tags: ['loading'],
                invoke: {
                  src: 'getAssetsRate',
                  onDone: [
                    {
                      target: 'success',
                      actions: assign({
                        rates: (_, event) => event.data,
                      }),
                    },
                  ],
                  onError: {
                    target: 'success',
                  },
                },
              },
              success: {
                type: 'final',
              },
            },
          },
        },
        onDone: {
          target: 'gettingReviewDetails',
        },
      },
      gettingReviewDetails: {
        tags: ['reviewPage'],
        invoke: {
          src: 'getFee',
          onDone: {
            // cond: (_, event) => !!event.data.fee?.gt(0),
            target: 'reviewing',
            actions: assign({
              fee: (_, event) => event.data,
            }),
          },
        },
      },
      reviewing: {
        tags: ['reviewPage'],
        on: {
          CONFIRM: 'submitting',
          BACK_TO_AMOUNT: 'waitingForAmount',
        },
      },
      submitting: {
        tags: ['reviewPage'],
        entry: assign(() => {
          return {
            formError: null,
            undelegateError: null,
          };
        }),
        invoke: {
          src: 'submitUndelegate',
          onDone: {
            target: 'finalized',
            actions: (ctx, event) => {
              if (!ctx.queryClient) return;
              // Safe type checking for XState's "done" events
              if (!event.type.startsWith('done.invoke')) return;

              const txHash = event.data;

              if (ctx.queryClient && ctx.walletClient?.account?.address) {
                addPendingL1Transaction(
                  ctx.queryClient,
                  ctx.walletClient.account.address,
                  {
                    type: PendingTransactionTypeL1.Undelegate,
                    layer: 'l1',
                    hash: txHash,
                    token: TOKENS[FuelToken.V2].token,
                    symbol: 'FUEL',
                    formatted: ctx.amount?.format() ?? '0',
                    validator: ctx.validator,
                  },
                );
              }

              UndelegateNewService.showSuccessToast(txHash);
            },
          },
          onError: {
            target: 'reviewing',
            actions: assign({
              undelegateError: (_, event) => {
                if (event.data instanceof Error && event.data?.message) {
                  if (
                    event.data?.message.includes('User rejected the request')
                  ) {
                    return 'Transaction cancelled. You rejected the request in your wallet.';
                  }

                  return event.data?.message;
                }

                return 'Error submitting undelegate';
              },
            }),
          },
        },
      },
      finalized: {
        type: 'final',
        entry: 'closeDialog',
      },
      closed: {
        type: 'final',
        entry: 'closeDialog',
      },
    },
  },
  {
    actions: {
      closeDialog: () => {
        stakingTxDialogStore.send({ type: 'close' });
      },
    },
    services: {
      getFee: async (context) => {
        const result =
          await UndelegateNewService.estimateUndelegateFee(context);
        return bigIntToBn(result);
      },
      getAssetsRate: async () => {
        const rates = await AssetsRateService.getAssetsRate();
        return rates;
      },
      submitUndelegate: async (context) => {
        const result = await UndelegateNewService.submitUndelegate(context);
        return result;
      },
    },
  },
);

export type UndelegateNewDialogMachine = typeof undelegateNewDialogMachine;
export type UndelegateNewDialogMachineState =
  StateFrom<UndelegateNewDialogMachine>;

export const undelegateNewDialogMachineSelectors = {
  getAmount: (context: UndelegateNewDialogContext) => context.amount,
  getStakedAmount: (context: UndelegateNewDialogContext) =>
    context.stakedAmount,
  getFee: (context: UndelegateNewDialogContext) => context.fee,
  getRates: (context: UndelegateNewDialogContext) => context.rates,

  // Error selectors
  getUndelegateError: (context: UndelegateNewDialogContext) =>
    context.undelegateError,
  getFormError: (context: UndelegateNewDialogContext) => context.formError,
  getError: (context: UndelegateNewDialogContext) => {
    if (context.formError) return context.formError;
    if (context.undelegateError) return context.undelegateError;
    return null;
  },
  getShortError: (context: UndelegateNewDialogContext) => {
    const error =
      context.formError ||
      (context.undelegateError ? context.undelegateError : null);
    return error ? getShortError(error) : null;
  },

  isSubmitting: (state: UndelegateNewDialogMachineState) =>
    state.matches('submitting'),
  isReviewing: (state: UndelegateNewDialogMachineState) =>
    state.matches('reviewing'),
  isWaitingForAmount: (state: UndelegateNewDialogMachineState) =>
    state.matches('waitingForAmount'),
  isGettingReviewDetails: (state: UndelegateNewDialogMachineState) => {
    return (state as any).matches('gettingReviewDetails');
  },
  // New selector to check if in any review-related state
  isReviewPage: (state: UndelegateNewDialogMachineState) =>
    state.hasTag('reviewPage'),
  // Composite states
  isLoading: (state: UndelegateNewDialogMachineState) => {
    return (
      state.matches('submitting') ||
      (state as any).matches('gettingReviewDetails')
    );
  },
};
