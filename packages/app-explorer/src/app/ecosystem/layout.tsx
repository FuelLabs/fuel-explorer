import { OverlayDialog, Providers } from 'app-portal';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { DEFAULT_WAGMI_CONFIG } from '~portal/systems/Chains';

export const metadata: Metadata = {
  title: 'Fuel Ecosystem',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(
    DEFAULT_WAGMI_CONFIG,
    headers().get('cookie'),
  );
  return (
    <Providers wagmiInitialState={initialState}>
      <OverlayDialog />
      {children}
    </Providers>
  );
}

export const dynamic = 'force-static';
