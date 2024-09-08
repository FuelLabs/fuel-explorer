import '@fuels/ui/styles.css';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { PointsProgramEyebrow } from '~/systems/Core/components/PointsProgramEyebrow/PointsProgramEyebrow';
import { ThemeProvider } from '~/systems/Core/components/Theme';
import { SafaryScript } from '~/systems/Safary/Safary';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://app.fuel.network'),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${GeistMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <ThemeProvider>
          <PointsProgramEyebrow />
          <Layout contentClassName="[&_.rt-ContainerInner]:flex-col [&_.rt-ContainerInner]:gap-10">
            {children}
          </Layout>
          <Analytics />
        </ThemeProvider>
      </body>
      <SafaryScript />
    </html>
  );
}
