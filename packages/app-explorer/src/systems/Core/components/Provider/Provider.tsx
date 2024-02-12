'use client';

import { Toaster } from '@fuels/ui';
import { ThemeProvider } from '../Theme';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
