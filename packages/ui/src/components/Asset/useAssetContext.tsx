'use client';

import { createContext, useContext } from 'react';

import type { AssetProps } from './Asset';

type ContextProps = AssetProps & {
  amountStr: string;
  isNegative: boolean;
};

const ctx = createContext<ContextProps>({} as ContextProps);
export function useAssetContext() {
  return useContext(ctx);
}

export const AssetProvider = ctx.Provider;
