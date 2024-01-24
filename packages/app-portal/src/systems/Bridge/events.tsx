import type { BN } from 'fuels';

import type { FromToNetworks } from '../Chains';
import type { Store } from '../Store';
import { Services } from '../Store';

import type { PossibleBridgeInputs } from './services';

export function bridgeEvents(store: Store) {
  return {
    changeNetworks(input: FromToNetworks) {
      store.send(Services.bridge, { type: 'CHANGE_NETWORKS', input });
    },
    changeAssetAddress(input: { assetAddress?: string }) {
      store.send(Services.bridge, { type: 'CHANGE_ASSET_ADDRESS', input });
    },
    startBridging(input: PossibleBridgeInputs) {
      store.send(Services.bridge, { type: 'START_BRIDGING', input });
    },
    changeAssetAmount(input: { assetAmount?: BN }) {
      store.send(Services.bridge, { type: 'CHANGE_ASSET_AMOUNT', input });
    },
  };
}
