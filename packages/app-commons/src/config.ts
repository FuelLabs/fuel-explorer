// Needs to be like this because of how Next.js builds env variables to the browser
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
export const NEXT_PUBLIC_ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID;
export const NEXT_PUBLIC_INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
export const NEXT_PUBLIC_WALLETCONNECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_ID;
export const NEXT_PUBLIC_ETH_CHAIN_NAME =
  process.env.NEXT_PUBLIC_ETH_CHAIN_NAME;
export const NEXT_PUBLIC_FUEL_CHAIN_NAME =
  process.env.NEXT_PUBLIC_FUEL_CHAIN_NAME;
export const NEXT_PUBLIC_FUEL_VERSION = process.env.NEXT_PUBLIC_FUEL_VERSION;
export const NEXT_PUBLIC_WALLET_INSTALL =
  process.env.NEXT_PUBLIC_WALLET_INSTALL;
export const NEXT_PUBLIC_WALLET_INSTALL_NEXT =
  process.env.NEXT_PUBLIC_WALLET_INSTALL_NEXT;
export const NODE_ENV = process.env.NODE_ENV;

export const {
  ETH_FUEL_MESSAGE_PORTAL,
  ETH_FUEL_ERC20_GATEWAY,
  ETH_FUEL_CHAIN_STATE,
  ETH_ERC20,
  FUEL_FUNGIBLE_CONTRACT_ID,
  FUEL_FUNGIBLE_ASSET_ID,
  BLOCK_EXPLORER_URL,
} = process.env;

export const IS_PREVIEW = process.env.NEXT_PUBLIC_IS_PUBLIC_PREVIEW === 'true';
export const IS_DEVELOPMENT = process.env.DEV;
export const IS_TEST = process.env.MODE === 'test';
