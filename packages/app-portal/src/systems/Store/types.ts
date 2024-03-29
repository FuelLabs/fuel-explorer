import type { StoreClass } from '@fuels/react-xstore';
import type {
  BridgeMachine,
  BridgeTxsMachine,
} from '~portal/systems/Bridge/machines';
import type { EcosystemMachine } from '~portal/systems/Ecosystem/machines';
import type { OverlayMachine } from '~portal/systems/Overlay';

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
