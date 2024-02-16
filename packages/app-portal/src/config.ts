export const {
  // VITE_ALCHEMY_ID,
  // VITE_INFURA_ID,
  // VITE_WALLETCONNECT_ID,
  // VITE_ETH_FUEL_MESSAGE_PORTAL,
  // VITE_ETH_CHAIN,
  // VITE_FUEL_CHAIN,
  // VITE_FUEL_VERSION,
  NODE_ENV,
  // VITE_ETH_FUEL_ERC20_GATEWAY,
  // VITE_ETH_FUEL_CHAIN_STATE,
  // VITE_ETH_ERC20,
  // VITE_FUEL_FUNGIBLE_CONTRACT_ID,
  VITE_FUEL_FUNGIBLE_ASSET_ID,
  // VITE_WALLET_INSTALL,
  // VITE_WALLET_INSTALL_NEXT,
  // VITE_BLOCK_EXPLORER_URL,
} = process.env;

export const IS_PREVIEW = process.env.VITE_IS_PUBLIC_PREVIEW === 'true';
export const IS_DEVELOPMENT = process.env.DEV;
export const IS_TEST = process.env.MODE === 'test';

export const VITE_ALCHEMY_ID = 'FUKosUPyAX_KXsNZN3mm9vvUhkpTaAMx';
export const VITE_INFURA_ID = '11adea0de568422b90f56edfe10e6f37';
export const VITE_WALLETCONNECT_ID = 'f3caf533b1ed4c989d73a25a7055a147';
export const VITE_ETH_CHAIN = 'sepolia';
export const VITE_FUEL_CHAIN = 'fuelBeta5';
export const VITE_FUEL_VERSION = '0.22.0';
export const VITE_IS_PUBLIC_PREVIEW = 'true';
export const VITE_WALLET_INSTALL =
  'https://chrome.google.com/webstore/detail/fuel-wallet/dldjpboieedgcmpkchcjcbijingjcgok';
export const VITE_WALLET_INSTALL_NEXT =
  'https://next-wallet.fuel.network/docs/install/#install-from-source-code';
export const VITE_BLOCK_EXPLORER_URL = 'https://app.fuel.network/';
export const VITE_ETH_FUEL_MESSAGE_PORTAL =
  '0x557c5cE22F877d975C2cB13D0a961a182d740fD5';
export const VITE_ETH_FUEL_ERC20_GATEWAY =
  '0xE52af7c9A2F6b243CEE9F0C423E06BAb6E5c6E3b';
export const VITE_ETH_FUEL_CHAIN_STATE =
  '0x395B125343ADebCcB05dd70e117774E3AB08a8a7';
export const VITE_FUEL_FUNGIBLE_CONTRACT_ID =
  '0x84233a3696f4ca759e7f07348f33efa98e1dc1fe65bc1cc5ea693a1368b0f9e9';
export const VITE_ETH_ERC20 = '0xC6387efAD0F184a90B34f397C3d6Fd63135ef790';
