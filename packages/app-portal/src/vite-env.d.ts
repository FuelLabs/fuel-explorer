/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALCHEMY_ID: string;
  readonly VITE_INFURA_ID: string;
  readonly VITE_WALLETCONNECT_ID: string;
  readonly VITE_ETH_FUEL_MESSAGE_PORTAL: string;
  readonly VITE_ETH_FUEL_ERC20_GATEWAY: string;
  readonly VITE_ETH_FUEL_CHAIN_STATE: string;
  readonly VITE_ETH_CHAIN: string;
  readonly VITE_FUEL_CHAIN: string;
  readonly VITE_FUEL_VERSION: string;
  readonly VITE_IS_PUBLIC_PREVIEW: string;
  readonly VITE_WALLET_INSTALL: string;
  readonly VITE_WALLET_INSTALL_NEXT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Add script module importing (ECMAScript)
declare module '*?script&module' {
  const src: string;
  export default src;
}

// Add script  importing (CommonJS)
declare module '*?script' {
  const src: string;
  export default src;
}
