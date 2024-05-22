import { ETH_CHAIN_NAME, FUEL_CHAIN_NAME } from '../config';

export type BridgeTokenContracts = {
  ETH_ERC20: string;
  FUEL_TokenContract: string;
  FUEL_TokenAsset?: string;
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
    // On the ci I was encountering issues
    // with the erc20-deployer server not
    // completely started before the e2e tests began
    // we need to add retries again?
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
  }

  if (ETH_CHAIN_NAME === 'sepolia') {
    const ETH_ERC20 = '0xC6387efAD0F184a90B34f397C3d6Fd63135ef790';
    if (FUEL_CHAIN_NAME === 'fuelTestnet') {
      // @TODO: needs to change this to enable ERC20
      bridgeTokenContract = {
        ETH_ERC20,
        FUEL_TokenContract: '0x',
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
    bridgeSolidityContracts =
      FUEL_CHAIN_NAME !== 'fuelTestnet'
        ? {
            FuelChainState: '0xb65850FB7eA866f8730Ce713657ed965407F6472',
            FuelMessagePortal: '0xBf340BAC79c301B264E2a5dEa51b7F61eb3e666A',
            FuelERC20Gateway: '0x749E27d070E2F4a3D6CED522a0D4BDCB37fA95ba',
            FuelERC721Gateway: '0x4aC11e55652b4e13Fc8dB6F42bB26793605d03B8',
          }
        : {
            FuelChainState: '0x395B125343ADebCcB05dd70e117774E3AB08a8a7',
            FuelMessagePortal: '0x557c5cE22F877d975C2cB13D0a961a182d740fD5',
            FuelERC20Gateway: '0xE52af7c9A2F6b243CEE9F0C423E06BAb6E5c6E3b',
            FuelERC721Gateway: '0xc094fC648101920B1C37C733AF022942eF4042D3',
          };

    return bridgeSolidityContracts;
  }

  return bridgeSolidityContracts;
}
