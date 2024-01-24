import type { ReactNode } from 'react';

import type { SupportedChain } from '../Chains';

export type BridgeTx = {
  asset: {
    assetAmount: string;
    assetImageSrc: ReactNode | string;
    assetSymbol: string;
  };
  date?: Date;
  txHash: string;
  fromNetwork: SupportedChain;
  toNetwork: SupportedChain;
  isDone: boolean;
};

export type BridgeAsset = {
  address?: string;
  decimals?: number;
  symbol?: string;
  image?: string;
};
