import FuelERC20Gateway from '@fuel-bridge/solidity-contracts/artifacts/contracts/messaging/gateway/FuelERC20Gateway/FuelERC20GatewayV4.sol/FuelERC20GatewayV4.json';
import type { HexAddress } from 'app-commons';

export type FuelERC20GatewayArgs = {
  Deposit: {
    amount: bigint;
    sender: HexAddress;
    tokenAddress: HexAddress;
  };
};

export const FUEL_ERC_20_GATEWAY = {
  abi: FuelERC20Gateway.abi,
};
