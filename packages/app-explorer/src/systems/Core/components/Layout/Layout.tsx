import { Box, VStack } from '@fuels/ui';
import { useLocation } from 'react-router-dom';
import { PageMeta } from '~/systems/Core/components/PageMeta/PageMeta';
import { TopNav } from '~/systems/Core/components/TopNav/TopNav';
import HeroSection from '~/systems/Home/components/Hero/HeroSection';
import { Footer } from '../Footer/Footer';

export type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const isHome = useLocation().pathname === '/';

  return (
    <VStack className="min-w-screen overflow-x-clip" gap="0">
      <PageMeta />
      <VStack className="min-h-screen" gap="0">
        <TopNav />
        <Box
          className={`fuel-page flex-1 px-6 pb-10 tablet:px-10 laptop:pb-18 ${isHome ? 'pt-6 tablet:pt-8 laptop:pt-12 desktop:pt-16' : ''}`}
        >
          <HeroSection />
          {children}
        </Box>
      </VStack>
      <Footer />
    </VStack>
  );
}
