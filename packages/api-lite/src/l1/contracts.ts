export type L1Contract = {
  contractHash: string;
  blockHeight: number;
  name: string;
  network: 'mainnet' | 'testnet';
};

export const L1_CONTRACTS: L1Contract[] = [
  {
    contractHash: '0xBa0e6bF94580D49B5Aaaa54279198D424B23eCC3',
    blockHeight: 21220898,
    name: 'SequencerProxy',
    network: 'mainnet',
  },
  {
    contractHash: '0x481aeEB9bdFe08f050d22F0b352356691c4B0b59',
    blockHeight: 21220911,
    name: 'FuelStreamX',
    network: 'mainnet',
  },
  {
    contractHash: '0xC20c2EA5fC5f26200f3339512f336c2ecE41FC18',
    blockHeight: 21414415,
    name: 'RewardDistribution',
    network: 'mainnet',
  },
  {
    contractHash: '0xAEB0c00D0125A8a788956ade4f4F12Ead9f65DDf',
    blockHeight: 21039400,
    name: 'FuelMessagePortal',
    network: 'mainnet',
  },
  {
    contractHash: '0xa4cA04d02bfdC3A2DF56B9b6994520E69dF43F67',
    blockHeight: 20678194,
    name: 'FuelERC20GatewayV4',
    network: 'mainnet',
  },
  {
    contractHash: '0xf3D20Db1D16A4D0ad2f280A5e594FF3c7790f130',
    blockHeight: 20620432,
    name: 'FuelChainState',
    network: 'mainnet',
  },
  {
    contractHash: '0x675B68AA4d9c2d3BB3F0397048e62E6B7192079c',
    blockHeight: 21213754,
    name: 'Token',
    network: 'mainnet',
  },
  {
    contractHash: '0x0E5CAcD6899a1E2a4B4E6e0c8a1eA7feAD3E25eD',
    blockHeight: 7203292,
    name: 'SequencerProxy',
    network: 'testnet',
  },
  {
    contractHash: '0x130F143e0F6d87371ca510e11340C2F3cD407a2b',
    blockHeight: 7203302,
    name: 'FuelStreamX',
    network: 'testnet',
  },
  {
    contractHash: '0x7c8deB33b992629130CE160f766881A191d874ce',
    blockHeight: 7334044,
    name: 'RewardDistribution',
    network: 'testnet',
  },
  {
    contractHash: '0x01855B78C1f8868DE70e84507ec735983bf262dA',
    blockHeight: 6339191,
    name: 'FuelMessagePortal',
    network: 'testnet',
  },
  {
    contractHash: '0xd1d5a4379dccC46D5c8D1c6c2656ce705698e359',
    blockHeight: 6626184,
    name: 'FuelERC20GatewayV4',
    network: 'testnet',
  },
  {
    contractHash: '0xf38F1e65adc58fc74BaaA132f645Aa5307F2d304',
    blockHeight: 6505507,
    name: 'FuelChainState',
    network: 'testnet',
  },
  {
    contractHash: '0xd7Fc4e8FB2c05567C313f4C9b9e07641a361a550',
    blockHeight: 7203281,
    name: 'Token',
    network: 'testnet',
  },
];
