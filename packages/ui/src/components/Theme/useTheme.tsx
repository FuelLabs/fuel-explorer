'use client';

import { updateThemeAppearanceClass, useThemeContext } from '@radix-ui/themes';

import { changeStorageTheme, getNextTheme, getStorageTheme } from './storage';

export function useTheme() {
  const { appearance: theme } = useThemeContext();

  function toggleTheme() {
    const current = getStorageTheme();
    const next = getNextTheme(current);
    updateThemeAppearanceClass(next);
    changeStorageTheme(next);
  }

  return { theme, toggleTheme };
}
