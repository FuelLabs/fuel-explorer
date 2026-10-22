import { Box, VStack } from '@fuels/ui';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { PageMeta } from '~/systems/Core/components/PageMeta/PageMeta';
import { TopNav } from '~/systems/Core/components/TopNav/TopNav';
import HeroSection from '~/systems/Home/components/Hero/HeroSection';
import { Footer } from '../Footer/Footer';

// Bridge and staking keep their tabs in one panel, so the whole section is
// one page.
const SINGLE_PAGE_SECTIONS = new Set(['bridge', 'staking']);

// The page is the first two path segments, so tab routes like /tx/:id/advanced
// keep the scroll position and a new page starts at the top.
function pageOf(pathname: string) {
  const segments = pathname.split('/');
  if (SINGLE_PAGE_SECTIONS.has(segments[1])) return `/${segments[1]}`;
  return segments.slice(0, 3).join('/');
}

function useScrollToTopOnPageChange(pathname: string) {
  const navigationType = useNavigationType();
  const lastPage = useRef(pageOf(pathname));
  useEffect(() => {
    const page = pageOf(pathname);
    if (page === lastPage.current) return;
    lastPage.current = page;
    // Back and forward leave the position to the browser.
    if (navigationType !== 'POP') window.scrollTo(0, 0);
  }, [pathname, navigationType]);
}

export type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  useScrollToTopOnPageChange(pathname);

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
