'use client';

import { Theme, Toaster } from '@fuels/ui';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Theme appearance="dark" hasBackground={false}>
      {children}
      <Toaster />
    </Theme>
  );
}
