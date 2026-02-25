import type { QueryClient } from '@tanstack/react-query';
import { FuelToken, type HexAddress, TOKENS } from 'app-commons';
import { type BN, bn } from 'fuels';
import type { PublicClient, WalletClient } from 'viem';
import { type StateFrom, assign, createMachine } from 'xstate';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import {
  type PendingTransaction,
  PendingTransactionTypeL1,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import {
  type AssetRate,
  AssetsRateService,
} from '~staking/systems/Core/services/AssetsRateService';
import {
  type OperationBlockingInfo,
  checkOperationBlocking,
} from '~staking/systems/Core/utils/blocking';
import { bigIntToBn } from '~staking/systems/Core/utils/bn';
import { getShortError } from '~staking/systems/Core/utils/getShortError';
import {
  QUERY_KEYS,
  addPendingL1Transaction,
} from '~staking/systems/Core/utils/query';
import { getBlockingInfoFromStakingEvents } from '~staking/systems/Staking/services/stakingEvents';
import { stakingTxDialogStore } from '~staking/systems/Staking/store/stakingTxDialogStore';
import { FinalizationPeriodService } from '../services/finalizationPeriodService';
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
  // Transaction tracking
  transactionHash?: HexAddress;
  // Blocking state
  isBlocked?: boolean;
  blockingMessage?: string;
  finalizationPeriod?: string;
}

type UndelegateNewDialogServices = {
  getFee: {
    data: BN;
  };
  getAssetsRate: {
    data: AssetRate[];
  };
  checkBlocking: {
    data: OperationBlockingInfo;
  };
  submitUndelegate: {
    data: HexAddress;
  };
  getFinalizationPeriod: {
    data: string;
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
  | { type: 'RECHECK_BLOCKING' }
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
      RECHECK_BLOCKING: {
        target: 'checkingBlocking',
        cond: (ctx) => !!ctx.queryClient,
      },
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
          finalizationPeriod: {
            initial: 'fetching',
            states: {
              fetching: {
                invoke: {
                  src: 'getFinalizationPeriod',
                  onDone: {
                    target: 'success',
                    actions: assign({
                      finalizationPeriod: (_, event) => event.data,
                    }),
                  },
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
            target: 'checkingBlocking',
            actions: assign({
              fee: (_, event) => event.data,
            }),
          },
        },
      },
      checkingBlocking: {
        tags: ['reviewPage'],
        invoke: {
          src: 'checkBlocking',
          onDone: {
            target: 'reviewing',
            actions: assign((_, event) => ({
              isBlocked: event.data.isBlocked,
              blockingMessage: event.data.blockingMessage,
            })),
          },
          onError: {
            target: 'reviewing',
            actions: assign(() => ({
              isBlocked: false,
              blockingMessage: undefined,
            })),
          },
        },
      },
      reviewing: {
        tags: ['reviewPage'],
        on: {
          CONFIRM: {
            target: 'submitting',
            cond: (ctx) => !ctx.isBlocked,
          },
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
            actions: assign((ctx, event) => {
              const txHash = event.data;

              const accountAddress = ctx.walletClient?.account?.address;
              if (ctx.queryClient && accountAddress) {
                addPendingL1Transaction(ctx.queryClient, accountAddress, {
                  type: PendingTransactionTypeL1.Undelegate,
                  layer: 'l1',
                  hash: txHash,
                  token: TOKENS[FuelToken.V2].token,
                  symbol: 'FUEL',
                  formatted: ctx.amount?.format() ?? '0',
                  validator: ctx.validator,
                });
              }

              UndelegateNewService.showSuccessToast(txHash);

              return {
                transactionHash: txHash,
              };
            }),
          },
          onError: {
            // Return to checkingBlocking to recheck blocking state after error
            target: 'checkingBlocking',
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
      checkBlocking: async (context) => {
        const address = context.walletClient?.account?.address;
        // Normalize address to lowercase for consistency
        const normalizedAddress = address?.toLowerCase();
        const queryKey = normalizedAddress
          ? QUERY_KEYS.pendingTransactions(normalizedAddress)
          : undefined;

        let pendingTransactions: PendingTransaction[] | undefined = undefined;

        if (context.queryClient && queryKey) {
          // First try to get from query cache
          pendingTransactions =
            context.queryClient.getQueryData<PendingTransaction[]>(queryKey);

          // Check if query is hydrated
          const queryState = context.queryClient.getQueryState(queryKey);
          const isHydrated = queryState?.status === 'success';

          // If not hydrated or empty, try to get from all queries (case-insensitive)
          if (
            !isHydrated ||
            !pendingTransactions ||
            pendingTransactions.length === 0
          ) {
            const allEntries = context.queryClient.getQueriesData<
              PendingTransaction[]
            >({
              queryKey: QUERY_KEYS.pendingTransactions(),
            });

            // Filter by normalized address
            const merged = allEntries
              .filter(([key]) => {
                const keyParts = Array.isArray(key) ? key : [];
                const keyAddress =
                  typeof keyParts[keyParts.length - 1] === 'string'
                    ? (keyParts[keyParts.length - 1] as string)
                    : '';
                return (
                  keyAddress && keyAddress.toLowerCase() === normalizedAddress
                );
              })
              .flatMap(([, data]) => data ?? []);

            if (merged.length > 0) {
              pendingTransactions = merged;
            }
          }
        }

        if (!pendingTransactions || pendingTransactions.length === 0) {
          return getBlockingInfoFromStakingEvents(
            normalizedAddress,
            PendingTransactionTypeL1.Undelegate,
            context.validator,
          );
        }

        return checkOperationBlocking(
          pendingTransactions,
          PendingTransactionTypeL1.Undelegate,
          context.validator,
        );
      },
      getFinalizationPeriod: async (ctx) => {
        return FinalizationPeriodService.fetchFinalizationPeriod(
          ctx.publicClient as any,
        );
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
    return (
      (state as any).matches('gettingReviewDetails') ||
      (state as any).matches('checkingBlocking')
    );
  },
  // New selector to check if in any review-related state
  isReviewPage: (state: UndelegateNewDialogMachineState) =>
    state.hasTag('reviewPage'),
  // Composite states
  isLoading: (state: UndelegateNewDialogMachineState) => {
    return (
      (state as any).matches('submitting') ||
      (state as any).matches('gettingReviewDetails')
    );
  },
  // Blocking selectors
  isBlocked: (context: UndelegateNewDialogContext) => context.isBlocked,
  getBlockingMessage: (context: UndelegateNewDialogContext) =>
    context.blockingMessage,
  getFinalizationPeriod: (context: UndelegateNewDialogContext) =>
    context.finalizationPeriod,
};
