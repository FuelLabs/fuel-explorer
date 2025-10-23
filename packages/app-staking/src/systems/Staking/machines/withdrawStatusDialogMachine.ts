import type { PublicClient, TransactionReceipt, WalletClient } from 'viem';
import { type StateFrom, assign, createMachine } from 'xstate';
import type {
  StakingEvent,
  StakingEventWithProof,
} from '~staking/systems/Staking/types/l1/events';
import { withdrawFinalizationService } from '../services/withdrawFinalizationService';

import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import type { QueryClient } from '@tanstack/react-query';
import { getTransactionReceipt } from 'app-commons';
import type { HexAddress } from 'app-commons';
import {
  type AssetRate,
  AssetsRateService,
} from '~staking/systems/Core/services/AssetsRateService';
import type { GetSequencerCommitmentInclusionProofResponse } from '~staking/systems/Withdraw/types/proof';
import { L1EventService } from '../services/l1EventService';
import { ONE_MINUTE_REFETCH_MS } from './constants';

// Define simplified error for paused contracts
// class ContractPausedError extends Error {
//   name = 'ContractPausedError';
//   constructor() {
//     super('Contract is paused. Please try again later.');
//   }
// }

export interface WithdrawStatusDialogMachineContext {
  eventId?: string;
  eventData?: StakingEvent | StakingEventWithProof;
  eventError?: Error;
  currentTime?: Date;
  finalizeError?: string;
  receiptsError?: string;
  isPaused?: boolean;
  surplus?: bigint;
  symbol?: string;
  decimals?: number;
  publicClient?: PublicClient;
  walletClient?: WalletClient;
  txHashFinalizeWithdraw?: `0x${string}`;
  queryClient?: QueryClient;
  rates: AssetRate[];
}

type WithdrawStatusDialogMachineServices = {
  fetchEvent: {
    data: StakingEvent | StakingEventWithProof;
  };
  prepareFinalize: {
    data: GetSequencerCommitmentInclusionProofResponse;
  };
  getAssetsRate: {
    data: AssetRate[];
  };
  finalizeWithdraw: {
    data: HexAddress;
  };
  waitForReceipt: {
    data: TransactionReceipt;
  };
};

export type MachineEvents =
  | { type: 'SET_L1_EVENT_ID'; eventId: string }
  | { type: 'CLOSE' }
  | { type: 'FINALIZE' }
  | {
      type: 'SET_CLIENTS';
      publicClient: PublicClient;
      walletClient: WalletClient;
      queryClient: QueryClient;
    };

