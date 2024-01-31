import { bn, DECIMAL_UNITS, fromTai64ToUnix } from 'fuels';
import type {
  Address as FuelAddress,
  BN,
  Provider as FuelProvider,
} from 'fuels';
import type { PublicClient, WalletClient } from 'wagmi';
import { store } from '~/store';
import type { Asset } from '~/systems/Assets/services/asset';
import { getAssetEth, getAssetFuel } from '~/systems/Assets/utils';
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
  getBlockDate,
  ETH_CHAIN,
  FUEL_CHAIN,
  EthTxCache,
  FuelTxCache,
} from '~/systems/Chains';

import type { BridgeTx } from '../types';

export type PossibleBridgeInputs = {
  assetAmount?: BN;
  ethWalletClient?: WalletClient;
  ethPublicClient?: PublicClient;
  fuelAddress?: FuelAddress;
  asset?: Asset;
} & Omit<TxEthToFuelInputs['startErc20'], 'amount'> &
  Omit<TxFuelToEthInputs['startFungibleToken'], 'amount'>;
export type BridgeInputs = {
  bridge: FromToNetworks & PossibleBridgeInputs;
  fetchTxs: {
    fuelProvider?: FuelProvider;
    ethPublicClient?: PublicClient;
    fuelAddress?: FuelAddress;
  };
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
      asset,
      fuelProvider,
    } = input;

    if (!fromNetwork || !toNetwork) {
      throw new Error('"Network From" and "Network To" are required');
    }
    if (!assetAmount || assetAmount.isZero()) {
      throw new Error('Need to inform amount to be transfered');
    }
    if (!asset) {
      throw new Error('Need to inform asset to be transfered');
    }

    if (isEthChain(fromNetwork) && isFuelChain(toNetwork)) {
      const amountFormatted = assetAmount.format({
        precision: DECIMAL_UNITS,
        units: DECIMAL_UNITS,
      });

      const assetEth = getAssetEth(asset);
      const assetFuel = getAssetFuel(asset);
      const amountEthUnits = bn.parseUnits(amountFormatted, assetEth.decimals);
      const txId = await TxEthToFuelService.start({
        amount: amountEthUnits.toHex(),
        ethWalletClient,
        fuelAddress,
        ethAssetAddress: assetEth.address,
        fuelContractId: assetFuel.contractId,
        ethPublicClient,
      });

      if (txId) {
        if (fuelWallet) {
          store.addTxEthToFuel({
            ethTxId: txId,
            fuelProvider,
            ethPublicClient,
            fuelAddress,
          });
          store.openTxEthToFuel({
            txId,
          });
          EthTxCache.setTxIsCreated(txId);
        }
      }

      return;
    }

    if (isFuelChain(fromNetwork) && isEthChain(toNetwork)) {
      const fuelAsset = getAssetFuel(asset);
      const txId = await TxFuelToEthService.start({
        amount: assetAmount,
        fuelWallet,
        ethAddress,
        fuelAsset,
        fuelProvider,
      });

      if (txId) {
        if (fuelWallet) {
          store.addTxFuelToEth({
            fuelTxId: txId,
            fuelProvider,
            ethPublicClient,
          });
          store.openTxFuelToEth({
            txId,
          });
          FuelTxCache.setTxIsCreated(txId);
        }

        return;
      }
    }

    throw new Error(
      `Bridging from "${fromNetwork.name}" to "${toNetwork.name}" is not yet supported.`
    );
  }

  static async fetchTxs(
    input?: BridgeInputs['fetchTxs']
  ): Promise<BridgeTx[] | undefined> {
    if (!input?.ethPublicClient) {
      throw new Error('Need to inform ethPublicClient');
    }
    if (!input?.fuelProvider) {
      throw new Error('Need to inform fuelProvider');
    }
    if (!input?.fuelAddress) {
      return undefined;
    }

    const { fuelProvider, ethPublicClient, fuelAddress } = input;

    const [ethDepositLogs, fuelToEthTxs] = await Promise.all([
      TxEthToFuelService.fetchDepositLogs({ ethPublicClient, fuelAddress }),
      TxFuelToEthService.fetchTxs({ fuelAddress, fuelProvider }),
    ]);

    const fuelToEthBridgeTxs = fuelToEthTxs.map((tx) => ({
      txHash: tx.id || '',
      fromNetwork: FUEL_CHAIN,
      toNetwork: ETH_CHAIN,
      // TODO: remove this conversion when sdk already returns the date in unix format
      date: tx?.time ? new Date(fromTai64ToUnix(tx?.time) * 1000) : undefined,
    }));

    const ethToFuelBridgeTxs = await Promise.all(
      ethDepositLogs.map(async (log) => {
        const blockHash = log?.blockHash || '0x';

        const date = await getBlockDate({
          blockHash,
          publicClient: ethPublicClient,
        });

        return {
          txHash: log?.transactionHash || '0x',
          fromNetwork: ETH_CHAIN,
          toNetwork: FUEL_CHAIN,
          date,
        };
      })
    );

    // logic to merge txs and sort by date
    const allTxs = [
      ...(fuelToEthBridgeTxs || []),
      ...(ethToFuelBridgeTxs || []),
    ];
    const txs = allTxs.sort((a, b) => {
      if (!a?.date) {
        return 1;
      }
      if (!b?.date) {
        return -1;
      }
      return b.date.getTime() - a.date.getTime();
    });

    return txs || [];
  }
}
