'use client';

import { Theme } from '@fuel-explorer/ui/Theme';
import { Toaster } from '@fuel-explorer/ui/Toast';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Theme appearance="dark" hasBackground={false}>
      {children}
      <Toaster />
    </Theme>
  );
}
