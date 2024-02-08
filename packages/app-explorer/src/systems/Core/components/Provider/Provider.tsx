'use client';

import { Theme, Toaster } from '@fuels/ui';
import { ThemeProvider } from 'next-themes';

export function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class">
      <Theme hasBackground={false}>
        {children}
        <Toaster />
      </Theme>
    </ThemeProvider>
  );
}
