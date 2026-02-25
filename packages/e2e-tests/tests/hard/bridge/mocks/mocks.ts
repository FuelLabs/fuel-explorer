// Allow override via environment variables for testnet
export const ETH_MNEMONIC =
  process.env.E2E_ETH_MNEMONIC ||
  'test test test test test test test test test test test junk';
export const ETH_WALLET_PASSWORD =
  process.env.E2E_ETH_PASSWORD || 'Tester@1234';
