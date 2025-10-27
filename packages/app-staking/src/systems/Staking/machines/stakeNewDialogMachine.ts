import type { QueryClient } from '@tanstack/react-query';
import type { HexAddress } from 'app-commons';
import { BN, bn } from 'fuels';
import type { PublicClient, WalletClient } from 'viem';
import { type StateFrom, assign, createMachine } from 'xstate';
import {
  type AssetRate,
  AssetsRateService,
} from '~staking/systems/Core/services/AssetsRateService';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';
import { bigIntToBn } from '~staking/systems/Core/utils/bn';
import { getShortError } from '~staking/systems/Core/utils/getShortError';
import { StakeNewService } from '~staking/systems/Staking/services/stakeNewService';
import { stakingTxDialogStore } from '~staking/systems/Staking/store/stakingTxDialogStore';

export interface StakeNewDialogContext {
  amount: BN | null;
  amountFromSequencer?: BN;
  amountFromL1?: BN;
  balanceL1?: BN;
  balanceSequencer?: BN;
  ethAccount: HexAddress | undefined;
  validator?: SequencerValidatorAddress;
  // Clients for contract interaction
  publicClient?: PublicClient | null;
  walletClient?: WalletClient | null;
  queryClient?: QueryClient | null;
  // Fee and rates
  fee: BN;
  rates: AssetRate[];
  // Errors
  formError?: string | null;
  stakeError?: string | null;
  approvalError?: string | null;
  // Token approval info
  amountFromL1Approved?: any;
  navigationDirection?: string;
}

type StakeNewMachineServices = {
  getFee: {
    data: BN;
  };
  getAssetsRate: {
    data: AssetRate[];
  };
  submitStake: {
    data: { l1?: HexAddress; sequencer?: HexAddress };
  };
  getEthTokenAllowance: {
    data: BN;
  };
  approveEthToken: {
    data: HexAddress;
  };
  waitingReceiptsApproveEthToken: {
    data: BN;
  };
};

export type StakeNewDialogEvent =
  | { type: 'SET_AMOUNT'; amount: BN | null }
  | { type: 'SET_BALANCE_L1'; balanceL1: BN }
  | { type: 'SET_BALANCE_SEQUENCER'; balanceSequencer: BN }
  | { type: 'SET_ETH_ACCOUNT'; ethAccount: HexAddress | undefined }
  | {
      type: 'SET_VALIDATOR';
      validator: SequencerValidatorAddress | undefined;
    }
  | {
      type: 'SET_CLIENTS';
      publicClient: PublicClient;
      walletClient: WalletClient;
      queryClient: QueryClient;
    }
  | { type: 'REVIEW' }
  | { type: 'CONFIRM' }
  | { type: 'CLOSE' }
  | { type: 'GO_TO_APPROVAL' }
  | { type: 'APPROVE' }
  | { type: 'BACK_TO_AMOUNT' }
  | { type: 'BACK_TO_REVIEW' };

