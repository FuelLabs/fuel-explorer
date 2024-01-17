import { useMedia } from 'react-use';

import { breakpoints } from '../theme/breakpoints';

const mobile = `(max-width: ${breakpoints.tablet - 1}px)`;
const tablet = `(min-width: ${breakpoints.tablet}px)`;
const laptop = `(min-width: ${breakpoints.laptop}px)`;
const desktop = `(min-width: ${breakpoints.desktop}px)`;

export function useBreakpoints() {
  const isMobile = useMedia(mobile, false);
  const isTablet = useMedia(tablet, false);
  const isLaptop = useMedia(laptop, true);
  const isDesktop = useMedia(desktop, true);
  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
  };
}
