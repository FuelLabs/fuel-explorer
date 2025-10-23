import { toUtf8Bytes, zeroPadValue } from 'ethers';
import { CHAIN_IDS, ZeroBytes32, concat, sha256 } from 'fuels';

import {
  IS_FUEL_DEVNET_CHAIN,
  IS_FUEL_DEV_CHAIN,
  IS_FUEL_MAINNET_CHAIN,
  IS_FUEL_TESTNET_CHAIN,
} from '../config';
import { ETH_CHAIN_NAME } from '../constants/chainName';
import type { HexAddress } from '../types/address';

export type BridgeTokenContracts = {
  ETH_ERC20?: string;
  FUEL_TokenContract: string;
  FUEL_TokenAsset?: string;
  FUEL_TokenContractImplementation?: string;
  USDC_ERC20?: string;
  USDC_FUEL_Asset?: string;
};
export type BridgeSolidityContracts = {
  FuelChainState: HexAddress;
  FuelMessagePortal: HexAddress;
  FuelERC20GatewayV4: HexAddress;
  FuelERC721Gateway: HexAddress;
};

let bridgeTokenContract: BridgeTokenContracts;
let bridgeSolidityContracts: BridgeSolidityContracts;

export async function getBridgeTokenContracts() {
  if (bridgeTokenContract) return bridgeTokenContract;

  if (IS_FUEL_DEV_CHAIN) {
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

  if (IS_FUEL_TESTNET_CHAIN) {
    const FUEL_TokenContract =
      '0xd02112ef9c39f1cea7c8527c26242ca1f5d26bcfe8d1564bee054d3b04175471';
    CHAIN_IDS.eth.mainnet;
    const bridgeTokenContract = {
      ETH_ERC20: undefined,
      FUEL_TokenContract,
      FUEL_TokenAsset: undefined,
      FUEL_TokenContractImplementation: undefined, // it will get in the application if it's not provided from configs.
    };

    return bridgeTokenContract;
  }

  if (IS_FUEL_DEVNET_CHAIN) {
    const ETH_ERC20 = '0xC6387efAD0F184a90B34f397C3d6Fd63135ef790';
    const FUEL_TokenContract =
      '0x12f300d6d2b286dd5d290b709e0d3d73acc23c87ec10d349d4386b9524d740a1';
    const FUEL_TokenAsset = getContractTokenId(FUEL_TokenContract, ETH_ERC20);
    const bridgeTokenContract = {
      ETH_ERC20,
      FUEL_TokenContract,
      FUEL_TokenAsset,
      FUEL_TokenContractImplementation: undefined, // it will get in the application if it's not provided from configs.
    };

    return bridgeTokenContract;
  }

  if (IS_FUEL_MAINNET_CHAIN) {
    const FUEL_TokenContract =
      '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8';
    const bridgeTokenContract = {
      ETH_ERC20: undefined,
      FUEL_TokenContract,
      FUEL_TokenAsset: undefined,
      FUEL_TokenContractImplementation: undefined, // it will get in the application if it's not provided from configs.
    };
    return bridgeTokenContract;
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

  if (IS_FUEL_TESTNET_CHAIN) {
    bridgeSolidityContracts = {
      FuelChainState: '0xf38F1e65adc58fc74BaaA132f645Aa5307F2d304',
      FuelMessagePortal: '0x01855B78C1f8868DE70e84507ec735983bf262dA',
      FuelERC20GatewayV4: '0xd1d5a4379dccC46D5c8D1c6c2656ce705698e359',
      FuelERC721Gateway: '0x',
    };

    return bridgeSolidityContracts;
  }

  if (IS_FUEL_DEVNET_CHAIN) {
    bridgeSolidityContracts = {
      FuelChainState: '0x2e87c41C9B3d932b6DA3C805baEfB7bbe863fCc6',
      FuelMessagePortal: '0x768f9459E3339A1F7d59CcF24C80Eb4A711a01FB',
      FuelERC20GatewayV4: '0x8B96Ed4aA36041B91a8510A1c644fC72177B5eA0',
      FuelERC721Gateway: '0x',
    };

    return bridgeSolidityContracts;
  }

  if (IS_FUEL_MAINNET_CHAIN) {
    bridgeSolidityContracts = {
      FuelChainState: '0xf3D20Db1D16A4D0ad2f280A5e594FF3c7790f130',
      FuelMessagePortal: '0xAEB0c00D0125A8a788956ade4f4F12Ead9f65DDf',
      FuelERC20GatewayV4: '0xa4cA04d02bfdC3A2DF56B9b6994520E69dF43F67',
      FuelERC721Gateway: '0x',
    };

    return bridgeSolidityContracts;
  }

  return bridgeSolidityContracts;
}

export function getContractTokenId(
  contractId: HexAddress,
  erc20Address: HexAddress,
  tokenId = ZeroBytes32,
  chainId = 1,
) {
  const subId = sha256(
    concat([
      toUtf8Bytes(chainId.toString()),
      zeroPadValue(erc20Address, 32),
      tokenId,
    ]),
  );
  const assetId = sha256(concat([contractId, subId]));

  return assetId;
}
