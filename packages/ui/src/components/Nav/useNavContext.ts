'use client';

import { createContext, useContext } from 'react';

import type { NavProps } from './Nav';

type ContextProps = NavProps;

const ctx = createContext<ContextProps>({} as ContextProps);
export function useNavContext() {
  return useContext(ctx);
}

export const NavProvider = ctx.Provider;
