// Next.js parse the process.env.XYZ to the browser. using vars won't work (ex: process.env[var])
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
export const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID;
export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
export const WALLETCONNECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;
export const USE_CAPSULE_KEY = process.env.NEXT_PUBLIC_USE_CAPSULE_KEY;
export const ETH_CHAIN_NAME = process.env.NEXT_PUBLIC_ETH_CHAIN_NAME;
export const FUEL_CHAIN_NAME = process.env.NEXT_PUBLIC_FUEL_CHAIN_NAME;
export const FUEL_VERSION = process.env.NEXT_PUBLIC_FUEL_VERSION;
export const WALLET_INSTALL = process.env.NEXT_PUBLIC_WALLET_INSTALL;
export const WALLET_INSTALL_NEXT = process.env.NEXT_PUBLIC_WALLET_INSTALL_NEXT;
export const NODE_ENV = process.env.NODE_ENV;

export const IS_PREVIEW = process.env.NEXT_PUBLIC_IS_PUBLIC_PREVIEW === 'true';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const ethChainName = ETH_CHAIN_NAME?.toLowerCase();
export const IS_ETH_DEV_CHAIN = ethChainName && ethChainName === 'foundry';

const fuelChainName = FUEL_CHAIN_NAME?.toLowerCase();
export const IS_FUEL_DEV_CHAIN = fuelChainName && fuelChainName === 'fuelLocal';
