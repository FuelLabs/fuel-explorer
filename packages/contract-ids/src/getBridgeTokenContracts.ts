export type BridgeTokenContracts = {
  ETH_ERC20: string;
  FUEL_TokenContract: string;
  FUEL_TokenAsset?: string;
};

let bridgeTokenContract: BridgeTokenContracts;

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
