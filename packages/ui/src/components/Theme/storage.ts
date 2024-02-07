export const THEME_KEY = 'fuel-ui-theme';

export type ThemesPossible = 'inherit' | 'light' | 'dark';
export const getStorageTheme = (): ThemesPossible => {
  const current = localStorage.getItem(THEME_KEY) || '';
  const isAllowed = ['inherit', 'light', 'dark'].includes(current);
  return (isAllowed && (current as ThemesPossible)) || 'light';
};

export const changeStorageTheme = (v: string) => {
  localStorage.setItem(THEME_KEY, v);
};

export const getNextTheme = (current: string) => {
  return current === 'light' ? 'dark' : 'light';
};
