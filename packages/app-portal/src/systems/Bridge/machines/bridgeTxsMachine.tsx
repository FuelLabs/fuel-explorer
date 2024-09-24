import type { Address as FuelAddress, Provider as FuelProvider } from 'fuels';
import type { ActorRefFrom, InterpreterFrom, StateFrom } from 'xstate';
import { assign, createMachine, spawn } from 'xstate';
import {
  isEthChain,
  isFuelChain,
  txFuelToEthMachine,
} from '~portal/systems/Chains';
import { txEthToFuelMachine } from '~portal/systems/Chains/eth/machines';
import { FetchMachine } from '~portal/systems/Core/machines';
import { delay } from '~portal/systems/Core/utils';

import type { HexAddress } from 'app-commons';
import type { PublicClient } from 'viem';
import { BridgeService } from '../services';
import type { BridgeInputs } from '../services';
import type { BridgeTx } from '../types';

const TXS_PER_PAGE = 5;

export type BridgeTxsMachineContext = {
  ethToFuelTxRefs: {
    [key: string]: ActorRefFrom<typeof txEthToFuelMachine>;
  };
  fuelToEthTxRefs: {
    [key: string]: ActorRefFrom<typeof txFuelToEthMachine>;
  };
  allTxs?: BridgeTx[];
  paginatedTxs?: BridgeTx[];
  fuelProvider?: FuelProvider;
  ethPublicClient?: PublicClient;
  fuelAddress?: FuelAddress;
  hasNextPage: boolean;
  amountTxsToShow: number;
};

type MachineServices = {
  fetchTxs: {
    data: BridgeTx[] | undefined;
  };
};

export type BridgeTxsMachineEvents =
  | {
      type: 'FETCH';
      input: BridgeInputs['fetchTxs'];
    }
  | { type: 'FETCH_NEXT_PAGE' }
  | {
      type: 'ADD_TX_ETH_TO_FUEL';
      input: {
        ethTxId?: HexAddress;
        inputEthTxNonce?: BigInt;
      } & BridgeInputs['fetchTxs'];
    }
  | {
      type: 'ADD_TX_FUEL_TO_ETH';
      input: {
        fuelTxId?: string;
      } & Omit<BridgeInputs['fetchTxs'], 'fuelAddress'>;
    };

