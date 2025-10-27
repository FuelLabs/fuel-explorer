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

// Define Undelegate states
export enum UndelegateStatus {
  TransactionSent = 'TransactionSent',
  WaitingSync = 'WaitingSync',
  Skipped = 'Skipped',
  WaitingUnbonding = 'WaitingUnbonding',
  Finalized = 'Finalized',
}

export interface UndelegateEvent {
  id: string;
  amount: string;
  status: UndelegateStatus;
  statusInfo: Record<string, any>;
  timestampToFinish?: string;
}

export interface UndelegateStatusDialogMachineContext {
  eventId?: string;
  eventData?: UndelegateEvent;
  eventError?: Error;
  currentTime?: Date;
  finalizeError?: string;
  receiptsError?: string;
  isPaused?: boolean;
  symbol?: string;
  decimals?: number;
  publicClient?: PublicClient;
  walletClient?: WalletClient;
  txHashUndelegate?: `0x${string}`;
  queryClient?: QueryClient;
  rates: AssetRate[];
}

type UndelegateStatusDialogMachineServices = {
  fetchEvent: {
    data: UndelegateEvent;
  };
  getAssetsRate: {
    data: AssetRate[];
  };
  undelegate: {
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

export const undelegateStatusDialogMachine = createMachine(
  {
    id: 'undelegateStatus',
    predictableActionArguments: true,
    schema: {
      context: {} as UndelegateStatusDialogMachineContext,
      events: {} as MachineEvents,
      services: {} as UndelegateStatusDialogMachineServices,
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

export type UndelegateStatusDialogMachine =
  typeof undelegateStatusDialogMachine;
export type UndelegateStatusDialogMachineState =
  StateFrom<UndelegateStatusDialogMachine>;

export const undelegateStatusDialogMachineSelectors = {
  getError: ({ context }: UndelegateStatusDialogMachineState) =>
    context.eventError || context.receiptsError || context.finalizeError,
  isError: (state: UndelegateStatusDialogMachineState) =>
    !!state.context.eventError ||
    !!state.context.receiptsError ||
    !!state.context.finalizeError,
  isPaused: (state: UndelegateStatusDialogMachineState) =>
    state.context.isPaused,
  isUndelegating: (state: UndelegateStatusDialogMachineState) =>
    state.matches('undelegating'),
  isWaitingForReceipt: (state: UndelegateStatusDialogMachineState) =>
    state.matches('waitingReceipt'),
  isFinalized: (state: UndelegateStatusDialogMachineState) =>
    state.matches('finalized') ||
    state.context.eventData?.status === UndelegateStatus.Finalized,
  getTxHash: (state: UndelegateStatusDialogMachineState) =>
    state.context.txHashUndelegate,
  getEvent: (state: UndelegateStatusDialogMachineState) =>
    state.context.eventData,
  getEventId: (state: UndelegateStatusDialogMachineState) =>
    state.context.eventId,
  getRates: (state: UndelegateStatusDialogMachineState) => state.context.rates,
  isLoading: (state: UndelegateStatusDialogMachineState) => {
    // Don't show loading if finalized
    if (
      state.matches('finalized') ||
      state.context.eventData?.status === UndelegateStatus.Finalized
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
  hasEventError: (state: UndelegateStatusDialogMachineState) =>
    Boolean(state.context.eventError),
  getEventError: (state: UndelegateStatusDialogMachineState) =>
    state.context.eventError,
  isFetchingEvent: (state: UndelegateStatusDialogMachineState) =>
    state.matches('fetchingData'),
};
