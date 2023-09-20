'use client';

import { Theme } from '@fuel-explorer/ui/Theme';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Theme appearance="dark" hasBackground={false}>
      {children}
    </Theme>
  );
}
