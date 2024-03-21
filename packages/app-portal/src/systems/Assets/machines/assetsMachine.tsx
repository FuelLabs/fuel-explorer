import type { Asset } from '@fuels/assets';
import type { InterpreterFrom, StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';
import { FetchMachine } from '~portal/systems/Core/machines/fetchMachine';

import { toast } from '@fuels/ui';
import { getBridgeTokenContracts } from 'app-commons';
import type { AssetServiceInputs } from '../services/asset';
import { AssetService } from '../services/asset';
import { getDefaultAssets } from '../utils/defaultAssets';

export type MachineContext = {
  assets?: Asset[];
};

type MachineServices = {
  fetchAssets: {
    data: Asset[];
  };
  faucetErc20: {
    data: boolean;
  };
};

type MachineEvents = {
  type: 'FAUCET_ERC20';
  input: AssetServiceInputs['faucetErc20'];
};

export const assetsMachine = createMachine(
  {
    predictableActionArguments: true,
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    tsTypes: {} as import('./assetsMachine.typegen').Typegen0,
    schema: {
      context: {} as MachineContext,
      services: {} as MachineServices,
      events: {} as MachineEvents,
    },
    id: '(machine)',
    initial: 'fetchingAssets',
    states: {
      fetchingAssets: {
        tags: ['loading'],
        invoke: {
          src: 'fetchAssets',
          onDone: [
            {
              target: 'idle',
              cond: FetchMachine.hasError,
            },
            {
              actions: ['assignAssets'],
              target: 'idle',
            },
          ],
        },
      },
      idle: {
        on: {
          FAUCET_ERC20: {
            target: 'fauceting',
          },
        },
      },
      fauceting: {
        tags: ['loadingFaucet'],
        invoke: {
          src: 'faucetErc20',
          data: {
            input: (_: MachineContext, ev: MachineEvents) => ev.input,
          },
          onDone: [
            {
              target: 'idle',
              cond: FetchMachine.hasError,
            },
            {
              actions: ['notifyFaucetSuccess'],
              target: 'idle',
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      assignAssets: assign({
        assets: (_, ev) => ev.data,
      }),
      notifyFaucetSuccess: () => {
        toast.success('Added tokens to your wallet');
      },
    },
    services: {
      fetchAssets: FetchMachine.create<
        null,
        MachineServices['fetchAssets']['data']
      >({
        showError: true,
        async fetch() {
          const bridgeTokenContracts = await getBridgeTokenContracts();
          const defaultAssets = getDefaultAssets(bridgeTokenContracts);

          return defaultAssets;
        },
      }),
      faucetErc20: FetchMachine.create<
        AssetServiceInputs['faucetErc20'],
        MachineServices['faucetErc20']['data']
      >({
        showError: true,
        maxAttempts: 1,
        async fetch({ input }) {
          if (!input) {
            throw new Error('Missing data');
          }

          await AssetService.faucetErc20(input);
          return true;
        },
      }),
    },
  },
);

export type AssetsMachine = typeof assetsMachine;
export type AssetsMachineState = StateFrom<AssetsMachine>;
export type AssetsMachineService = InterpreterFrom<AssetsMachine>;
