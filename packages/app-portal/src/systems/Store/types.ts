import type { StoreClass } from '@fuels/react-xstore';
import type { BridgeMachine, BridgeTxsMachine } from '~/systems/Bridge';
import type { EcosystemMachine } from '~/systems/Ecosystem';
import type { OverlayMachine } from '~/systems/Overlay';

import type { AssetsMachine } from '../Assets/machines/assetsMachine';

export enum Services {
  overlay = 'overlay',
  bridge = 'bridge',
  bridgeTxs = 'bridgeTxs',
  ecosystem = 'ecosystem',
  assets = 'assets',
}

export type StoreMachines = {
  overlay: OverlayMachine;
  bridge: BridgeMachine;
  bridgeTxs: BridgeTxsMachine;
  ecosystem: EcosystemMachine;
  assets: AssetsMachine;
};

export type Store = StoreClass<StoreMachines>;
