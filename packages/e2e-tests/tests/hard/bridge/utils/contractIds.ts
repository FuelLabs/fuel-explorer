import type { HexAddress } from 'app-commons';

/**
 * due to error on importing `app-commons` to test environment,
 * we get the contracts id here inntead of from there
 */
export type BridgeTokenContracts = {
  ETH_ERC20: string;
  FUEL_TokenContract: string;
  FUEL_TokenAsset?: string;
};
export type BridgeSolidityContracts = {
  FuelChainState: HexAddress;
  FuelMessagePortal: HexAddress;
  FuelERC20GatewayV4: HexAddress;
  FuelERC721Gateway: HexAddress;
};

export async function getBridgeTokenContracts() {
  const res = await fetch('http://localhost:8082/deployments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  const body = await res.json();
  return body;
}

export async function getBridgeSolidityContracts() {
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
