import { useMedia } from 'react-use';

export function useBreakpoints() {
  const isMobile = useMedia('(max-width: 639px)');
  const isTablet = useMedia('(min-width: 640px)');
  const isLaptop = useMedia('(min-width: 960px)');
  const isDesktop = useMedia('(min-width: 1280px)');
  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
  };
}
