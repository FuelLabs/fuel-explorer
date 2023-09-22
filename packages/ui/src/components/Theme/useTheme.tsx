'use client';

import { updateThemeAppearanceClass, useThemeContext } from '@radix-ui/themes';

const THEME_KEY = 'fuel-ui-theme';

export function useTheme() {
  const { appearance: theme } = useThemeContext();

  function toggleTheme() {
    const current = localStorage.getItem(THEME_KEY);
    const next = current === 'light' ? 'dark' : 'light';
    updateThemeAppearanceClass(next);
    localStorage.setItem(THEME_KEY, next);
  }

  return { theme, toggleTheme };
}
