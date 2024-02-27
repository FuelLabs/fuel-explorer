'use client';
import { Providers } from 'app-portal/src/providers';
import { OverlayDialog } from 'app-portal/src/systems/Overlay';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <OverlayDialog />
      {children}
    </Providers>
  );
}

export const dynamic = 'force-static';
