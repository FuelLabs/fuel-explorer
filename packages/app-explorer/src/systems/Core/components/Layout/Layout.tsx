'use client';

import { Container, LoadingBox, VStack } from '@fuels/ui';
import { usePathname } from 'next/navigation';
const Hero = React.lazy(() => import('~/systems/Home/components/Hero/Hero'));
import { DateTime } from 'fuels';
import React, { Suspense } from 'react';
import { cx } from '../../utils/cx';
import { Footer } from '../Footer/Footer';
import { TopNav } from '../TopNav/TopNav';

export type LayoutProps = {
  children: React.ReactNode;
  contentClassName?: string;
};

export function Layout({ children, contentClassName }: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  console.log('Page loaded', DateTime.now);
  return (
    <VStack className="min-w-screen min-h-screen" gap="0">
      <TopNav />
      {isHomePage && (
        <Suspense fallback={<LoadingBox className="w-full h-[12rem]" />}>
          <Hero />
        </Suspense>
      )}
      <Container
        size="4"
        className={cx(
          'py-8 pb-10 px-6 tablet:px-10 tablet:py-8 tablet:pb-8 laptop:py-8 laptop:pb-18 min-h-[80vh]',
          contentClassName,
        )}
      >
        {children}
      </Container>
      <Footer />
    </VStack>
  );
}
