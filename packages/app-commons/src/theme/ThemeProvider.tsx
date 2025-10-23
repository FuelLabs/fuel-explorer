import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type ThemeValue = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: ThemeValue;
  setTheme: (theme: ThemeValue | string) => void;
  resolvedTheme: ResolvedTheme;
}>({
  theme: 'system',
  setTheme: () => {},
  resolvedTheme: 'light',
});

export const useTheme = () => useContext(ThemeContext);

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const resolveTheme = (theme: ThemeValue): ResolvedTheme => {
  if (theme === 'system') return getSystemTheme();
  return theme;
};

const ThemeDefault = ({
  theme,
  setTheme,
}: { theme: ThemeValue; setTheme: (theme: ThemeValue) => void }) => {
  useEffect(() => {
    if (theme === 'system') {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  return null;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeValue>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('fuel-ui-theme') as ThemeValue) || 'system';
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(theme),
  );

  const setTheme = (newTheme: ThemeValue | string) => {
    const themeValue = newTheme as ThemeValue;
    setThemeState(themeValue);
    localStorage.setItem('fuel-ui-theme', themeValue);
  };

  useEffect(() => {
    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const newResolved = getSystemTheme();
        setResolvedTheme(newResolved);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'fuel-ui-theme' && e.newValue) {
        setThemeState(e.newValue as ThemeValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      <ThemeDefault theme={theme} setTheme={setTheme} />
      {children}
    </ThemeContext.Provider>
  );
}
