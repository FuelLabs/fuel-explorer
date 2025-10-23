import { Theme, Toaster } from '@fuels/ui';
import { ThemeProvider as SharedThemeProvider, useTheme } from 'app-commons';
import type { ResolvedTheme, ThemeValue } from 'app-commons';
import type React from 'react';

export { useTheme };
export type { ThemeValue, ResolvedTheme };

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <SharedThemeProvider>
      <Theme scaling="100%" hasBackground={false}>
        {children}
      </Theme>
      <Toaster />
    </SharedThemeProvider>
  );
}
