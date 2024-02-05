'use client';

import { createContext, useContext } from 'react';

import type { Colors } from '../../utils/types';
import type { IconProps } from '../Icon/Icon';

export type ListContext = {
  icon?: IconProps['icon'];
  iconColor?: Colors;
  iconSize?: number;
  iconAriaLabel?: string;
};

const ctx = createContext<ListContext>({} as ListContext);

export function useListContext() {
  return useContext(ctx);
}

export const ListProvider = ctx.Provider;
