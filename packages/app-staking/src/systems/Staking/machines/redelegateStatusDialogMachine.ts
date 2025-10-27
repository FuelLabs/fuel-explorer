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

// Define Redelegate states
export enum RedelegateStatus {
  TransactionSent = 'TransactionSent',
  WaitingSync = 'WaitingSync',
  Skipped = 'Skipped',
  Finalized = 'Finalized',
}

export interface RedelegateEvent {
  id: string;
  amount: string;
  status: RedelegateStatus;
  statusInfo: Record<string, any>;
  timestampToFinish?: string;
}

export interface RedelegateStatusDialogMachineContext {
  eventId?: string;
  eventData?: RedelegateEvent;
  eventError?: Error;
  currentTime?: Date;
  finalizeError?: string;
  receiptsError?: string;
  isPaused?: boolean;
  symbol?: string;
  decimals?: number;
  publicClient?: PublicClient;
  walletClient?: WalletClient;
  txHashRedelegate?: `0x${string}`;
  queryClient?: QueryClient;
  rates: AssetRate[];
}

type RedelegateStatusDialogMachineServices = {
  fetchEvent: {
    data: RedelegateEvent;
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

export const redelegateStatusDialogMachine = createMachine(
  {
    id: 'redelegateStatus',
    predictableActionArguments: true,
    schema: {
      context: {} as RedelegateStatusDialogMachineContext,
      events: {} as MachineEvents,
      services: {} as RedelegateStatusDialogMachineServices,
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

export type RedelegateStatusDialogMachine =
  typeof redelegateStatusDialogMachine;
export type RedelegateStatusDialogMachineState =
  StateFrom<RedelegateStatusDialogMachine>;

export const redelegateStatusDialogMachineSelectors = {
  getError: ({ context }: RedelegateStatusDialogMachineState) =>
    context.eventError || context.receiptsError || context.finalizeError,
  isError: (state: RedelegateStatusDialogMachineState) =>
    !!state.context.eventError ||
    !!state.context.receiptsError ||
    !!state.context.finalizeError,
  isPaused: (state: RedelegateStatusDialogMachineState) =>
    state.context.isPaused,
  isWaitingForReceipt: (state: RedelegateStatusDialogMachineState) =>
    state.matches('waitingReceipt'),
  isFinalized: (state: RedelegateStatusDialogMachineState) =>
    state.matches('finalized') ||
    state.context.eventData?.status === RedelegateStatus.Finalized,
  getTxHash: (state: RedelegateStatusDialogMachineState) =>
    state.context.txHashRedelegate,
  getEvent: (state: RedelegateStatusDialogMachineState) =>
    state.context.eventData,
  getEventId: (state: RedelegateStatusDialogMachineState) =>
    state.context.eventId,
  getRates: (state: RedelegateStatusDialogMachineState) => state.context.rates,
  isLoading: (state: RedelegateStatusDialogMachineState) => {
    // Don't show loading if finalized
    if (
      state.matches('finalized') ||
      state.context.eventData?.status === RedelegateStatus.Finalized
    ) {
      return false;
    }

    // Return true for loading states
    return state.matches('waitingReceipt') || state.matches('fetchingData');
  },
  hasEventError: (state: RedelegateStatusDialogMachineState) =>
    Boolean(state.context.eventError),
  getEventError: (state: RedelegateStatusDialogMachineState) =>
    state.context.eventError,
  isFetchingEvent: (state: RedelegateStatusDialogMachineState) =>
    state.matches('fetchingData'),
};
