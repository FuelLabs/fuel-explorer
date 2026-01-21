import type { QueryClient } from '@tanstack/react-query';
import { FuelToken, type HexAddress, TOKENS } from 'app-commons';
import type { BN } from 'fuels';
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
import { ClaimRewardNewService } from '~staking/systems/Staking/services/claimRewardNewService';
import { stakingTxDialogStore } from '~staking/systems/Staking/store/stakingTxDialogStore';

export interface ClaimRewardNewDialogContext {
  validator: SequencerValidatorAddress;
  // Clients for contract interaction
  publicClient?: PublicClient | null;
  walletClient?: WalletClient | null;
  queryClient?: QueryClient | null;
  // Fee and rates
  fee: BN;
  rates: AssetRate[];
  // Amount to claim
  amount: BN | null;
  // Errors
  claimRewardError?: string | null;
  // Transaction tracking
  transactionHash?: HexAddress;
  // Blocking state
  isBlocked?: boolean;
  blockingMessage?: string;
}

type ClaimRewardNewDialogMachineServices = {
  getFee: {
    data: BN;
  };
  getAssetsRate: {
    data: AssetRate[];
  };
  checkBlocking: {
    data: OperationBlockingInfo;
  };
  submitClaimReward: {
    data: HexAddress;
  };
};

export type ClaimRewardNewDialogEvent =
  | { type: 'SET_VALIDATOR'; validator: string | undefined }
  | {
      type: 'SET_CLIENTS';
      publicClient: PublicClient;
      walletClient: WalletClient;
      queryClient: QueryClient;
    }
  | { type: 'SET_AMOUNT'; amount: BN | null }
  | { type: 'CONFIRM' }
  | { type: 'CLOSE' };

