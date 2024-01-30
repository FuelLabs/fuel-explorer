'use client';

import { updateThemeAppearanceClass } from '@radix-ui/themes';

const THEME_KEY = 'fuel-ui-theme';

export function useTheme() {
  function toggleTheme() {
    const current = localStorage.getItem(THEME_KEY);
    const next = current === 'light' ? 'dark' : 'light';
    updateThemeAppearanceClass(next);
    localStorage.setItem(THEME_KEY, next);
  }

  return { theme: localStorage.getItem(THEME_KEY) || 'dark', toggleTheme };
}
