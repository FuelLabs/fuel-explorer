import { Box, VStack } from '@fuels/ui';
import { TopNav } from '~/systems/Core/components/TopNav/TopNav';
import HeroSection from '~/systems/Home/components/Hero/HeroSection';
import { Footer } from '../Footer/Footer';

export type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <VStack className="min-w-screen overflow-x-clip" gap="0">
      <VStack className="min-h-screen" gap="0">
        <TopNav />
        <HeroSection />
        <Box className="fuel-page flex-1 px-6 py-8 pb-10 tablet:px-10 laptop:pb-18">
          {children}
        </Box>
      </VStack>
      <Footer />
    </VStack>
  );
}
