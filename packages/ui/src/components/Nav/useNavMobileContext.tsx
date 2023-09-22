'use client';

import { createContext, useContext } from 'react';

type ContextProps = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const ctx = createContext<ContextProps>({} as ContextProps);
export function useNavMobileContext() {
  return useContext(ctx);
}

export const NavMobileProvider = ctx.Provider;
