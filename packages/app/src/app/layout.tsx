import '@fontsource-variable/inter/slnt.css';
import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { Provider } from '~/systems/Core/components/Provider';
import { cx } from '~/systems/Core/utils/cx';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

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
      className={cx(`${inter.variable}`, theme)}
      style={{ colorScheme: theme } as React.CSSProperties}
    >
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <Provider theme={theme}>{children}</Provider>
      </body>
    </html>
  );
}
