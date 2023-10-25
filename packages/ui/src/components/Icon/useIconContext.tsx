'use client';

import type { ComponentType } from 'react';
import { createContext, useContext } from 'react';

import type { Colors } from '../../utils/types';

import { INIT_ICON_SIZE, INIT_ICON_STROKE } from './constants';

export type IconContext = {
  stroke?: number;
  size?: number;
  color?: Colors;
};

export type IconComponent = ComponentType<
  Partial<IconContext> & { className?: string }
>;

const context = createContext<IconContext>({
  size: INIT_ICON_SIZE,
  stroke: INIT_ICON_STROKE,
} as IconContext);

export function useIconContext() {
  return useContext(context);
}

export const IconProvider = context.Provider;
