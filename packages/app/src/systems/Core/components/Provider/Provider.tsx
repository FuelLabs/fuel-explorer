'use client';

import { Theme } from 'pn-ui-primitives';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Theme appearance="dark" hasBackground={false}>
      {children}
    </Theme>
  );
}
