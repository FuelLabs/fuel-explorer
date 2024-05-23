import FuelERC20Gateway from '@fuel-bridge/solidity-contracts/artifacts/contracts/messaging/gateway/FuelERC20Gateway/FuelERC20GatewayV4.sol/FuelERC20GatewayV4.json';

export type FuelERC20GatewayArgs = {
  Deposit: {
    amount: bigint;
    sender: `0x${string}`;
    tokenAddress: `0x${string}`;
  };
};

export const FUEL_ERC_20_GATEWAY = {
  abi: FuelERC20Gateway.abi,
};
