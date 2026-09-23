import { Box, VStack, cx } from '@fuels/ui';
import { TopNav } from '~/systems/Core/components/TopNav/TopNav';
import HeroSection from '~/systems/Home/components/Hero/HeroSection';
import { Footer } from '../Footer/Footer';

export type LayoutProps = {
  children: React.ReactNode;
  contentClassName?: string;
};

export function Layout({ children, contentClassName }: LayoutProps) {
  return (
    <VStack className="min-w-screen" gap="0">
      <VStack className="min-h-screen fuel-grid-column" gap="0">
        <TopNav />
        <HeroSection />
        <Box
          className={cx(
            'w-full flex-1 px-6 py-8 pb-10 tablet:px-10 laptop:pb-18',
            contentClassName,
          )}
        >
          {children}
        </Box>
      </VStack>
      <Footer />
    </VStack>
  );
}
