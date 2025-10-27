import { FUEL_CHAIN } from 'app-commons';

export async function convertAsset(assetId: string, amount: string) {
  try {
    const endpoints: { [network: string]: string } = {
      fuel_testnet: 'https://explorer-indexer-testnet.fuel.network',
      fuel_mainnet: 'https://explorer-indexer-mainnet.fuel.network',
    };
    const endpoint = endpoints[FUEL_CHAIN.network];
    if (!endpoint) return;
    const response = await fetch(`${endpoint}/convert_rate`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        assetId,
        amount,
      }),
    });
    return response.json();
  } catch (_: any) {}
}
