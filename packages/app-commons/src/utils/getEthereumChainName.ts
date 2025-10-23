export function getEthereumChainName(
  environment: string | undefined,
): 'foundry' | 'sepolia' | 'mainnet' {
  switch (environment) {
    case 'fuelMainnet':
      return 'mainnet';

    case 'fuelTestnet':
    case 'fuelDevnet':
      return 'sepolia';

    default:
      return 'foundry';
  }
}
