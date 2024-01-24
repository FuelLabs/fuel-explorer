import type { StoreClass } from '@fuels/react-xstore';
import type { BridgeMachine } from '~/systems/Bridge';
import type { EcosystemMachine } from '~/systems/Ecosystem';
import type { OverlayMachine } from '~/systems/Overlay';

import type { EthAssetListMachine } from '../Chains';

export enum Services {
  overlay = 'overlay',
  bridge = 'bridge',
  ecosystem = 'ecosystem',
  ethAssetList = 'ethAssetList',
}

export type StoreMachines = {
  overlay: OverlayMachine;
  bridge: BridgeMachine;
  ecosystem: EcosystemMachine;
  ethAssetList: EthAssetListMachine;
};

export type Store = StoreClass<StoreMachines>;
