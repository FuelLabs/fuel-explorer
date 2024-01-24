import type { BN } from 'fuels';
import type { InterpreterFrom, StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';
import { store } from '~/store';
import type { FromToNetworks } from '~/systems/Chains';
import { FetchMachine } from '~/systems/Core/machines';

import { BridgeService } from '../services';
import type { BridgeInputs, PossibleBridgeInputs } from '../services';

type MachineContext = {
  assetAmount?: BN;
  assetAddress?: string;
} & Partial<FromToNetworks>;

type MachineServices = {
  bridge: {
    data: string;
  };
};

export enum BridgeStatus {
  waitingNetworkFrom = 'Select a network to bridge from',
  waitingNetworkTo = 'Select a network to bridge to',
  waitingConnectFrom = 'Connect From Wallet',
  waitingConnectTo = 'Connect To Wallet',
  waitingAsset = 'Pick asset',
  waitingAssetAmount = 'Type amount to operation',
  insufficientBalance = 'Insufficient funds',
  ready = 'ready',
}

export type BridgeMachineEvents =
  | {
      type: 'CHANGE_NETWORKS';
      input: FromToNetworks;
    }
  | {
      type: 'CHANGE_ASSET_ADDRESS';
      input: { assetAddress?: string };
    }
  | {
      type: 'CHANGE_ASSET_AMOUNT';
      input: { assetAmount?: BN };
    }
  | {
      type: 'START_BRIDGING';
      input: PossibleBridgeInputs;
    };

export const bridgeMachine = createMachine(
  {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    tsTypes: {} as import('./bridgeMachine.typegen').Typegen0,
    schema: {
      context: {} as MachineContext,
      services: {} as MachineServices,
      events: {} as BridgeMachineEvents,
    },
    predictableActionArguments: true,
    id: '(machine)',
    initial: 'idle',
    states: {
      idle: {
        on: {
          CHANGE_NETWORKS: {
            actions: ['assignNetworks'],
          },
          CHANGE_ASSET_AMOUNT: {
            actions: ['assignAssetAmount'],
          },
          CHANGE_ASSET_ADDRESS: {
            actions: ['assignAssetAddress', 'closeOverlay'],
          },
          START_BRIDGING: {
            target: 'bridging',
          },
        },
      },
      bridging: {
        invoke: {
          src: 'bridge',
          data: {
            input: (
              ctx: MachineContext,
              ev: Extract<BridgeMachineEvents, { type: 'START_BRIDGING' }>
            ) => ({
              fromNetwork: ctx.fromNetwork,
              toNetwork: ctx.toNetwork,
              assetAmount: ctx.assetAmount,
              fuelAddress: ev.input.fuelAddress,
              ethAsset: ev.input.ethAsset,
              ethWalletClient: ev.input.ethWalletClient,
              ethPublicClient: ev.input.ethPublicClient,
              fuelWallet: ev.input.fuelWallet,
              ethAddress: ev.input.ethAddress,
            }),
          },
          onDone: [
            {
              cond: FetchMachine.hasError,
              target: 'idle',
            },
            {
              actions: ['clearAssetAmmount'],
              target: 'idle',
            },
          ],
        },
      },
      failed: {},
    },
  },
  {
    actions: {
      assignNetworks: assign((ctx, ev) => ({
        ...ctx,
        fromNetwork: ev.input.fromNetwork,
        toNetwork: ev.input.toNetwork,
      })),
      assignAssetAmount: assign({
        assetAmount: (_, ev) => ev.input.assetAmount,
      }),
      assignAssetAddress: assign({
        assetAddress: (_, ev) => ev.input.assetAddress,
      }),
      clearAssetAmmount: assign({
        assetAmount: undefined,
      }),
      closeOverlay: () => {
        store.closeOverlay();
      },
    },
    services: {
      bridge: FetchMachine.create<BridgeInputs['bridge'], void>({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          if (!input) {
            throw new Error('No input to bridge');
          }

          await BridgeService.bridge(input);
        },
      }),
    },
  }
);

export type BridgeMachine = typeof bridgeMachine;
export type BridgeMachineService = InterpreterFrom<BridgeMachine>;
export type BridgeMachineState = StateFrom<BridgeMachine>;