export const bridgeTxsMachine = createMachine(
  {
    tsTypes: {} as import('./bridgeTxsMachine.typegen').Typegen0,
    schema: {
      context: {} as BridgeTxsMachineContext,
      services: {} as MachineServices,
      events: {} as BridgeTxsMachineEvents,
    },
    predictableActionArguments: true,
    id: '(machine)',
    initial: 'idle',
    states: {
      idle: {
        on: {
          FETCH: {
            actions: ['assignFetchInputs'],
            target: 'fetching',
          },
          FETCH_NEXT_PAGE: {
            actions: ['assignFetchNextPage'],
            target: 'fetchingNextPage',
            cond: 'hasNextPage',
          },
          ADD_TX_ETH_TO_FUEL: {
            actions: ['assignTxEthToFuel'],
          },
          ADD_TX_FUEL_TO_ETH: {
            actions: ['assignTxFuelToEth'],
          },
        },
      },
      fetching: {
        tags: ['isLoading'],
        invoke: {
          src: 'fetchTxs',
          data: {
            input: (ctx: BridgeTxsMachineContext) => ({
              ethPublicClient: ctx.ethPublicClient,
              fuelProvider: ctx.fuelProvider,
              fuelAddress: ctx.fuelAddress,
            }),
          },
          onDone: [
            {
              cond: FetchMachine.hasError,
              target: 'idle',
            },
            {
              actions: [
                'assignAllTxs',
                'assignPaginatedTxs',
                'assignTxMachines',
              ],
              target: 'idle',
            },
          ],
        },
      },
      fetchingNextPage: {
        always: {
          actions: ['assignPaginatedTxs', 'assignTxMachines'],
          target: 'idle',
        },
      },
    },
  },
  {
    guards: {
      hasNextPage: (context) => context.hasNextPage,
    },
    actions: {
      assignFetchInputs: assign((ctx, ev) => ({
        fuelProvider: ev.input?.fuelProvider || ctx.fuelProvider,
        ethPublicClient: ev.input?.ethPublicClient || ctx.ethPublicClient,
        fuelAddress: ev.input?.fuelAddress,
        hasNextPage: false,
        amountTxsToShow: TXS_PER_PAGE,
      })),
      assignFetchNextPage: assign((ctx) => ({
        amountTxsToShow: ctx.amountTxsToShow + TXS_PER_PAGE,
      })),
      assignTxMachines: assign({
        ethToFuelTxRefs: (ctx) => {
          const ethToFuelBridgeTxs = ctx.paginatedTxs?.filter(
            ({ fromNetwork }) => isEthChain(fromNetwork),
          );

          const newRefs = ethToFuelBridgeTxs?.reduce((prev, tx) => {
            // safely avoid overriding instance
            if (ctx.ethToFuelTxRefs?.[tx.txHash]) return prev;

            const key = `${tx.txHash}-${tx.nonce}`;

            return {
              ...prev,
              [key]: spawn(
                txEthToFuelMachine.withContext({
                  ethTxId: tx.txHash as HexAddress,
                  inputEthTxNonce: tx.nonce,
                  machineId: key,
                  fuelAddress: ctx.fuelAddress,
                  fuelProvider: ctx.fuelProvider,
                  ethPublicClient: ctx.ethPublicClient,
                }),
                { name: key, sync: true },
              ),
            };
          }, {});

          return {
            ...(ctx.ethToFuelTxRefs || {}),
            ...newRefs,
          };
        },
        fuelToEthTxRefs: (ctx) => {
          const fuelToEthBridgeTxs = ctx.paginatedTxs?.filter(
            ({ fromNetwork }) => isFuelChain(fromNetwork),
          );

          const newRefs = fuelToEthBridgeTxs?.reduce((prev, tx) => {
            // safely avoid overriding instance
            if (ctx.fuelToEthTxRefs?.[tx.txHash]) return prev;

            return {
              ...prev,
              [tx.txHash]: spawn(
                txFuelToEthMachine.withContext({
                  fuelTxId: tx.txHash,
                  fuelProvider: ctx.fuelProvider,
                  ethPublicClient: ctx.ethPublicClient,
                }),
                { name: tx.txHash, sync: true },
              ),
            };
          }, {});

          return {
            ...(ctx.fuelToEthTxRefs || {}),
            ...newRefs,
          };
        },
      }),
      assignTxEthToFuel: assign({
        ethToFuelTxRefs: (ctx, ev) => {
          const {
            ethTxId,
            fuelAddress,
            fuelProvider,
            ethPublicClient,
            inputEthTxNonce,
          } = ev.input || {};
          if (!ethTxId || ctx.ethToFuelTxRefs?.[ethTxId])
            return ctx.ethToFuelTxRefs;

          const key = `${ethTxId}-${inputEthTxNonce}`;

          console.log(`NEW: creating machine Fuel To Eth: ${ethTxId}`);
          const newRef = {
            [key]: spawn(
              txEthToFuelMachine.withContext({
                ethTxId: ethTxId as HexAddress,
                inputEthTxNonce: inputEthTxNonce,
                machineId: key,
                fuelAddress: fuelAddress,
                fuelProvider: fuelProvider,
                ethPublicClient: ethPublicClient,
              }),
              { name: ethTxId, sync: true },
            ),
          };

          return {
            ...(ctx.ethToFuelTxRefs || {}),
            ...newRef,
          };
        },
      }),
      assignTxFuelToEth: assign({
        fuelToEthTxRefs: (ctx, ev) => {
          const { fuelTxId, fuelProvider, ethPublicClient } = ev.input || {};

          if (!fuelTxId || ctx.fuelToEthTxRefs?.[fuelTxId])
            return ctx.fuelToEthTxRefs;

          console.log(`NEW: creating machine Fuel To Eth: ${fuelTxId}`);
          const newRef = {
            [fuelTxId]: spawn(
              txFuelToEthMachine.withContext({
                fuelTxId: fuelTxId as HexAddress,
                fuelProvider: fuelProvider,
                ethPublicClient: ethPublicClient,
              }),
              { name: fuelTxId, sync: true },
            ),
          };

          return {
            ...(ctx.fuelToEthTxRefs || {}),
            ...newRef,
          };
        },
      }),
      assignAllTxs: assign((_, ev) => ({
        allTxs: ev.data,
      })),
      assignPaginatedTxs: assign((ctx) => ({
        paginatedTxs: ctx.allTxs?.slice(0, ctx.amountTxsToShow),
        hasNextPage: ctx.allTxs && ctx.allTxs.length > ctx.amountTxsToShow,
      })),
    },
    services: {
      fetchTxs: FetchMachine.create<
        BridgeInputs['fetchTxs'],
        MachineServices['fetchTxs']['data']
      >({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          if (!input) {
            throw new Error('No input to bridge');
          }

          // Enforce a minimum delay to show the loading state
          // this creates a better experience for the user as the
          // screen doesn't flash between states
          await delay(250);

          const txs = await BridgeService.fetchTxs(input);

          return txs;
        },
      }),
    },
  },
);

export type BridgeTxsMachine = typeof bridgeTxsMachine;
export type BridgeTxsMachineService = InterpreterFrom<BridgeTxsMachine>;
export type BridgeTxsMachineState = StateFrom<BridgeTxsMachine>;
