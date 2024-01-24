import { bn, DECIMAL_UNITS } from 'fuels';
import type { Address as FuelAddress, BN } from 'fuels';
import type { PublicClient, WalletClient } from 'wagmi';
import { store } from '~/store';
import type {
  FromToNetworks,
  TxEthToFuelInputs,
  TxFuelToEthInputs,
} from '~/systems/Chains';
import {
  TxFuelToEthService,
  isEthChain,
  isFuelChain,
  TxEthToFuelService,
} from '~/systems/Chains';

import type { BridgeAsset } from '../types';

export type PossibleBridgeInputs = {
  assetAmount?: BN;
  ethWalletClient?: WalletClient;
  ethPublicClient?: PublicClient;
  fuelAddress?: FuelAddress;
  ethAsset?: BridgeAsset;
  fuelAsset?: BridgeAsset;
} & Omit<TxEthToFuelInputs['start'], 'amount'> &
  Omit<TxFuelToEthInputs['create'], 'amount'>;
export type BridgeInputs = {
  bridge: FromToNetworks & PossibleBridgeInputs;
};

export class BridgeService {
  static async bridge(input: BridgeInputs['bridge']) {
    const {
      fromNetwork,
      toNetwork,
      assetAmount,
      ethWalletClient,
      ethPublicClient,
      fuelAddress,
      fuelWallet,
      ethAddress,
      ethAsset,
    } = input;

    if (!fromNetwork || !toNetwork) {
      throw new Error('"Network From" and "Network To" are required');
    }
    if (!assetAmount || assetAmount.isZero()) {
      throw new Error('Need to inform amount to be transfered');
    }

    if (isEthChain(fromNetwork) && isFuelChain(toNetwork)) {
      if (!ethAsset) {
        throw new Error('Need to inform asset to be transfered');
      }

      const amountFormatted = assetAmount.format({
        precision: DECIMAL_UNITS,
        units: DECIMAL_UNITS,
      });
      const amountEthUnits = bn.parseUnits(amountFormatted, ethAsset.decimals);
      const txId = await TxEthToFuelService.start({
        amount: amountEthUnits.toHex(),
        ethWalletClient,
        fuelAddress,
        ethAsset,
        ethPublicClient,
      });

      if (txId) {
        store.openTxEthToFuel({
          txId,
        });
      }

      return;
    }

    if (isFuelChain(fromNetwork) && isEthChain(toNetwork)) {
      const txId = await TxFuelToEthService.create({
        amount: assetAmount,
        fuelWallet,
        ethAddress,
      });

      if (txId) {
        store.openTxFuelToEth({
          txId,
        });

        return;
      }
    }

    throw new Error(
      `Bridging from "${fromNetwork.name}" to "${toNetwork.name}" is not yet supported.`
    );
  }
}
