import { OverlayDialog, Providers } from 'app-portal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fuel Bridge',
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
