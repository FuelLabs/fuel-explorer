import { OverlayDialog, Providers } from 'app-portal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Blocks',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <OverlayDialog />
      {children}
    </Providers>
  );
}

export const dynamic = 'force-static';
