import type { Asset } from 'fuels';
import { Address } from 'fuels';
import type {
  BN,
  Account as FuelAccount,
  Address as FuelAddress,
  Provider as FuelProvider,
} from 'fuels';
import { store } from '~portal/store';
import {
  getAssetEthCurrentChain,
  getAssetFuelCurrentChain,
} from '~portal/systems/Assets/utils';
import type {
  FromToNetworks,
  TxEthToFuelInputs,
  TxFuelToEthInputs,
} from '~portal/systems/Chains';
import {
  EthTxCache,
  FuelTxCache,
  TxEthToFuelService,
  TxFuelToEthService,
  getBlockDate,
  isErc20Address,
  isEthChain,
  isFuelChain,
} from '~portal/systems/Chains';

import { ETH_CHAIN, FUEL_CHAIN, type HexAddress } from 'app-commons';
import type { PublicClient, WalletClient } from 'viem';
import type { BridgeTx } from '../types';

export type PossibleBridgeInputs = {
  assetAmount?: BN;
  ethWalletClient?: WalletClient;
  ethPublicClient?: PublicClient;
  fuelAddress?: FuelAddress;
  toCustomAddress?: string;
  fuelWallet?: FuelAccount;
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
  requiresAllowance: FromToNetworks &
    PossibleBridgeInputs & { requiresAllowance: boolean };
  clearingAllowance: Pick<PossibleBridgeInputs, 'asset'>;
  askForAllowance: Pick<
    PossibleBridgeInputs,
    'asset' | 'ethAddress' | 'ethWalletClient' | 'ethPublicClient'
  > & {
    assetAmount: BN;
  };
};

export class BridgeService {
  static async askForAllowance(input: BridgeInputs['askForAllowance']) {
    if (!input.asset) {
      throw new Error('Need to inform asset to be transfered');
    }
    if (!input.ethWalletClient) {
      throw new Error('Need to inform ethWalletClient');
    }
    if (!input.ethPublicClient) {
      throw new Error('Need to inform ethPublicClient');
    }
    const address = getAssetEthCurrentChain(input.asset).address;
    if (!address) {
      throw new Error('Need to inform asset to be transfered');
    }

    await TxEthToFuelService.approveERC20Amount({
      amount: input.assetAmount,
      ethAssetAddress: address as HexAddress,
      ethWalletClient: input.ethWalletClient,
      ethPublicClient: input.ethPublicClient,
    });
  }

  static async requiresAllowance(input: Partial<BridgeInputs['bridge']>) {
    if (isFuelChain(input.fromNetwork)) {
      return false;
    }
    if (!input.asset) {
      throw new Error('Need to inform asset');
    }
    if (!isErc20Address(getAssetEthCurrentChain(input.asset).address)) {
      return false;
    }
    if (!input.ethWalletClient) {
      throw new Error('Need to inform ethWalletClient');
    }
    if (!input.ethPublicClient) {
      return false;
    }
    const ERC20AssetAddress = getAssetEthCurrentChain(input.asset)?.address;

    if (!ERC20AssetAddress || input.assetAmount == null) {
      return false;
    }

    return TxEthToFuelService.ERC20RequiresAllowance({
      amount: input.assetAmount,
      ethAssetAddress: getAssetEthCurrentChain(input.asset)
        .address as HexAddress,
      ethWalletClient: input.ethWalletClient,
      ethPublicClient: input.ethPublicClient,
    });
  }

  static async bridge(input: BridgeInputs['bridge']) {
    const {
      fromNetwork,
      toNetwork,
      assetAmount,
      ethWalletClient,
      ethPublicClient,
      fuelAddress,
      toCustomAddress,
      fuelWallet,
      ethAddress,
      asset,
      fuelProvider,
    } = input;

    if (!fromNetwork || !toNetwork) {
      throw new Error('"Network From" and "Network To" are required');
    }
    if (!assetAmount || assetAmount.eq(0)) {
      throw new Error('Need to inform amount to be transfered');
    }
    if (!asset) {
      throw new Error('Need to inform asset to be transfered');
    }

    if (isEthChain(fromNetwork) && isFuelChain(toNetwork)) {
      const targetAddress = toCustomAddress
        ? Address.fromString(toCustomAddress)
        : input.fuelAddress;
      if (!targetAddress) {
        throw new Error(
          'No recipient address provided for bridging in Fuel side',
        );
      }

      const assetEth = getAssetEthCurrentChain(asset);
      const startedTxEthToFuel = await TxEthToFuelService.start({
        amount: assetAmount.toHex(),
        ethWalletClient,
        fuelAddress: targetAddress,
        ethAssetAddress: assetEth.address,
        ethPublicClient,
      });

      const { txHash, nonce } = startedTxEthToFuel || {};

      if (txHash && nonce != null) {
        if (fuelWallet) {
          store.addTxEthToFuel({
            ethTxId: txHash,
            inputEthTxNonce: nonce,
            fuelProvider,
            ethPublicClient,
            fuelAddress,
          });
          store.openTxEthToFuel({
            txId: txHash,
            messageSentEventNonce: nonce,
          });
          EthTxCache.setTxIsCreated(txHash);
        }
      }

      return;
    }

    if (isFuelChain(fromNetwork) && isEthChain(toNetwork)) {
      const fuelAsset = getAssetFuelCurrentChain(asset);
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
      `Bridging from "${fromNetwork.name}" to "${toNetwork.name}" is not yet supported.`,
    );
  }

  static async fetchTxs(
    input?: BridgeInputs['fetchTxs'],
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

    // generate normalized txs to be used in the bridge list
    const fuelToEthBridgeTxs = fuelToEthTxs.map((tx) => ({
      txHash: tx.id || '',
      fromNetwork: FUEL_CHAIN,
      toNetwork: ETH_CHAIN,
      date: tx.time,
    }));

    // generate normalized txs to be used in the bridge list
    const ethToFuelBridgeTxs = await Promise.all(
      ethDepositLogs.map(async (log) => {
        const blockHash = (log?.blockHash || '0x') as HexAddress;

        const date = await getBlockDate({
          blockHash,
          publicClient: ethPublicClient,
        });

        return {
          txHash: log?.transactionHash || '0x',
          nonce: (log?.args as any)?.nonce,
          fromNetwork: ETH_CHAIN,
          toNetwork: FUEL_CHAIN,
          date,
        };
      }),
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
