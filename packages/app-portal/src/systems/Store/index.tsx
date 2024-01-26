import { createStore } from '@fuels/react-xstore';
import {
  bridgeMachine,
  bridgeEvents,
  bridgeTxsMachine,
} from '~/systems/Bridge';
import { ecosystemMachine } from '~/systems/Ecosystem';
import { overlayMachine, overlayEvents } from '~/systems/Overlay';

import { assetsEvents, assetsMachine } from '../Assets';

import { Services } from './types';
import type { StoreMachines } from './types';

export * from './types';

export const store$ = createStore<StoreMachines>({
  id: 'fuelStore',
});

export const store = store$
  .addMachine(Services.overlay, () => overlayMachine)
  .addMachine(Services.bridge, () => bridgeMachine)
  .addMachine(Services.bridgeTxs, () => bridgeTxsMachine)
  .addMachine(Services.ecosystem, () => ecosystemMachine)
  .addMachine(Services.assets, () => assetsMachine)
  .addHandlers(overlayEvents)
  .addHandlers(bridgeEvents)
  .addHandlers(assetsEvents)
  .setup();

export const { StoreProvider } = store;
