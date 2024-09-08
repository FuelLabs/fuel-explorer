'use client';

import { Theme, Toaster } from '@fuels/ui';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeDefault } from './ThemeDefault';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" storageKey="fuel-ui-theme">
      <ThemeDefault />
      <Theme hasBackground={false}>{children}</Theme>
      <Toaster />
    </NextThemeProvider>
  );
}
