import { Container, VStack, cx } from '@fuels/ui';
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
      <VStack className="min-h-screen" gap="0">
        <TopNav />
        <HeroSection />
        <Container
          size="4"
          className={cx(
            'py-8 pb-10 px-6 tablet:px-10 tablet:py-8 tablet:pb-8 laptop:py-8 laptop:pb-18',
            contentClassName,
          )}
        >
          {children}
        </Container>
      </VStack>
      <Footer />
    </VStack>
  );
}
