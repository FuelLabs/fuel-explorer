'use client';
import '@fuels/ui/styles.css';
import './error.css';
import './globals.css';

import Cookies from 'js-cookie';
import type { Metadata } from 'next';
import { ErrorPageComponent } from '~/systems/Core/components/ErrorPage/ErrorPage';
import { ThemeProvider } from '~/systems/Core/components/Theme';
import { cx } from '~/systems/Core/utils/cx';

export const metadata: Metadata = {
  title: 'Fuel Explorer',
  description: 'Explorer of The Rollup OS for Ethereum',
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/preview.png',
      },
    ],
  },
};

export default function Page() {
  const value = Cookies.get('fuel-theme') ?? 'dark';
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cx(value)}
      style={{ colorScheme: value } as React.CSSProperties}
    >
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <ThemeProvider>
          <ErrorPageComponent />
        </ThemeProvider>
      </body>
    </html>
  );
}
