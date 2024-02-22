import type { PublicClient, WalletClient } from 'viem';
import { getContract } from 'viem';

import {
  ETH_FUEL_CHAIN_STATE,
  ETH_FUEL_ERC20_GATEWAY,
  ETH_FUEL_MESSAGE_PORTAL,
} from 'app-commons';
import { ERC_20 } from '../contracts/Erc20';
import { FUEL_CHAIN_STATE } from '../contracts/FuelChainState';
import { FUEL_ERC_20_GATEWAY } from '../contracts/FuelErc20Gateway';
import { FUEL_MESSAGE_PORTAL } from '../contracts/FuelMessagePortal';

export class EthConnectorService {
  static connectToFuelErc20Gateway(options: {
    walletClient?: WalletClient;
    publicClient?: PublicClient;
  }) {
    const { walletClient, publicClient } = options;

    const contract = getContract({
      abi: FUEL_ERC_20_GATEWAY.abi,
      address: ETH_FUEL_ERC20_GATEWAY as `0x${string}`,
      walletClient,
      publicClient,
    });

    return contract;
  }

  static connectToFuelMessagePortal(options: {
    walletClient?: WalletClient;
    publicClient?: PublicClient;
  }) {
    const { walletClient, publicClient } = options;

    const contract = getContract({
      abi: FUEL_MESSAGE_PORTAL.abi,
      address: ETH_FUEL_MESSAGE_PORTAL as `0x${string}`,
      walletClient,
      publicClient,
    });

    return contract;
  }

  static connectToErc20(options: {
    walletClient?: WalletClient;
    publicClient?: PublicClient;
    address: `0x${string}`;
  }) {
    const { walletClient, publicClient, address } = options;

    const contract = getContract({
      abi: ERC_20.abi,
      address,
      walletClient,
      publicClient,
    });

    return contract;
  }

  static connectToFuelChainState(options: {
    walletClient?: WalletClient;
    publicClient?: PublicClient;
  }) {
    const { walletClient, publicClient } = options;

    const contract = getContract({
      abi: FUEL_CHAIN_STATE.abi,
      address: ETH_FUEL_CHAIN_STATE as `0x${string}`,
      walletClient,
      publicClient,
    });

    return contract;
  }
}
