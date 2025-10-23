import customContract from '@fuel-bridge/solidity-contracts/artifacts/contracts/test/CustomToken.sol/CustomToken.json';
import contract from '@fuel-bridge/solidity-contracts/artifacts/contracts/test/Token.sol/Token.json';

export const ERC_20 = {
  abi: contract.abi,
};

export const CUSTOM_CONTRACT = {
  abi: customContract.abi,
};