export const stakeNewDialogMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDswHcDqBLALgCwgCcBDNAES2IBsB7KAYgGEAZAeQGUBRAbQAYBdRKAAONWLiw1kQkAA9EAFgBMAGhABPRAA5eAdgB0WhQGZTS3gDZdATl7HrAXwdrUmXARLlKtKPrTEJZCgASWQJajJiHGJ6LgAVAH0AIQBBZhSAOUYeARlRcRxJaSQ5RCUtAwtbXmtdCy0tax1dNU0EY2V9Uy0ARjsAVn6lXQaLfqcXdGx8IlIKajo-AMKg0PCqSOjYzkTU9KyeHsES-IkpGXkEJXr9JT7rBT0te1rTVsR7JX0LHutjKxGVWMuh6ExArmmHjm3kW-kCITChQiURi8QSLGCnAycXYfGOIjEZ2KoEuSmsXz6Ch6FnqvEGPSGFneVwUBl4WnKjV+5jsFjBEPcsy8C18cJWCPWm1RO3RzEx2NxRzyhMK5xKpJudxqjxGL10bw0ik6Jh6Wh+-WMPWM-VNCn5U0FnnmPiW8LWSI2KO2iR2AAkEilGIxWABVbF45UFIoXMo075KJTGRpVO5mizGZkMnqGYZWBTPHqp-p85zgh0zJ0w0XLLCrRHeKXehJ+gNB0PhpUnFXR9WxrS3e4657WV4Zw0IBTk24KEyDYb9OpjXT2twV6Ei13igBiNEIKQAtjQAK7IHBNlIAWXbcQjXajapJiAe2dsid0vF4M-svFU4+M7MMDpzGuXR+jNYwV0hIVnVhGsgh3PdDxPM92BDJIL2CG9cjvIkYwQRprH0fprB6U0hi0Yj7B6ZkhkI0xlD0Rl03+SDHXXF0xVrKAEIPY9T1iNCMJvTsCXvYlSgQWwDEef4aQtGTymZO5jCIkYmgLfo9BsEtJlXKFhQ4uDuN3XjkPoAAlTgADVMQwW9RNw3t8JHIiSLI8pKJIzNdC+JQTEsCj+lZJoZ1YtcDMWAAzMAcAAYzwLj3W8cyojgegICkMB9FrAA3GgAGssoFcKYN8aK4oSut1hSnA4AQXKaFiqIijxeyQFOVVxI1FTLF0HzLQ5BQLB-GjOjpepJx-XhTStML9NK-RyvixL62oGq0oy1BsuQPLCv0Yr5qrRaYuWqqPXW2B6p2xrmqkVqRPa7sHwk64eoBRNTT84bfzadMFC6T8lGLEwGj6nSyz06CjqWyqJXO1LYHoMBCEIXd9GEKgoki3d9328tDo3GGVuqhGrryprOta7CHM6vDXv0Xr+s+oaRvHHyLCIm0aSTBcF3sOaoY3HLqCwCBmrOhsvTajqe0fBArTsfQSKpX5huBWjmSsXyQRBKoSN6QsBcrIWRbF8UkuRLZuAemXnsuBWVOV0jrDV0CyRon99BnR4s3Al27VLA7BZdGAcHFMgYoCKhEc2rLYGiWq8ch42Q5i8PI6waPpaerrECGTNC37PzdGUdMbBMS0jfYxZQ-T6JM5jzL9Hj1Kk6glOa7TriI-rrObZzvCenfL4KIeG0rVqNWlKnCxJ0tILhg-MCIMD-Hg87sPu4z6Pjqy+KwFi-KtzAMB0qbhq9qDjvfFrrfe9gXf9H3w-j7AMmbspgRs7EunqX+io6gVEGCMH8Y42h3EIi7CoVIAo6DLlXCKN8u5BB7lHB+0U954APkfE+Z8toXyKmva++hb4oO3ugk+T8sEvxPu-CmLUv79x-k5O4s9DBgyAQuHQiZmSWl8tSHo+Z8ygR-DSBBC1SFQFQQ3fQJBaoP2ILAWAMVYDrTwVlAhbc2KIJIcgqR5DZEI30Io5ROBVGpTobdZAVN8SPWYXLBMpFvhAL+EFNMTJxw2hUoCIaNozS9BHOIo6kjpE7zkXAYxSiVFqNjttXahDk7VyQZvMh99DHyMiaY8xtVLGf34NbWxttc5XDuNmeooFXH5hpB436lgGbdHZnSLmK9dLtySbIsAOUsDoC4kwVgGQtzBHMheb+jk5ZUn6JzIaFF7DfRpAXIwXRXyCPTLYbkQSNywCPAAI33LgcU6i4kFQSW0nRWzdn7K4rkhh+TqZ2LGRJQK+hCyaT0LYaZNTECkQAqIz8VQxjcw2S6c5eyUkMGRqjQg6NMY4GxoQXGV92kgsuUEa5d0v53KKXhCZUz6gWhdqIz58sagUmUM0BMdgExaCBVFWsIsABevTZAt0TsQSKtVCAAAp-wfgAJT0ERToyKdKqBYEZUEUZtMnKkUWcpYGH4migRaOOUi-59AlxLnoYYSZ8xKBpb4CFu5zxXjDFhQpA8nIEVcjK8inlqJ-jNLcSww07BDT8qRfV+hDWEAEuhTCkrZYSSHp7UeChx72DqHYZkjx+zkkEZ8BkNIgYtIhqcha3rfVCQKZGB59sQT9mGtSDyPlvbTy+LPP4DJlDvjpM8T1GbLI2U4HZTFFq5bBpHsRMNqrJ5Rs8Z+Z5i4LQLlnqyEsgcaAQDgDIQVpUc1SrlgAWiJYusaH4PwNCHi7KlnrOIS0tsQedgbLhsIeIvMYfwhpUWjZ0SilobBWj5uDWdR093GUQnxHAR67aICqNmMkVRLAjtqEPaNNQGaNCpO+WS+ZPVE33VQC637inKE1sYbWg0aiFnMLB1eiSdHC1FWbYmHopTIcHn0SZdR-zpgXOYEE9q2i0S9tYYsqz2SBQDq07REi9GhPgDhBdQbIPfF+BUXkFhzBgWjZM9DZJrgkTGGGn4nqQkGIweR6VZ7ROKok1JrQmZ0PfDDToC0QEQrLjw2m4JfH1OUOfjgsAmn20jl4Dp8Tsl9NKSMwyckTRJPsi1eMKzPGbNgv44-LZsVYpwFgIwahjnnMvX8gOSTKtrReKUo8Z5n4h7fkTMWdkqnbNpIwV6lGu54vYNfkl0kKXWHusfZlv8RnrQMiYiBKpxXwsGPCQJmmx6vnaZ+Lpzztbo3XC9rRskYaPp6pCyVMLdc0HpIiSY6JqVatDdsO56DSbxueKBkrPqP5tUNHMNShbBNU49bSX15uR5ouxZSFEsx60ttXCGCpZ4as3FWgZGAvOpglapiaFNf4tRuvLZkfd71L2snvcE4Nz7iZAK-fzP9i0mtJvUnJHUEB9QKKesIJ07paAuIfaBmUhMSYXZxvcQXRWk4Rx-ATCMHDnrkVgo+5JlS88+i-EGI8BMjOObrrsPGgin44MirFRTpHP7iVsITGMH7VLC4FzJF7T8BKyI-mIjL5ADLIAfYVgYC7GX2SFipIz-6oExg04eDYVj9aKuEFN5pfs+pnhzzBmG3hU53m0RGH1Wwl3uOLY3LFWgyiIAe-+kvUpQvrcl2ZLqLoxZrRAaaCzpwTggA */
    id: 'stakeNewDialog',
    predictableActionArguments: true,
    tsTypes: {} as import('./stakeNewDialogMachine.typegen').Typegen0,
    schema: {
      context: {} as StakeNewDialogContext,
      events: {} as StakeNewDialogEvent,
      services: {} as StakeNewMachineServices,
    },
    initial: 'waitingInitialData',
    context: {
      amount: null,
      ethAccount: undefined,
      fee: new BN(0),
      rates: [],
    },
    on: {
      CLOSE: 'closed',
    },
    states: {
      waitingInitialData: {
        always: {
          target: 'waitingForAmount',
          cond: (ctx) => {
            return (
              !!ctx.ethAccount &&
              !!ctx.validator &&
              !!ctx.balanceL1 &&
              !!ctx.balanceSequencer &&
              !!ctx.publicClient &&
              !!ctx.walletClient &&
              !!ctx.queryClient
            );
          },
        },
        on: {
          SET_BALANCE_L1: {
            actions: assign({
              balanceL1: (_, event) => event.balanceL1,
            }),
          },
          SET_BALANCE_SEQUENCER: {
            actions: assign({
              balanceSequencer: (_, event) => event.balanceSequencer,
            }),
          },
          SET_CLIENTS: {
            actions: assign((_, event) => ({
              publicClient: event.publicClient,
              walletClient: event.walletClient,
              queryClient: event.queryClient,
            })),
          },
          SET_ETH_ACCOUNT: {
            actions: assign({
              ethAccount: (_, event) => event.ethAccount,
            }),
          },
          SET_VALIDATOR: {
            actions: assign({
              validator: (_, event) => event.validator,
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
                      const l1 = ctx.balanceL1 || new BN(0);
                      const seq = ctx.balanceSequencer || new BN(0);
                      const totalBalance = l1.add(seq);
                      const amountIsLowerThanBalance = totalBalance.lt(
                        bn(event.amount),
                      );

                      // Calculate how much to take from each source
                      // Priority: 1. sequencer, 2. ethereum
                      const amountBN = bn(event.amount);
                      const amountFromSequencer = seq.gte(amountBN)
                        ? amountBN
                        : seq;
                      const amountFromL1 = seq.gte(amountBN)
                        ? new BN(0)
                        : amountBN.sub(seq);

                      return {
                        amount: event.amount,
                        amountFromSequencer,
                        amountFromL1,
                        formError: amountIsLowerThanBalance
                          ? 'Not enough balance to stake'
                          : null,
                        stakeError: null,
                      };
                    }),
                  },
                  SET_VALIDATOR: {
                    actions: assign({
                      validator: (_, event) => {
                        return event.validator;
                      },
                    }),
                  },
                  REVIEW: [
                    {
                      target: 'success',
                      cond: (ctx) => !ctx.formError,
                      actions: assign({
                        navigationDirection: () => 'forward',
                      }),
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
        type: 'parallel',
        states: {
          gettingFee: {
            initial: 'fetching',
            states: {
              fetching: {
                invoke: {
                  src: 'getFee',
                  onDone: {
                    // cond: (_, event) => !!event.data.fee?.gt(0),
                    target: 'success',
                    actions: assign({
                      fee: (_, event) => event.data,
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
          gettingEthTokenApprovalInfo: {
            initial: 'checkingIfNeeded',
            states: {
              checkingIfNeeded: {
                always: [
                  {
                    target: 'fetching',
                    cond: (ctx) => !!ctx.amountFromL1 && ctx.amountFromL1.gt(0),
                  },
                  {
                    target: 'success',
                  },
                ],
              },
              fetching: {
                invoke: {
                  src: 'getEthTokenAllowance',
                  onDone: {
                    target: 'success',
                    actions: assign({
                      amountFromL1Approved: (_, event) => event.data,
                    }),
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
          target: 'reviewing',
        },
      },
      reviewing: {
        tags: ['reviewPage'],
        on: {
          BACK_TO_AMOUNT: {
            target: 'waitingForAmount',
            actions: assign({
              navigationDirection: () => 'backward',
            }),
          },
          CONFIRM: {
            target: 'submitting',
            cond: (ctx) => {
              return !!(
                ctx.amountFromL1?.eq(0) ||
                ctx.amountFromL1?.lte(ctx.amountFromL1Approved)
              );
            },
          },
          GO_TO_APPROVAL: {
            target: 'waitingForApproval',
            cond: (ctx) => {
              // Only go to approval if there's an L1 amount and approval is needed
              return (
                ctx.amountFromL1?.gt(0) &&
                ctx.amountFromL1Approved &&
                ctx.amount?.gt(ctx.amountFromL1Approved)
              );
            },
            actions: assign({
              navigationDirection: () => 'forward',
            }),
          },
        },
      },
      waitingForApproval: {
        tags: ['approvalPage'],
        initial: 'idle',
        states: {
          idle: {
            on: {
              APPROVE: 'approving',
              BACK_TO_REVIEW: {
                target: '#stakeNewDialog.reviewing',
                actions: assign({
                  navigationDirection: () => 'backward',
                }),
              },
            },
          },
          approving: {
            tags: ['loadingApproval'],
            invoke: {
              src: 'approveEthToken',
              onDone: {
                target: 'waitingReceipts',
              },
              onError: {
                target: 'idle',
                actions: assign({
                  approvalError: (_, event) => {
                    if (event.data instanceof Error && event.data?.message) {
                      if (
                        event.data?.message.includes(
                          'User rejected the request',
                        )
                      ) {
                        return 'Approval cancelled. You rejected the request in your wallet.';
                      }
                      return event.data?.message;
                    }
                    return 'Error approving token';
                  },
                }),
              },
            },
          },
          waitingReceipts: {
            tags: ['loadingApproval'],
            invoke: {
              src: 'waitingReceiptsApproveEthToken',
              onDone: {
                target: 'success',
                actions: assign({
                  amountFromL1Approved: (_, event) => event.data,
                }),
              },
            },
          },
          success: {
            type: 'final',
          },
        },
        onDone: {
          target: 'reviewing',
          actions: assign({
            navigationDirection: () => 'backward',
          }),
        },
      },
      submitting: {
        tags: ['reviewPage'],
        entry: assign(() => {
          return {
            formError: null,
            stakeError: null,
          };
        }),
        invoke: {
          src: 'submitStake',
          onDone: {
            target: 'finalized',
            actions: (ctx, event) => {
              if (!ctx.queryClient) return;
              // TempStakingTransactions.addTransaction(ctx.queryClient, {
              //   hash: 'test',
              // });

              StakeNewService.showSuccessToast(event.data);
            },
          },
          onError: {
            target: 'reviewing',
            actions: assign({
              stakeError: (_, event) => {
                if (event.data instanceof Error && event.data?.message) {
                  if (
                    event.data?.message.includes('User rejected the request')
                  ) {
                    return 'Transaction cancelled. You rejected the request in your wallet.';
                  }

                  return event.data?.message;
                }

                return 'Error submitting stake';
              },
            }),
          },
        },
      },
      finalized: {
        type: 'final',
        entry: ['closeDialog'],
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
        const result = await StakeNewService.estimateStakeFee(context);
        return bigIntToBn(result);
      },
      getEthTokenAllowance: async (context) => {
        const { publicClient, ethAccount } = context;

        return StakeNewService.getEthTokenAllowance({
          publicClient: publicClient || undefined,
          ownerAddress: ethAccount,
        });
      },
      getAssetsRate: async () => {
        const rates = await AssetsRateService.getAssetsRate();
        return rates;
      },
      submitStake: async (context) => {
        const result = await StakeNewService.submitStake(context);
        return result;
      },
      approveEthToken: async (context) => {
        const result = await StakeNewService.approveEthToken({
          walletClient: context.walletClient,
          publicClient: context.publicClient,
          ethAccount: context.ethAccount,
          amount: context.amount,
        });
        return result;
        // return '0x513e96c4af0a67b04569eb971a97fdecc98244f704d89e15cb393b995fe3c585' as HexAddress;
      },
      waitingReceiptsApproveEthToken: async (context, event) => {
        const hash = event.data;
        const { publicClient, ethAccount } = context;

        const result = await StakeNewService.waitingReceiptsApproveEthToken({
          publicClient,
          ethAccount,
          hash: hash as HexAddress,
        });

        return result;
      },
    },
  },
);

export type StakeNewDialogMachine = typeof stakeNewDialogMachine;
export type StakeNewDialogMachineState = StateFrom<StakeNewDialogMachine>;

export const stakeNewDialogMachineSelectors = {
  getAmount: (context: StakeNewDialogContext) => context.amount,
  getAmountFromSequencer: (context: StakeNewDialogContext) =>
    context.amountFromSequencer,
  getAmountFromL1: (context: StakeNewDialogContext) => context.amountFromL1,
  getBalanceL1: (context: StakeNewDialogContext) => context.balanceL1,
  getBalanceSequencer: (context: StakeNewDialogContext) =>
    context.balanceSequencer,
  getTotalBalance: (context: StakeNewDialogContext) => {
    const l1 = context.balanceL1 || new BN(0);
    const seq = context.balanceSequencer || new BN(0);
    return l1.add(seq);
  },
  getEthAccount: (context: StakeNewDialogContext) => context.ethAccount,
  getFee: (context: StakeNewDialogContext) => context.fee,
  getRates: (context: StakeNewDialogContext) => context.rates,
  getValidator: (context: StakeNewDialogContext) => context.validator,

  // Error selectors
  getStakeError: (context: StakeNewDialogContext) => context.stakeError,
  getFormError: (context: StakeNewDialogContext) => context.formError,
  getError: (context: StakeNewDialogContext) => {
    if (context.formError) return context.formError;
    if (context.stakeError) return context.stakeError;
    return null;
  },
  getShortError: (context: StakeNewDialogContext) => {
    const error =
      context.formError || (context.stakeError ? context.stakeError : null);
    return error ? getShortError(error) : null;
  },

  isSubmitting: (state: StakeNewDialogMachineState) =>
    state.matches('submitting'),
  isReviewing: (state: StakeNewDialogMachineState) =>
    state.matches('reviewing'),
  isWaitingForAmount: (state: StakeNewDialogMachineState) =>
    state.matches('waitingForAmount'),
  isGettingReviewDetails: (state: StakeNewDialogMachineState) => {
    return (state as any).matches('gettingReviewDetails');
  },
  // New selector to check if in any review-related state
  isReviewPage: (state: StakeNewDialogMachineState) =>
    state.hasTag('reviewPage'),
  isApprovalPage: (state: StakeNewDialogMachineState) =>
    state.hasTag('approvalPage'),
  // Composite states
  isLoading: (state: StakeNewDialogMachineState) => {
    return (
      state.matches('submitting') ||
      state.matches('waitingForApproval') ||
      (state as any).matches('gettingReviewDetails')
    );
  },
  getAmountFromL1Approved: (context: StakeNewDialogContext) =>
    context.amountFromL1Approved,
  // Add a new selector to check if approval is needed
  needsApproval: (context: StakeNewDialogContext) => {
    return (
      context.amountFromL1?.gt(0) &&
      (!context.amountFromL1Approved ||
        context.amountFromL1?.gt(context.amountFromL1Approved))
    );
  },
  isApprovalCompleted: (context: StakeNewDialogContext) => {
    return (
      context.amountFromL1?.gt(0) &&
      context.amountFromL1?.lte(context.amountFromL1Approved)
    );
  },
  isWaitingForApproval: (state: StakeNewDialogMachineState) =>
    state.matches('waitingForApproval'),
  isLoadingApproval: (state: StakeNewDialogMachineState) =>
    state.hasTag('loadingApproval'),
  approvalError: (context: StakeNewDialogContext) => context.approvalError,
  isReadyToConfirm: (context: StakeNewDialogContext) => {
    return !!(
      context.amountFromL1?.eq(0) ||
      context.amountFromL1?.lte(context.amountFromL1Approved)
    );
  },
  navigationDirection: (context: StakeNewDialogContext) =>
    context.navigationDirection,
};
