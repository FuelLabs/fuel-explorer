'use client';

import { useTheme as useNextThemes } from 'next-themes';

const THEME_KEY = 'fuel-ui-theme';

export function useTheme() {
  const { theme, setTheme } = useNextThemes();

  function toggleTheme() {
    const current = localStorage.getItem(THEME_KEY);
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }

  return { theme, toggleTheme };
}
