//! 'use client';

import type { ComponentType } from 'react';
import { createContext, useContext } from 'react';

import type { Colors } from '../../utils/types';

export type IconContext = {
  stroke?: number;
  size?: number;
  color?: Colors;
};

export type IconComponent = ComponentType<
  Partial<IconContext> & { className?: string }
>;

const context = createContext<IconContext>({
  size: 18,
  stroke: 1.2,
} as IconContext);

export function useIconContext() {
  return useContext(context);
}

export const IconProvider = context.Provider;
