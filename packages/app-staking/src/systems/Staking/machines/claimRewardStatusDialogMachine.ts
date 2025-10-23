import type { QueryClient } from '@tanstack/react-query';
import type { HexAddress } from 'app-commons';
import type { PublicClient, TransactionReceipt, WalletClient } from 'viem';
import { type StateFrom, assign, createMachine } from 'xstate';
import {
  type AssetRate,
  AssetsRateService,
} from '~staking/systems/Core/services/AssetsRateService';
import { L1EventService } from '../services/l1EventService';
import { ONE_MINUTE_REFETCH_MS } from './constants';

// Define Claim states
export enum ClaimStatus {
  TransactionSent = 'TransactionSent',
  WaitingSync = 'WaitingSync',
  Skipped = 'Skipped',
  Finalized = 'Finalized',
}

export interface ClaimEvent {
  id: string;
  amount: string;
  status: ClaimStatus;
  statusInfo: Record<string, any>;
  timestampToFinish?: string;
}

export interface ClaimRewardStatusDialogMachineContext {
  eventId?: string;
  eventData?: ClaimEvent;
  eventError?: Error;
  currentTime?: Date;
  finalizeError?: string;
  receiptsError?: string;
  isPaused?: boolean;
  symbol?: string;
  decimals?: number;
  publicClient?: PublicClient;
  walletClient?: WalletClient;
  txHashClaim?: `0x${string}`;
  queryClient?: QueryClient;
  rates: AssetRate[];
}

type ClaimRewardStatusDialogMachineServices = {
  fetchEvent: {
    data: ClaimEvent;
  };
  getAssetsRate: {
    data: AssetRate[];
  };
  claim: {
    data: HexAddress;
  };
  waitForReceipt: {
    data: TransactionReceipt;
  };
};

export type MachineEvents =
  | { type: 'SET_EVENT_ID'; eventId: string }
  | { type: 'CLOSE' }
  | {
      type: 'SET_CLIENTS';
      publicClient: PublicClient;
      walletClient: WalletClient;
      queryClient: QueryClient;
    };

export const claimRewardStatusDialogMachine = createMachine(
  {
    id: 'claimRewardStatus',
    predictableActionArguments: true,
    schema: {
      context: {} as ClaimRewardStatusDialogMachineContext,
      events: {} as MachineEvents,
      services: {} as ClaimRewardStatusDialogMachineServices,
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
          SET_EVENT_ID: {
            actions: assign({
              eventId: (_, event) => event.eventId,
            }),
          },
          SET_CLIENTS: {
            actions: assign((_, event) => {
              return {
                publicClient: event.publicClient,
                walletClient: event.walletClient,
                queryClient: event.queryClient,
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
                  onError: {
                    target: 'failure',
                    actions: assign({
                      eventError: (_, event) => event.data,
                    }),
                  },
                },
              },
              success: {
                type: 'final',
              },
              failure: {
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
                  onError: {
                    target: 'failure',
                  },
                },
              },
              success: {
                type: 'final',
              },
              failure: {
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
        after: {
          ONE_MINUTE_REFETCH_MS: {
            target: 'fetchingData',
            cond: (ctx) => Boolean(ctx.eventId),
          },
        },
      },
      finalized: {
        type: 'final',
      },
      closed: {
        type: 'final',
      },
    },
  },
  {
    services: {
      fetchEvent: async (ctx) => {
        return L1EventService.fetchEvent({ id: ctx.eventId });
      },
      getAssetsRate: async () => {
        const rates = await AssetsRateService.getAssetsRate();
        return rates;
      },
    },
    delays: {
      ONE_MINUTE_REFETCH_MS,
    },
  },
);

export type ClaimRewardStatusDialogMachine =
  typeof claimRewardStatusDialogMachine;
export type ClaimRewardStatusDialogMachineState =
  StateFrom<ClaimRewardStatusDialogMachine>;

export const claimRewardStatusDialogMachineSelectors = {
  getError: ({ context }: ClaimRewardStatusDialogMachineState) =>
    context.eventError || context.receiptsError || context.finalizeError,
  isError: (state: ClaimRewardStatusDialogMachineState) =>
    !!state.context.eventError ||
    !!state.context.receiptsError ||
    !!state.context.finalizeError,
  isPaused: (state: ClaimRewardStatusDialogMachineState) =>
    state.context.isPaused,
  isClaiming: (state: ClaimRewardStatusDialogMachineState) =>
    state.matches('claiming'),
  isWaitingForReceipt: (state: ClaimRewardStatusDialogMachineState) =>
    state.matches('waitingReceipt'),
  isFinalized: (state: ClaimRewardStatusDialogMachineState) =>
    state.matches('finalized') ||
    state.context.eventData?.status === ClaimStatus.Finalized,
  getTxHash: (state: ClaimRewardStatusDialogMachineState) =>
    state.context.txHashClaim,
  getEvent: (state: ClaimRewardStatusDialogMachineState) =>
    state.context.eventData,
  getEventId: (state: ClaimRewardStatusDialogMachineState) =>
    state.context.eventId,
  getRates: (state: ClaimRewardStatusDialogMachineState) => state.context.rates,
  isLoading: (state: ClaimRewardStatusDialogMachineState) => {
    // Don't show loading if finalized
    if (
      state.matches('finalized') ||
      state.context.eventData?.status === ClaimStatus.Finalized
    ) {
      return false;
    }

    // Return true for loading states
    return (
      state.matches('claiming') ||
      state.matches('waitingReceipt') ||
      state.matches('fetchingData')
    );
  },
  hasEventError: (state: ClaimRewardStatusDialogMachineState) =>
    Boolean(state.context.eventError),
  getEventError: (state: ClaimRewardStatusDialogMachineState) =>
    state.context.eventError,
  isFetchingEvent: (state: ClaimRewardStatusDialogMachineState) =>
    state.matches('fetchingData'),
};
