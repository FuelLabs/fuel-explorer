import { zeroPadValue } from 'ethers';
import { ZeroBytes32, concat, sha256 } from 'fuels';

import { ETH_CHAIN_NAME, FUEL_CHAIN_NAME } from '../config';

export type BridgeTokenContracts = {
  ETH_ERC20: string;
  FUEL_TokenContract: string;
  FUEL_TokenAsset: string;
  FUEL_TokenContractImplementation: string;
};
export type BridgeSolidityContracts = {
  FuelChainState: `0x${string}`;
  FuelMessagePortal: `0x${string}`;
  FuelERC20Gateway: `0x${string}`;
  FuelERC721Gateway: `0x${string}`;
};

let bridgeTokenContract: BridgeTokenContracts;
let bridgeSolidityContracts: BridgeSolidityContracts;

export async function getBridgeTokenContracts() {
  if (bridgeTokenContract) return bridgeTokenContract;

  if (FUEL_CHAIN_NAME === 'fuelLocal') {
    try {
      const res = await fetch('http://localhost:8082/deployments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const body = await res.json();
      bridgeTokenContract = body;

      return bridgeTokenContract;
    } catch (_) {
      return undefined;
    }
  }

  if (ETH_CHAIN_NAME === 'sepolia') {
    const ETH_ERC20 = '0xC6387efAD0F184a90B34f397C3d6Fd63135ef790';
    if (FUEL_CHAIN_NAME === 'fuelTestnet') {
      const FUEL_TokenContract =
        '0xf7e9720adf816640b4e0b91ab192d3d2e549cf978ab2318d45862f0cbc2e9f80';
      const FUEL_TokenAsset = getContractTokenId(FUEL_TokenContract, ETH_ERC20);
      const bridgeTokenContract = {
        ETH_ERC20,
        FUEL_TokenContract,
        FUEL_TokenAsset,
        FUEL_TokenContractImplementation: '0x', // @TODO: include correct implementation ID from testnet
      };

      return bridgeTokenContract;
    }
  }
}

export async function getBridgeSolidityContracts() {
  if (ETH_CHAIN_NAME === 'foundry') {
    const res = await fetch('http://localhost:8080/deployments.local.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const body = await res.json();
    bridgeSolidityContracts = body;

    return bridgeSolidityContracts;
  }

  if (ETH_CHAIN_NAME === 'sepolia') {
    if (FUEL_CHAIN_NAME === 'fuelTestnet') {
      bridgeSolidityContracts = {
        FuelChainState: '0xf38F1e65adc58fc74BaaA132f645Aa5307F2d304',
        FuelMessagePortal: '0x01855B78C1f8868DE70e84507ec735983bf262dA',
        FuelERC20Gateway: '0xa97200022c7aDb1b15f0f61f374E3A0c90e2Efa0',
        FuelERC721Gateway: '0x',
      };

      return bridgeSolidityContracts;
    }
  }

  return bridgeSolidityContracts;
}

export function getContractTokenId(
  contractId: `0x${string}`,
  erc20Address: `0x${string}`,
  tokenId = ZeroBytes32,
) {
  const subId = sha256(concat([zeroPadValue(erc20Address, 32), tokenId]));
  const assetId = sha256(concat([contractId, subId]));

  return assetId;
}
