import type { StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';
import type { BridgeAsset } from '~/systems/Bridge';
import { FetchMachine } from '~/systems/Core/machines';

import { AssetList } from '../constants';
import type { AssetServiceInputs } from '../services';
import { AssetService } from '../services';

type MachineContext = {
  assetList?: BridgeAsset[];
};

type MachineServices = {
  fetchAssets: {
    data: BridgeAsset[];
  };
  addAsset: {
    data: boolean;
  };
  removeAsset: {
    data: boolean;
  };
};

type AssetListMachineEvents =
  | {
      type: 'ADD_ASSET';
      input: { asset: BridgeAsset };
    }
  | {
      type: 'REMOVE_ASSET';
      input: { address?: string };
    };

export const ethAssetListMachine = createMachine(
  {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    tsTypes: {} as import('./assetsMachine.typegen').Typegen0,
    schema: {
      context: {} as MachineContext,
      services: {} as MachineServices,
      events: {} as AssetListMachineEvents,
    },
    predictableActionArguments: true,
    id: '(machine)',
    initial: 'fetchingAssets',
    states: {
      fetchingAssets: {
        tags: ['loading'],
        invoke: {
          src: 'fetchAssets',
          onDone: [
            {
              actions: ['assignAssets'],
              target: 'idle',
            },
          ],
        },
      },
      idle: {
        on: {
          ADD_ASSET: {
            target: 'adding',
          },
          REMOVE_ASSET: {
            target: 'removing',
          },
        },
      },
      adding: {
        tags: ['loading'],
        invoke: {
          src: 'addAsset',
          data: {
            input: (_: MachineContext, ev: AssetListMachineEvents) => ev.input,
          },
          onDone: {
            target: 'fetchingAssets',
          },
        },
      },
      removing: {
        tags: ['loading'],
        invoke: {
          src: 'removeAsset',
          data: {
            input: (_: MachineContext, ev: AssetListMachineEvents) => ev.input,
          },
          onDone: [
            {
              target: 'fetchingAssets',
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      assignAssets: assign({
        assetList: (_, ev) => ev.data,
      }),
    },
    services: {
      fetchAssets: FetchMachine.create<
        null,
        MachineServices['fetchAssets']['data']
      >({
        showError: true,
        async fetch() {
          const assets = await AssetService.getAssets();
          return [...AssetList, ...assets];
        },
      }),
      addAsset: FetchMachine.create<
        AssetServiceInputs['addAsset'],
        MachineServices['addAsset']['data']
      >({
        showError: true,
        async fetch({ input }) {
          if (!input) {
            throw new Error('No input to add asset');
          }

          await AssetService.addAsset({ asset: input.asset });
          return true;
        },
      }),
      removeAsset: FetchMachine.create<
        AssetServiceInputs['removeAsset'],
        MachineServices['removeAsset']['data']
      >({
        showError: true,
        async fetch({ input }) {
          if (!input) {
            throw new Error('Missing data');
          }

          await AssetService.removeAsset(input);
          return true;
        },
      }),
    },
  }
);

export type EthAssetListMachine = typeof ethAssetListMachine;
export type EthAssetListMachineState = StateFrom<EthAssetListMachine>;