export const claimRewardNewMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDswHcDqBLALgCwgCcBDNAES2IBsB7KAYgGEAZAeQGUBRAbQAYBdRKAAONWLiw1kQkAA9EAFgBMAGhABPRAA5eAdgB0WhQGZTS3gDZdATl7HrAXwdrUmXARLlKtKPrTEJZCgASWQJajJiHGJ6LgAVAH0AIQBBZhSAOUYeARlRcRxJaSQ5RCUtAwtbXmtdCy0tax1dNU0EY2V9Uy0ARjsAVn6lXQaLfqcXdGx8IlIKajo-AMKg0PCqSOjYzkTU9KyeHsES-IkpGXkEJXr9JT7rBT0te1rTVsR7JX0LHutjKxGVWMuh6ExArmmHjm3kW-kCITChQiURi8QSLGCnAycXYfGOIjEZ2KoEuSmsXz6Ch6FnqvEGPSGFneVwUBl4WnKjV+5jsFjBEPcsy8C18cJWCPWm1RO3RzEx2NxRzyhMK5xKpJudxqjxGL10bw0ik6Jh6Wh+-WMPWM-VNCn5U0FnnmPiW8LWSI2KO2iR2AAkEilGIxWABVbF45UFIoXMo075KJTGRpVO5mizGZkMnqGYZWBTPHqp-p85zgh0zJ0w0XLLCrRHeKXehJ+gNB0PhpUnFXR9WxrS3e4657WV4Zw0IBTk24KEyDYb9OpjXT2twV6Ei13igBiNEIKQAtjQAK7IHBNlIAWXbcQjXajapJiAe2dsid0vF4M-svFU4+M7MMDpzGuXR+jNYwV0hIVnVhGsgh3PdDxPM92BDJIL2CG9cjvIkYwQRprH0fprB6U0hi0Yj7B6ZkhkI0xlD0Rl03+SDHXXF0xVrKAEIPY9T1iNCMJvTsCXvYlSgQWwDEef4aQtGTymZO5jCIkYmgLfo9BsEtJlXKFhQ4uDuN3XjkPoAAlTgADVMQwW9RNw3t8JHIiSLI8pKJIzNdC+JQTEsCj+lZJoZ1YtcDMWAAzMAcAAYzwLj3W8cyojgegICkMB9FrAA3GgAGssoFcKYN8aK4oSut1hSnA4AQXKaFiqIijxeyQFOVVxI1FTLF0HzLQ5BQLB-GjOjpepJx-XhTStML9NK-RyvixL62oGq0oy1BsuQPLCv0Yr5qrRaYuWqqPXW2B6p2xrmqkVqRPa7sHwk64eoBRNTT84bfzadMFC6T8lGLEwGj6nSyz06CjqWyqJXO1LYHoMBCEIXd9GEKgoki3d9328tDo3GGVuqhGrryprOta7CHM6vDXv0Xr+s+oaRvHHyLCIm0aSTBcF3sOaoY3HLqCwCBmrOhsvTajqe0fBArTsfQSKpX5huBWjmSsXyQRBKoSN6QsBcrIWRbF8UkuRLZuAemXnsuBWVOV0jrDV0CyRon99BnR4s3Al27VLA7BZdGAcHFMgYoCKhEc2rLYGiWq8ch42Q5i8PI6waPpaerrECGTNC37PzdGUdMbBMS0jfYxZQ-T6JM5jzL9Hj1Kk6glOa7TriI-rrObZzvCenfL4KIeG0rVqNWlKnCxJ0tILhg-MCIMD-Hg87sPu4z6Pjqy+KwFi-KtzAMB0qbhq9qDjvfFrrfe9gXf9H3w-j7AMmbspgRs7EunqX+io6gVEGCMH8Y42h3EIi7CoVIAo6DLlXCKN8u5BB7lHB+0U954APkfE+Z8toXyKmva++hb4oO3ugk+T8sEvxPu-CmLUv79x-k5O4s9DBgyAQuHQiZmSWl8tSHo+Z8ygR-DSBBC1SFQFQQ3fQJBaoP2ILAWAMVYDrTwVlAhbc2KIJIcgqR5DZEI30Io5ROBVGpTobdZAVN8SPWYXLBMpFvhAL+EFNMTJxw2hUoCIaNozS9BHOIo6kjpE7zkXAYxSiVFqNjttXahDk7VyQZvMh99DHyMiaY8xtVLGf34NbWxttc5XDuNmeooFXH5hpB436lgGbdHZnSLmK9dLtySbIsAOUsDoC4kwVgGQtzBHMheb+jk5ZUn6JzIaFF7DfRpAXIwXRXyCPTLYbkQSNywCPAAI33LgcU6i4kFQSW0nRWzdn7K4rkhh+TqZ2LGRJQK+hCyaT0LYaZNTECkQAqIz8VQxjcw2S6c5eyUkMGRqjQg6NMY4GxoQXGV92kgsuUEa5d0v53KKXhCZUz6gWhdqIz58sagUmUM0BMdgExaCBVFWsIsABevTZAt0TsQSKtVCAAAp-wfgAJT0ERToyKdKqBYEZUEUZtMnKkUWcpYGH4migRaOOUi-59AlxLnoYYSZ8xKBpb4CFu5zxXjDFhQpA8nIEVcjK8inlqJ-jNLcSww07BDT8qRfV+hDWEAEuhTCkrZYSSHp7UeChx72DqHYZkjx+zkkEZ8BkNIgYtIhqcha3rfVCQKZGB59sQT9mGtSDyPlvbTy+LPP4DJlDvjpM8T1GbLI2U4HZTFFq5bBpHsRMNqrJ5Rs8Z+Z5i4LQLlnqyEsgcaAQDgDIQVpUc1SrlgAWiJYusaH4PwNCHi7KlnrOIS0tsQedgbLhsIeIvMYfwhpUWjZ0SilobBWj5uDWdR093GUQnxHAR67aICqNmMkVRLAjtqEPaNNQGaNCpO+WS+ZPVE33VQC637inKE1sYbWg0aiFnMLB1eiSdHC1FWbYmHopTIcHn0SZdR-zpgXOYEE9q2i0S9tYYsqz2SBQDq07REi9GhPgDhBdQbIPfF+BUXkFhzBgWjZM9DZJrgkTGGGn4nqQkGIweR6VZ7ROKok1JrQmZ0PfDDToC0QEQrLjw2m4JfH1OUOfjgsAmn20jl4Dp8Tsl9NKSMwyckTRJPsi1eMKzPGbNgv44-LZsVYpwFgIwahjnnMvX8gOSTKtrReKUo8Z5n4h7fkTMWdkqnbNpIwV6lGu54vYNfkl0kKXWHusfZlv8RnrQMiYiBKpxXwsGPCQJmmx6vnaZ+Lpzztbo3XC9rRskYaPp6pCyVMLdc0HpIiSY6JqVatDdsO56DSbxueKBkrPqP5tUNHMNShbBNU49bSX15uR5ouxZSFEsx60ttXCGCpZ4as3FWgZGAvOpglapiaFNf4tRuvLZkfd71L2snvcE4Nz7iZAK-fzP9i0mtJvUnJHUEB9QKKesIJ07paAuIfaBmUhMSYXZxvcQXRWk4Rx-ATCMHDnrkVgo+5JlS88+i-EGI8BMjOObrrsPGgin44MirFRTpHP7iVsITGMH7VLC4FzJF7T8BKyI-mIjL5ADLIAfYVgYC7GX2SFipIz-6oExg04eDYVj9aKuEFN5pfs+pnhzzBmG3hU53m0RGH1Wwl3uOLY3LFWgyiIAe-+kvUpQvrcl2ZLqLoxZrRAaaCzpwTggA */
    id: 'claimRewardNew',
    predictableActionArguments: true,
    tsTypes: {} as import('./claimRewardNewDialogMachine.typegen').Typegen0,
    schema: {
      context: {} as ClaimRewardNewDialogContext,
      events: {} as ClaimRewardNewDialogEvent,
      services: {} as ClaimRewardNewDialogMachineServices,
    },
    initial: 'waitingInitialData',
    on: {
      CLOSE: 'closed',
    },
    states: {
      waitingInitialData: {
        always: {
          target: 'gettingReviewDetails',
          cond: (ctx) => {
            return (
              !!ctx.validator &&
              !!ctx.publicClient &&
              !!ctx.walletClient &&
              !!ctx.queryClient
            );
          },
        },
        on: {
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
          SET_AMOUNT: {
            actions: assign({
              amount: (_, event) => event.amount,
            }),
          },
        },
      },
      gettingReviewDetails: {
        type: 'parallel',
        states: {
          gettingFee: {
            initial: 'fetching',
            states: {
              fetching: {
                tags: ['reviewPage'],
                invoke: {
                  src: 'getFee',
                  onDone: {
                    // cond: (_, event) => !!event.data.fee?.gt(0),
                    target: 'success',
                    actions: assign({
                      fee: (_, event) => event.data,
                    }),
                  },
                },
              },
              success: {
                type: 'final',
              },
            },
          },
          gettingRates: {
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
          target: 'checkingBlocking',
        },
      },
      checkingBlocking: {
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
        on: {
          CONFIRM: {
            target: 'submitting',
            cond: (ctx) => !ctx.isBlocked,
          },
        },
      },
      submitting: {
        entry: assign(() => {
          return {
            claimRewardError: null,
          };
        }),
        invoke: {
          src: 'submitClaimReward',
          onDone: {
            target: 'finalized',
            actions: assign((ctx, event) => {
              const txHash = event.data;

              if (ctx.queryClient && ctx.walletClient?.account?.address) {
                addPendingL1Transaction(
                  ctx.queryClient,
                  ctx.walletClient.account.address,
                  {
                    type: PendingTransactionTypeL1.ClaimReward,
                    layer: 'l1',
                    hash: txHash,
                    token: TOKENS[FuelToken.V2].token,
                    symbol: 'FUEL',
                    formatted: ctx.amount?.format() ?? '0',
                    validator: ctx.validator,
                  },
                );
              }

              ClaimRewardNewService.showSuccessToast(txHash);

              return {
                transactionHash: txHash,
              };
            }),
          },
          onError: {
            target: 'reviewing',
            actions: assign({
              claimRewardError: (_, event) => {
                if (event.data instanceof Error && event.data?.message) {
                  if (
                    event.data?.message.includes('User rejected the request')
                  ) {
                    return 'Transaction cancelled. You rejected the request in your wallet.';
                  }

                  return event.data?.message;
                }

                return 'Error submitting withdraw';
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
          await ClaimRewardNewService.estimateClaimRewardFee(context);
        return bigIntToBn(result);
      },
      getAssetsRate: async () => {
        const rates = await AssetsRateService.getAssetsRate();
        return rates;
      },
      checkBlocking: (context) => {
        const address = context.walletClient?.account?.address;
        const pendingTransactions = address
          ? context.queryClient?.getQueryData<PendingTransaction[]>(
              QUERY_KEYS.pendingTransactions(address),
            )
          : undefined;
        return Promise.resolve(
          checkOperationBlocking(
            pendingTransactions,
            PendingTransactionTypeL1.ClaimReward,
            context.validator,
          ),
        );
      },
      submitClaimReward: async (context) => {
        const result = await ClaimRewardNewService.submitClaimReward(context);
        return result;
      },
    },
  },
);

export type ClaimRewardNewDialogMachine = typeof claimRewardNewMachine;
export type ClaimRewardNewDialogMachineState =
  StateFrom<ClaimRewardNewDialogMachine>;

export const claimRewardNewMachineSelectors = {
  getFee: (context: ClaimRewardNewDialogContext) => context.fee,
  getRates: (context: ClaimRewardNewDialogContext) => context.rates,

  // Error selectors
  getClaimRewardError: (context: ClaimRewardNewDialogContext) =>
    context.claimRewardError,
  getShortError: (context: ClaimRewardNewDialogContext) => {
    const error = context.claimRewardError ? context.claimRewardError : null;
    return error ? getShortError(error) : null;
  },
  isSubmitting: (state: ClaimRewardNewDialogMachineState) =>
    state.matches('submitting'),
  isReviewing: (state: ClaimRewardNewDialogMachineState) =>
    state.matches('reviewing'),
  isGettingReviewDetails: (state: ClaimRewardNewDialogMachineState) =>
    state.matches('gettingReviewDetails'),
  // Composite states
  isLoading: (state: ClaimRewardNewDialogMachineState) => {
    return (
      state.matches('submitting') ||
      (state as any).matches('gettingReviewDetails')
    );
  },
  // Blocking selectors
  isBlocked: (context: ClaimRewardNewDialogContext) => context.isBlocked,
  getBlockingMessage: (context: ClaimRewardNewDialogContext) =>
    context.blockingMessage,
};
