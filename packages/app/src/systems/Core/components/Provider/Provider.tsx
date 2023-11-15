'use client';

import { Theme, Toaster } from '@fuels/ui';
import { SearchProvider } from '~/systems/Home/components/SearchProvider/SearchProvider';

export function Provider({
  children,
  theme,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}) {
  return (
    <SearchProvider>
      <Theme appearance={theme} hasBackground={false}>
        {children}
        <Toaster />
      </Theme>
    </SearchProvider>
  );
}
