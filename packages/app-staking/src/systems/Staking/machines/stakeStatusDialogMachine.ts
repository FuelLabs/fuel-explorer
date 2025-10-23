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

// Define Stake states
export enum StakeStatus {
  TransactionSent = 'TransactionSent',
  WaitingSync = 'WaitingSync',
  Skipped = 'Skipped',
  Finalized = 'Finalized',
}

export interface StakeEvent {
  id: string;
  amount: string;
  status: StakeStatus;
  statusInfo: Record<string, any>;
  timestampToFinish?: string;
}

export interface StakeStatusDialogMachineContext {
  eventId?: string;
  eventData?: StakeEvent;
  eventError?: Error;
  currentTime?: Date;
  finalizeError?: string;
  receiptsError?: string;
  isPaused?: boolean;
  symbol?: string;
  decimals?: number;
  publicClient?: PublicClient;
  walletClient?: WalletClient;
  txHashStake?: `0x${string}`;
  queryClient?: QueryClient;
  rates: AssetRate[];
}

type StakeStatusDialogMachineServices = {
  fetchEvent: {
    data: StakeEvent;
  };
  getAssetsRate: {
    data: AssetRate[];
  };
  stake: {
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

export const stakeStatusDialogMachine = createMachine(
  {
    id: 'stakeStatus',
    predictableActionArguments: true,
    schema: {
      context: {} as StakeStatusDialogMachineContext,
      events: {} as MachineEvents,
      services: {} as StakeStatusDialogMachineServices,
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

export type StakeStatusDialogMachine = typeof stakeStatusDialogMachine;
export type StakeStatusDialogMachineState = StateFrom<StakeStatusDialogMachine>;

export const stakeStatusDialogMachineSelectors = {
  getError: ({ context }: StakeStatusDialogMachineState) =>
    context.eventError || context.receiptsError || context.finalizeError,
  isError: (state: StakeStatusDialogMachineState) =>
    !!state.context.eventError ||
    !!state.context.receiptsError ||
    !!state.context.finalizeError,
  isPaused: (state: StakeStatusDialogMachineState) => state.context.isPaused,
  isStakeing: (state: StakeStatusDialogMachineState) =>
    state.matches('staking'),
  isWaitingForReceipt: (state: StakeStatusDialogMachineState) =>
    state.matches('waitingReceipt'),
  isFinalized: (state: StakeStatusDialogMachineState) =>
    state.matches('finalized') ||
    state.context.eventData?.status === StakeStatus.Finalized,
  getTxHash: (state: StakeStatusDialogMachineState) =>
    state.context.txHashStake,
  getEvent: (state: StakeStatusDialogMachineState) => state.context.eventData,
  getEventId: (state: StakeStatusDialogMachineState) => state.context.eventId,
  getRates: (state: StakeStatusDialogMachineState) => state.context.rates,
  isLoading: (state: StakeStatusDialogMachineState) => {
    // Don't show loading if finalized
    if (
      state.matches('finalized') ||
      state.context.eventData?.status === StakeStatus.Finalized
    ) {
      return false;
    }

    // Return true for loading states
    return (
      state.matches('staking') ||
      state.matches('waitingReceipt') ||
      state.matches('fetchingData')
    );
  },
  hasEventError: (state: StakeStatusDialogMachineState) =>
    Boolean(state.context.eventError),
  getEventError: (state: StakeStatusDialogMachineState) =>
    state.context.eventError,
  isFetchingEvent: (state: StakeStatusDialogMachineState) =>
    state.matches('fetchingData'),
};
