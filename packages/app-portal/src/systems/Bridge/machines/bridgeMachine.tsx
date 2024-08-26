import type { Asset } from '@fuel-ts/account';
import { toast } from '@fuels/ui';
import type { BN } from 'fuels';
import type { InterpreterFrom, StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';
import { type FromToNetworks, isFuelChain } from '~portal/systems/Chains';
import { FetchMachine } from '~portal/systems/Core/machines';

import { trackEvent } from 'app-commons';
import { BridgeService } from '../services';
import type { BridgeInputs, PossibleBridgeInputs } from '../services';

type MachineContext = {
  assetAmount?: BN;
  asset?: Asset;
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
  waitingAssetAmount = 'Enter amount',
  insufficientBalance = 'Insufficient funds',
  ready = 'ready',
}

export type BridgeMachineEvents =
  | {
      type: 'CHANGE_NETWORKS';
      input: FromToNetworks;
    }
  | {
      type: 'CHANGE_ASSET';
      input: { asset?: Asset };
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
          CHANGE_ASSET: {
            actions: ['assignAsset'],
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
              ev: Extract<BridgeMachineEvents, { type: 'START_BRIDGING' }>,
            ) => ({
              fromNetwork: ctx.fromNetwork,
              toNetwork: ctx.toNetwork,
              assetAmount: ctx.assetAmount,
              fuelAddress: ev.input.fuelAddress,
              asset: ev.input.asset,
              ethWalletClient: ev.input.ethWalletClient,
              ethPublicClient: ev.input.ethPublicClient,
              fuelWallet: ev.input.fuelWallet,
              ethAddress: ev.input.ethAddress,
              fuelAsset: ev.input.fuelAsset,
              fuelProvider: ev.input.fuelProvider,
            }),
          },
          onDone: [
            {
              cond: FetchMachine.hasError,
              target: 'idle',
            },
            {
              actions: ['clearAssetAmmount', 'notifyTxStarted'],
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
      assignNetworks: assign({
        fromNetwork: (_, ev) => ev.input.fromNetwork,
        toNetwork: (_, ev) => ev.input.toNetwork,
      }),
      assignAssetAmount: assign({
        assetAmount: (_, ev) => ev.input.assetAmount,
      }),
      assignAsset: assign({
        asset: (_, ev) => ev.input.asset,
      }),
      clearAssetAmmount: assign({
        assetAmount: undefined,
      }),
      notifyTxStarted: (ctx) => {
        const isDeposit = isFuelChain(ctx.toNetwork);
        toast.success(
          `${
            isDeposit ? 'Deposit' : 'Withdraw'
          } successfully initiated. You may now close the popup.`,
          {
            duration: 5000,
          },
        );
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

          const isWithdraw = isFuelChain(input.fromNetwork);
          trackEvent({
            eventType: 'bridge',
            eventName: `bridge-${isWithdraw ? 'withdraw' : 'deposit'}`,
            parameters: {
              asset: input.asset?.symbol,
              addressFrom: input.ethAddress,
              addressTo: input.fuelAddress?.toB256(),
            },
          });
        },
      }),
    },
  },
);

export type BridgeMachine = typeof bridgeMachine;
export type BridgeMachineService = InterpreterFrom<BridgeMachine>;
export type BridgeMachineState = StateFrom<BridgeMachine>;
