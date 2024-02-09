import '@fuels/ui/styles.css';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { Provider } from '~/systems/Core/components/Provider';
import { cx } from '~/systems/Core/utils/cx';

export const metadata: Metadata = {
  title: 'Fuel Explorer',
  description: 'Explorer of the Fastest execution layer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value: theme } = cookies().get('fuel-theme') ?? { value: 'dark' };
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cx(`${GeistSans.variable} ${GeistMono.variable}`, theme)}
      style={{ colorScheme: theme } as React.CSSProperties}
    >
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <Provider theme={theme}>
          <Layout contentClassName="[&_.rt-ContainerInner]:space-y-10">
            {children}
          </Layout>
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
