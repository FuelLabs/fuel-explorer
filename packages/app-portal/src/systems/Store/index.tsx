import { createStore } from '@fuels/react-xstore';
import { bridgeEvents } from '~portal/systems/Bridge/events';
import {
  bridgeMachine,
  bridgeTxsMachine,
} from '~portal/systems/Bridge/machines';
import { ecosystemMachine } from '~portal/systems/Ecosystem/machines';
import { overlayEvents } from '~portal/systems/Overlay/events';
import { overlayMachine } from '~portal/systems/Overlay/machines';

import { assetsEvents } from '../Assets/events';
import { assetsMachine } from '../Assets/machines';

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
