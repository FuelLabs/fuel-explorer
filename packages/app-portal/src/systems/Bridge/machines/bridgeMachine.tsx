import { toast } from '@fuels/ui';
import type { Account, Address, Asset, NetworkFuel, Provider } from 'fuels';
import type { BN } from 'fuels';
import type { InterpreterFrom, StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';
import { type FromToNetworks, isFuelChain } from '~portal/systems/Chains';
import { FetchMachine } from '~portal/systems/Core/machines';

import { type HexAddress, trackEvent } from 'app-commons';
import { WarningToast } from 'app-commons';
import { readContractQueryKey } from 'wagmi/query';
import { getAssetEthCurrentChain } from '~portal/systems/Assets/utils';
import { getQueryClient } from '~portal/systems/Settings/providers/ReactQueryProvider';
import { BridgeService } from '../services';
import type { BridgeInputs, PossibleBridgeInputs } from '../services';
import { truncateMaxSizeString } from '../utils/string';

type MachineContext = {
  assetAmount?: BN;
  asset?: Asset;
  ethAddress?: HexAddress;
  fuelAsset?: NetworkFuel;
  fuelProvider?: Provider;
  fuelAddress?: Address;
  fuelWallet?: Account;
  ethWalletClient?: any;
  ethPublicClient?: any;
  toCustomAddress?: string;
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
    }
  | {
      type: 'START_ALLOWANCE';
      input: PossibleBridgeInputs;
    }
  | {
      type: 'CHANGE_TO_ADDRESS';
      input: { toCustomAddress?: string };
    };

export const BRIDGE_ACCEPT_TOS_STORAGE_KEY = 'fuel.bridge.agree';

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
            target: 'checkRequiresAllowance',
            actions: ['assignBridgingInputs'],
          },
          START_ALLOWANCE: {
            target: 'allowing',
          },
          CHANGE_TO_ADDRESS: {
            actions: assign({
              toCustomAddress: (_, event) => event.input.toCustomAddress,
            }),
          },
        },
      },
      checkRequiresAllowance: {
        invoke: {
          src: 'checkRequiresAllowance',
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
              cond: (_, event) => !!event.data.requiresAllowance,
              target: 'allowing',
            },
            {
              cond: (_, event) => event.data.requiresAllowance != null,
              target: 'bridging',
            },
            {
              target: 'idle',
              actions: ['clearBridgingInputs'],
            },
          ],
        },
      },
      bridging: {
        invoke: {
          src: 'bridge',
          data: {
            input: (ctx: MachineContext) => {
              return {
                fromNetwork: ctx.fromNetwork,
                toNetwork: ctx.toNetwork,
                assetAmount: ctx.assetAmount,
                fuelAddress: ctx.fuelAddress,
                toCustomAddress: ctx.toCustomAddress,
                asset: ctx.asset,
                ethWalletClient: ctx.ethWalletClient,
                ethPublicClient: ctx.ethPublicClient,
                fuelWallet: ctx.fuelWallet,
                ethAddress: ctx.ethAddress,
                fuelAsset: ctx.fuelAsset,
                fuelProvider: ctx.fuelProvider,
              };
            },
          },
          onDone: [
            {
              cond: FetchMachine.hasError,
              target: 'idle',
              actions: ['clearBridgingInputs', 'clearAllowance'],
            },
            {
              actions: [
                'clearBridgingInputs',
                'clearAllowance',
                'clearAssetAmmount',
                'notifyTxStarted',
                'acceptTermsOfService',
              ],
              target: 'idle',
            },
          ],
        },
      },
      allowing: {
        invoke: {
          src: 'askForAllowance',
          data: {
            input: (ctx: MachineContext) => ({
              assetAmount: ctx.assetAmount,
              asset: ctx.asset,
              ethWalletClient: ctx.ethWalletClient,
              ethPublicClient: ctx.ethPublicClient,
            }),
          },
          onDone: [
            {
              cond: FetchMachine.hasError,
              target: 'idle',
            },
            {
              target: 'bridging',
              actions: ['clearAllowance'],
            },
          ],
        },
      },
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
      assignBridgingInputs: assign((ctx, ev) => ({
        ethAddress: ev.input.ethAddress,
        fuelAsset: ev.input.fuelAsset,
        fuelProvider: ev.input.fuelProvider,
        fuelAddress: ev.input.fuelAddress,
        fuelWallet: ev.input.fuelWallet,
        ethWalletClient: ev.input.ethWalletClient,
        ethPublicClient: ev.input.ethPublicClient,
        toCustomAddress: ev.input.toCustomAddress,
        asset: ev.input.asset || ctx.asset,
      })),
      clearBridgingInputs: assign({
        ethAddress: undefined,
        fuelAsset: undefined,
        fuelProvider: undefined,
        fuelAddress: undefined,
        fuelWallet: undefined,
        ethWalletClient: undefined,
        ethPublicClient: undefined,
      }),
      clearAssetAmmount: assign({
        assetAmount: undefined,
      }),
      clearAllowance: assign((ctx) => {
        const address = ctx.asset && getAssetEthCurrentChain(ctx.asset).address;
        const queryClient = getQueryClient();
        if (address && queryClient) {
          queryClient.invalidateQueries({
            queryKey: readContractQueryKey({
              functionName: 'allowance',
              address: address as HexAddress,
            }),
          });
        }
        return {};
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
      acceptTermsOfService: () => {
        const tosTimestamp = localStorage.getItem(
          BRIDGE_ACCEPT_TOS_STORAGE_KEY,
        );

        if (tosTimestamp) {
          return;
        }

        localStorage.setItem(
          BRIDGE_ACCEPT_TOS_STORAGE_KEY,
          Date.now().toString(),
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
          try {
            await BridgeService.bridge(input);
          } catch (error: any) {
            if (error.details) {
              if (error.details.includes('User denied transaction')) {
                throw new Error('User rejected the transaction');
              }
            }
            if (error instanceof WarningToast) {
              throw error;
            }
            if (error.message) {
              throw new Error(truncateMaxSizeString(error.message, 100));
            }
            throw truncateMaxSizeString(error.message, 100);
          }

          const isWithdraw = isFuelChain(input.fromNetwork);
          trackEvent({
            eventType: 'bridge',
            eventName: `bridge-${isWithdraw ? 'withdraw' : 'deposit'}`,
            parameters: {
              asset: input.asset?.symbol,
              addressFrom: input.ethAddress,
              addressTo: input.toCustomAddress || input.fuelAddress?.toString(),
            },
          });
        },
      }),
      askForAllowance: FetchMachine.create<
        BridgeInputs['askForAllowance'],
        void
      >({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          console.log('askForAllowance');
          if (!input) {
            throw new Error('No input to ask for allowance');
          }
          await BridgeService.askForAllowance(input);
        },
      }),
      checkRequiresAllowance: FetchMachine.create<
        BridgeInputs['bridge'],
        BridgeInputs['requiresAllowance']
      >({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          console.log('checkRequiresAllowance');
          if (!input) {
            throw new Error('No input to check requires for allowance');
          }
          return {
            ...input,
            requiresAllowance: await BridgeService.requiresAllowance(input),
          } as BridgeInputs['requiresAllowance'];
        },
      }),
    },
  },
);

export type BridgeMachine = typeof bridgeMachine;
export type BridgeMachineService = InterpreterFrom<BridgeMachine>;
export type BridgeMachineState = StateFrom<BridgeMachine>;
