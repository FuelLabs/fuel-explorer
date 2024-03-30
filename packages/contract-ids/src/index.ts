/**
 * @TODO: This package can be moved to "graphql-new" once the new graphql sdk is ready
 * Currently I moved to this place because "graphql-new" is running on a Node.JS environment
 * and "app-commons" currently has some browser packages
 */

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

export async function getBridgeTokenContracts(
  ethChainName: string,
  fuelChainName: string,
) {
  if (bridgeTokenContract) return bridgeTokenContract;

  if (fuelChainName === 'fuelDev') {
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

  if (ethChainName === 'sepolia') {
    const ETH_ERC20 = '0xC6387efAD0F184a90B34f397C3d6Fd63135ef790';
    if (fuelChainName === 'fuelBeta5Dev') {
      bridgeTokenContract = {
        ETH_ERC20,
        FUEL_TokenContract:
          '0x7d3e3721d96108b71e187aa17c3330ac400637a2649490f4b3d964cbf1b8943e',
      };

      return bridgeTokenContract;
    }

    if (fuelChainName === 'fuelBeta5') {
      bridgeTokenContract = {
        ETH_ERC20,
        FUEL_TokenContract:
          '0x84233a3696f4ca759e7f07348f33efa98e1dc1fe65bc1cc5ea693a1368b0f9e9',
      };

      return bridgeTokenContract;
    }
  }
}

export async function getBridgeSolidityContracts(
  ethChainName: string,
  fuelChainName: string,
) {
  if (ethChainName === 'foundry') {
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

  if (ethChainName === 'sepolia') {
    if (fuelChainName === 'fuelBeta5Dev') {
      bridgeSolidityContracts = {
        FuelChainState: '0xb65850FB7eA866f8730Ce713657ed965407F6472',
        FuelMessagePortal: '0xBf340BAC79c301B264E2a5dEa51b7F61eb3e666A',
        FuelERC20Gateway: '0x749E27d070E2F4a3D6CED522a0D4BDCB37fA95ba',
        FuelERC721Gateway: '0x4aC11e55652b4e13Fc8dB6F42bB26793605d03B8',
      };

      return bridgeSolidityContracts;
    }

    if (fuelChainName === 'fuelBeta5') {
      bridgeSolidityContracts = {
        FuelChainState: '0x395B125343ADebCcB05dd70e117774E3AB08a8a7',
        FuelMessagePortal: '0x557c5cE22F877d975C2cB13D0a961a182d740fD5',
        FuelERC20Gateway: '0xE52af7c9A2F6b243CEE9F0C423E06BAb6E5c6E3b',
        FuelERC721Gateway: '0xc094fC648101920B1C37C733AF022942eF4042D3',
      };

      return bridgeSolidityContracts;
    }
  }

  return bridgeSolidityContracts;
}
