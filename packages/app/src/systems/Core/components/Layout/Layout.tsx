'use client';
import { Container, VStack } from '@fuels/ui';
import type { BaseProps } from '@fuels/ui';
import { Hero } from '~/systems/Home/components/Hero/Hero';

import { cx } from '../../utils/cx';
import { Footer } from '../Footer/Footer';
import { TopNav } from '../TopNav/TopNav';

export type LayoutProps = BaseProps<{
  hero?: boolean;
  contentClassName?: string;
}>;

export function Layout({ children, hero, contentClassName }: LayoutProps) {
  return (
    <VStack className="min-w-screen min-h-screen" gap="0">
      <TopNav />
      {hero && <Hero />}
      <Container
        size="4"
        className={cx(
          'py-8 pb-10 px-6 tablet:px-10 tablet:py-12 tablet:pb-8 laptop:py-16 laptop:pb-18',
          contentClassName,
        )}
      >
        {children}
      </Container>
      <Footer />
    </VStack>
  );
}
