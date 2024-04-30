export type BridgeSolidityContracts = {
  FuelChainState: `0x${string}`;
  FuelMessagePortal: `0x${string}`;
  FuelERC20Gateway: `0x${string}`;
  FuelERC721Gateway: `0x${string}`;
};

let bridgeSolidityContracts: BridgeSolidityContracts;

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
