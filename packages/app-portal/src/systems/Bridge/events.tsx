import type { Asset } from '@fuel-ts/account';
import type { Account as FuelWallet, BN } from 'fuels';
import type { WalletClient } from 'viem';

import type { FromToNetworks } from '../Chains';
import type { Store } from '../Store';
import { Services } from '../Store';

import type { BridgeInputs, PossibleBridgeInputs } from './services';

export function bridgeEvents(store: Store) {
  return {
    changeNetworks(input: FromToNetworks) {
      store.send(Services.bridge, { type: 'CHANGE_NETWORKS', input });
    },
    changeAsset(input: { asset?: Asset }) {
      store.send(Services.bridge, { type: 'CHANGE_ASSET', input });
    },
    startBridging(input: PossibleBridgeInputs) {
      store.send(Services.bridge, { type: 'START_BRIDGING', input });
    },
    changeAssetAmount(input: { assetAmount?: BN }) {
      store.send(Services.bridge, { type: 'CHANGE_ASSET_AMOUNT', input });
    },
    fetchTxs(input?: BridgeInputs['fetchTxs']) {
      if (!input) return;

      store.send(Services.bridgeTxs, { type: 'FETCH', input });
    },
    fetchNextPage() {
      store.send(Services.bridgeTxs, { type: 'FETCH_NEXT_PAGE' });
    },
    addTxEthToFuel(
      input?: { ethTxId?: `0x${string}` } & BridgeInputs['fetchTxs'],
    ) {
      if (!input) return;

      store.send(Services.bridgeTxs, { type: 'ADD_TX_ETH_TO_FUEL', input });
    },
    addTxFuelToEth(
      input?: { fuelTxId?: string } & Omit<
        BridgeInputs['fetchTxs'],
        'fuelAddress'
      >,
    ) {
      if (!input) return;

      store.send(Services.bridgeTxs, { type: 'ADD_TX_FUEL_TO_ETH', input });
    },
    relayTxFuelToEth({
      input,
      fuelTxId,
    }: {
      input?: { ethWalletClient: WalletClient };
      fuelTxId: string;
    }) {
      if (!input) return;

      // TODO: make store.send function support this last object prop
      const service = store.services[Services.bridgeTxs];
      const snapshot = service.getSnapshot();
      const txFuelToEthMachine = snapshot?.context.fuelToEthTxRefs?.[fuelTxId];

      txFuelToEthMachine.send({ type: 'RELAY_TO_ETH', input });
    },
    relayMessageEthToFuel({
      input,
      ethTxId,
    }: {
      input?: {
        fuelWallet: FuelWallet;
      };
      ethTxId: `0x${string}`;
    }) {
      if (!input) return;

      // TODO: make store.send function support this last object prop
      const service = store.services[Services.bridgeTxs];
      const snapshot = service.getSnapshot();
      const txEthToFuelMachine = snapshot?.context.ethToFuelTxRefs?.[ethTxId];

      txEthToFuelMachine.send({ type: 'RELAY_MESSAGE_ON_FUEL', input });
    },
  };
}
