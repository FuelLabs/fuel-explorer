'use client';
import { OverlayDialog, Providers } from 'app-portal';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <OverlayDialog />
      {children}
    </Providers>
  );
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
