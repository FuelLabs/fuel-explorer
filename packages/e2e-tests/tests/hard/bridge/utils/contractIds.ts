import type { HexAddress } from 'app-commons';

/**
 * due to error on importing `app-commons` to test environment,
 * we get the contracts id here inntead of from there
 */
export type BridgeTokenContracts = {
  ETH_ERC20?: string;
  FUEL_TokenContract: string;
  FUEL_TokenAsset?: string;
  USDC_ERC20?: string;
  USDC_FUEL_Asset?: string;
};
export type BridgeSolidityContracts = {
  FuelChainState: HexAddress;
  FuelMessagePortal: HexAddress;
  FuelERC20GatewayV4: HexAddress;
  FuelERC721Gateway: HexAddress;
};

const IS_TESTNET = process.env.FUEL_CHAIN_NAME === 'fuelTestnet';

// Testnet contract addresses (from app-commons)
const TESTNET_TOKEN_CONTRACTS: BridgeTokenContracts = {
  FUEL_TokenContract:
    '0xd02112ef9c39f1cea7c8527c26242ca1f5d26bcfe8d1564bee054d3b04175471',
};

const TESTNET_SOLIDITY_CONTRACTS: BridgeSolidityContracts = {
  FuelChainState: '0xf38F1e65adc58fc74BaaA132f645Aa5307F2d304',
  FuelMessagePortal: '0x01855B78C1f8868DE70e84507ec735983bf262dA',
  FuelERC20GatewayV4: '0xd1d5a4379dccC46D5c8D1c6c2656ce705698e359',
  FuelERC721Gateway: '0x',
};

export async function getBridgeTokenContracts() {
  if (IS_TESTNET) {
    return TESTNET_TOKEN_CONTRACTS;
  }

  const res = await fetch('http://localhost:8082/deployments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  const body = await res.json();
  return body as BridgeTokenContracts;
}

export async function getBridgeSolidityContracts() {
  if (IS_TESTNET) {
    return TESTNET_SOLIDITY_CONTRACTS;
  }

  const res = await fetch('http://localhost:8080/deployments.local.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  const body = await res.json();
  return body;
}