export const withdrawStatusDialogMachine = createMachine(
  {
    id: 'withdrawStatusDialog',
    predictableActionArguments: true,
    tsTypes: {} as import('./withdrawStatusDialogMachine.typegen').Typegen0,
    schema: {
      context: {} as WithdrawStatusDialogMachineContext,
      events: {} as MachineEvents,
      services: {} as WithdrawStatusDialogMachineServices,
    },
    initial: 'waitingInitialData',
    on: {
      CLOSE: {
        target: 'closed',
      },
    },
    states: {
      waitingInitialData: {
        always: {
          target: 'fetchingData',
          cond: (ctx) => {
            return !!ctx.eventId && !!ctx.publicClient && !!ctx.walletClient;
          },
        },
        on: {
          SET_L1_EVENT_ID: {
            actions: assign({
              eventId: (_, event) => event.eventId,
            }),
          },
          SET_CLIENTS: {
            actions: assign((_, event) => {
              return {
                publicClient: event.publicClient,
                walletClient: event.walletClient,
              };
            }),
          },
        },
      },
      fetchingData: {
        type: 'parallel',
        states: {
          fetchingEvent: {
            initial: 'fetching',
            states: {
              fetching: {
                invoke: {
                  src: 'fetchEvent',
                  onDone: {
                    target: 'success',
                    actions: assign((_, event) => {
                      return {
                        eventData: event.data,
                        eventError: undefined,
                      };
                    }),
                  },
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
                invoke: {
                  src: 'getAssetsRate',
                  onDone: {
                    target: 'success',
                    actions: assign({
                      rates: (_, event) => event.data,
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
          target: 'idle',
        },
      },
      idle: {
        // entry: 'updateCurrentTime',
        on: {
          FINALIZE: [
            {
              target: 'preparingFinalize',
              cond: (ctx) =>
                Boolean(
                  ctx.eventData &&
                    ctx.eventData.status ===
                      GQLWithdrawStatusType.ReadyToProcessWithdraw &&
                    !ctx.isPaused &&
                    (ctx?.surplus || 0) >= 0n,
                ),
            },
          ],
        },
        after: {
          ONE_MINUTE_REFETCH_MS: {
            target: 'fetchingData',
            cond: (ctx) => Boolean(ctx.eventId),
          },
        },
      },
      preparingFinalize: {
        invoke: {
          src: 'prepareFinalize',
          onDone: {
            target: 'finalizing',
          },
          onError: {
            target: 'idle',
            actions: assign({
              finalizeError: (_, event) => {
                return (
                  (event &&
                    'data' in event &&
                    (event.data as Error)?.message) ||
                  'Failed to find receipt for transaction'
                );
              },
            }),
          },
        },
      },
      finalizing: {
        invoke: {
          src: 'finalizeWithdraw',
          onDone: {
            target: 'waitingReceipt',
            actions: [
              (_, event) => {
                withdrawFinalizationService.showSuccessToast(event.data);
              },
              assign({
                txHashFinalizeWithdraw: (_, event) => event.data,
                eventData: (context, event) => {
                  const existingEventData = context.eventData;

                  if (!existingEventData) {
                    return undefined;
                  }

                  const newStatusInfo = {
                    ...(existingEventData.statusInfo || {}),
                  };

                  // to dont need waiting for indexer we'll enforce txhash into the ReadyToProcessWithdraw statusInfo
                  newStatusInfo[GQLWithdrawStatusType.ReadyToProcessWithdraw] =
                    {
                      ...(newStatusInfo[
                        GQLWithdrawStatusType.ReadyToProcessWithdraw
                      ] || {}),
                      ethTx: {
                        txHash: event.data,
                        timestamp: new Date().toISOString(),
                        height: 0,
                      },
                      proof:
                        newStatusInfo[
                          GQLWithdrawStatusType.ReadyToProcessWithdraw
                        ]?.proof || '',
                    };

                  return {
                    ...existingEventData,
                    statusInfo: newStatusInfo,
                  } as StakingEventWithProof;
                },
              }),
            ],
          },
          onError: {
            target: 'idle',
            actions: assign({
              finalizeError: (_, event) => {
                return (
                  (event &&
                    'data' in event &&
                    (event.data as Error)?.message) ||
                  'Failed to find receipt for transaction'
                );
              },
            }),
          },
        },
      },
      waitingReceipt: {
        invoke: {
          src: 'waitForReceipt',
          onDone: {
            target: 'finalized',
            actions: assign({
              eventData: (context) => {
                const existingEventData = context.eventData;

                if (!existingEventData) {
                  return undefined;
                }

                // to dont need waiting for indexer we'll enforce finalized status into the withdraw
                return {
                  ...existingEventData,
                  status: GQLWithdrawStatusType.Finalized,
                } as StakingEventWithProof;
              },
            }),
          },
          onError: {
            target: 'idle',
            actions: assign({
              receiptsError: (_, event) => {
                return (
                  (event &&
                    'data' in event &&
                    (event.data as Error)?.message) ||
                  'Failed to find receipt for transaction'
                );
              },
            }),
          },
        },
      },
      finalized: {
        type: 'final',
      },
      finalizingError: {},
      closed: {
        type: 'final',
      },
      paused: {
        // entry: 'updateCurrentTime',
      },
    },
  },
  {
    actions: {},
    services: {
      fetchEvent: async (ctx) => {
        return L1EventService.fetchEvent({ id: ctx.eventId });
      },
      getAssetsRate: async () => {
        const rates = await AssetsRateService.getAssetsRate();
        return rates;
      },
      prepareFinalize: async (ctx) => {
        return withdrawFinalizationService.prepareFinalize({
          eventData: ctx.eventData as StakingEventWithProof,
        });
      },
      finalizeWithdraw: async (ctx) => {
        return withdrawFinalizationService.finalizeWithdraw({
          eventData: ctx.eventData as StakingEventWithProof,
          publicClient: ctx.publicClient,
          walletClient: ctx.walletClient,
          queryClient: ctx.queryClient,
        });
      },
      waitForReceipt: async (ctx) => {
        if (!ctx.txHashFinalizeWithdraw || !ctx.publicClient) {
          throw new Error('Transaction hash or public client is required');
        }

        // // Add a 30-second delay for testing the loading state
        // await new Promise((resolve) => setTimeout(resolve, 30000));

        return getTransactionReceipt({
          publicClient: ctx.publicClient,
          txHash: ctx.txHashFinalizeWithdraw,
        });
      },
    },
    delays: {
      ONE_MINUTE_REFETCH_MS,
    },
  },
);

export type WithdrawStatusDialogMachine = typeof withdrawStatusDialogMachine;
export type WithdrawStatusDialogMachineState =
  StateFrom<WithdrawStatusDialogMachine>;

export const withdrawStatusDialogMachineSelectors = {
  getError: ({ context }: WithdrawStatusDialogMachineState) =>
    context.eventError || context.receiptsError,
  isError: (state: WithdrawStatusDialogMachineState) =>
    // state.matches('eventError') ||
    state.matches('finalizingError'),
  isPaused: (state: WithdrawStatusDialogMachineState) => state.context.isPaused,
  isCheckingPaused: (_state: WithdrawStatusDialogMachineState) => false,
  // state.matches('checkingPaused'),
  isFinalizing: (state: WithdrawStatusDialogMachineState) =>
    state.matches('finalizing') || state.matches('preparingFinalize'),
  isWaitingForReceipt: (state: WithdrawStatusDialogMachineState) =>
    state.matches('waitingReceipt'),
  isFinalized: (state: WithdrawStatusDialogMachineState) =>
    state.matches('finalized'),
  isReceiptSuccess: (state: WithdrawStatusDialogMachineState) =>
    state.context.txHashFinalizeWithdraw && !state.context.receiptsError,
  isReadyToProcessWithdraw: (
    state: WithdrawStatusDialogMachineState | undefined,
  ): boolean => {
    if (!state?.context.eventData) return false;
    return Boolean(
      state?.context.eventData?.status ===
        GQLWithdrawStatusType.ReadyToProcessWithdraw,
    );
  },
  getTxHash: (state: WithdrawStatusDialogMachineState) =>
    state.context.txHashFinalizeWithdraw,
  getEvent: (state: WithdrawStatusDialogMachineState) =>
    state.context.eventData,
  getEventId: (state: WithdrawStatusDialogMachineState) =>
    state.context.eventId,
  getRates: (state: WithdrawStatusDialogMachineState) => state.context.rates,
  isLoading: (state: WithdrawStatusDialogMachineState) => {
    // Don't show loading if finalized or ready to process
    if (
      state.matches('finalized') ||
      state.context.eventData?.status ===
        GQLWithdrawStatusType.ReadyToProcessWithdraw
    ) {
      return false;
    }

    // Return true for loading states
    return (
      state.matches('finalizing') ||
      state.matches('preparingFinalize') ||
      state.matches('waitingReceipt') ||
      state.matches('fetchingData')
    );
  },
  hasEventError: (state: WithdrawStatusDialogMachineState) =>
    Boolean(state.context.eventError),
  getEventError: (state: WithdrawStatusDialogMachineState) =>
    state.context.eventError,
  isFetchingEvent: (state: WithdrawStatusDialogMachineState) =>
    state.matches('fetchingData'),
  isLoadingInitialEvent: (state: WithdrawStatusDialogMachineState) =>
    (state.matches('idle') || state.matches('fetchingData')) &&
    !state.context.eventData,
  isRefreshingEventData: (state: WithdrawStatusDialogMachineState) =>
    state.matches('fetchingData') && Boolean(state.context.eventData),
  isEventSuccess: (_state: WithdrawStatusDialogMachineState) => false,
  // state.matches('eventSuccess'),
  isEventError: (_state: WithdrawStatusDialogMachineState) => false,
  // state.matches('eventError'),
};
