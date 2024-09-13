import type { GetContractReturnType, PublicClient, WalletClient } from 'viem';
import { getContract } from 'viem';

import type { BridgeSolidityContracts, HexAddress } from 'app-commons';
import { ERC_20 } from '../contracts/Erc20';
import { FUEL_CHAIN_STATE } from '../contracts/FuelChainState';
import { FUEL_ERC_20_GATEWAY } from '../contracts/FuelErc20Gateway';
import { FUEL_MESSAGE_PORTAL } from '../contracts/FuelMessagePortal';

export class EthConnectorService {
  static connectToFuelErc20Gateway(options: {
    walletClient?: WalletClient;
    publicClient?: PublicClient;
    bridgeSolidityContracts: BridgeSolidityContracts;
  }) {
    const { walletClient, publicClient, bridgeSolidityContracts } = options;

    const contract = getContract({
      abi: FUEL_ERC_20_GATEWAY.abi,
      address: bridgeSolidityContracts.FuelERC20GatewayV4,
      client: {
        public: publicClient!,
        wallet: walletClient,
      },
    }) as GetContractReturnType<typeof FUEL_ERC_20_GATEWAY.abi, PublicClient>;

    return contract;
  }

  static connectToFuelMessagePortal(options: {
    walletClient?: WalletClient;
    publicClient?: PublicClient;
    bridgeSolidityContracts: BridgeSolidityContracts;
  }) {
    const { walletClient, publicClient, bridgeSolidityContracts } = options;

    const contract = getContract({
      abi: FUEL_MESSAGE_PORTAL.abi,
      address: bridgeSolidityContracts.FuelMessagePortal,
      client: {
        public: publicClient!,
        wallet: walletClient,
      },
    }) as GetContractReturnType<typeof FUEL_MESSAGE_PORTAL.abi, PublicClient>;

    return contract;
  }

  static connectToErc20(options: {
    walletClient?: WalletClient;
    publicClient?: PublicClient;
    address: HexAddress;
  }) {
    const { walletClient, publicClient, address } = options;

    const contract = getContract({
      abi: ERC_20.abi,
      address,
      client: {
        public: publicClient!,
        wallet: walletClient,
      },
    }) as GetContractReturnType<typeof ERC_20.abi, PublicClient>;

    return contract;
  }

  static connectToFuelChainState(options: {
    walletClient?: WalletClient;
    publicClient?: PublicClient;
    bridgeSolidityContracts: BridgeSolidityContracts;
  }) {
    const { walletClient, publicClient, bridgeSolidityContracts } = options;

    const contract = getContract({
      abi: FUEL_CHAIN_STATE.abi,
      address: bridgeSolidityContracts.FuelChainState,
      client: {
        public: publicClient!,
        wallet: walletClient,
      },
    }) as GetContractReturnType<typeof FUEL_CHAIN_STATE.abi, PublicClient>;

    return contract;
  }
}
