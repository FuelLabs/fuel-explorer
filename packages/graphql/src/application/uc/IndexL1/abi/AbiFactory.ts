import type { InterfaceAbi } from 'ethers';
import { contract as fuelChainStateMainnet } from './mainnet/fuelChainStateAbi';
import { contract as fuelERC20GatewayV4Mainnet } from './mainnet/fuelERC20GatewayV4Abi';
import { contract as fuelMessagePortalAbiMainnet } from './mainnet/fuelMessagePortalAbi';
import { contract as fuelStreamXAbiMainnet } from './mainnet/fuelStreamXAbi';
import { contract as rewardsDistributorAbiMainnet } from './mainnet/rewardsDistributorAbi';
import { contract as sequencerProxyAbiMainnet } from './mainnet/sequencerProxyAbi';
import { contract as tokenMainnet } from './mainnet/tokenAbi';
import { contract as fuelChainStateTestnet } from './testnet/fuelChainStateAbi';
import { contract as fuelERC20GatewayV4Testnet } from './testnet/fuelERC20GatewayV4Abi';
import { contract as fuelMessagePortalAbiTestnet } from './testnet/fuelMessagePortalAbi';
import { contract as fuelStreamXAbiTestnet } from './testnet/fuelStreamXAbi';
import { contract as rewardsDistributorAbiTestnet } from './testnet/rewardsDistributorAbi';
import { contract as sequencerProxyAbiTestnet } from './testnet/sequencerProxyAbi';
import { contract as tokenTestnet } from './testnet/tokenAbi';

export default class AbiFactory {
  static create(network: string, contract: string) {
    const ABI: { [network: string]: { [contract: string]: InterfaceAbi } } = {
      mainnet: {
        SequencerProxy: sequencerProxyAbiMainnet.abi,
        FuelStreamX: fuelStreamXAbiMainnet.abi,
        RewardDistribution: rewardsDistributorAbiMainnet.abi,
        FuelMessagePortal: fuelMessagePortalAbiMainnet.abi,
        FuelERC20GatewayV4: fuelERC20GatewayV4Mainnet.abi,
        FuelChainState: fuelChainStateMainnet.abi,
        Token: tokenMainnet.abi,
      },
      testnet: {
        SequencerProxy: sequencerProxyAbiTestnet.abi,
        FuelStreamX: fuelStreamXAbiTestnet.abi,
        RewardDistribution: rewardsDistributorAbiTestnet.abi,
        FuelMessagePortal: fuelMessagePortalAbiTestnet.abi,
        FuelERC20GatewayV4: fuelERC20GatewayV4Testnet.abi,
        FuelChainState: fuelChainStateTestnet.abi,
        Token: tokenTestnet.abi,
      },
    };
    if (!ABI[network]) return;
    return ABI[network][contract];
  }
}
