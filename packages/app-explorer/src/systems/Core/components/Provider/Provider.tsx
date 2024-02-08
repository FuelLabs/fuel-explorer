'use client';

import { Theme, Toaster } from '@fuels/ui';
import { useEffect, useState } from 'react';

export function Provider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    setTheme(localStorage.getItem('fuel-ui-theme') ?? 'dark');
  }, []);
  console.log('theme2', theme);
  return (
    <Theme appearance={theme as any} hasBackground={false}>
      {children}
      <Toaster />
    </Theme>
  );
}
