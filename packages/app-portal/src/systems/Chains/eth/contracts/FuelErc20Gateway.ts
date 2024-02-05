import FuelERC20Gateway from '@fuel-bridge/solidity-contracts/artifacts/contracts/messaging/gateway/FuelERC20Gateway.sol/FuelERC20Gateway.json';

export type FuelERC20GatewayArgs = {
  Deposit: {
    amount: bigint;
    sender: `0x${string}`;
    tokenAddress: `0x${string}`;
    fuelContractId: `0x${string}`;
  };
};

export const FUEL_ERC_20_GATEWAY = {
  abi: FuelERC20Gateway.abi,
};
