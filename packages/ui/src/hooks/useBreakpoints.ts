import { useMedia } from 'react-use';

export function useBreakpoints() {
  const isMobile = useMedia('(max-width: 576px)');
  const isTablet = useMedia('(min-width: 577px)');
  const isLaptop = useMedia('(min-width: 1024px)');
  const isDesktop = useMedia('(min-width: 1280px)');
  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
  };
}
