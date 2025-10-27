import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Refetches the current route at a given interval
 * For this to work with SSR, make it ~5 after the page's revalidate value
 */
function _RefetchRouteInterval({
  interval: intervalSeconds = 5,
}: { interval: number }) {
  const _navigate = useNavigate();
  useEffect(() => {
    const timeout = setInterval(() => {
      // In React Router, we don't have a refresh method
      // This functionality would need to be implemented differently
    }, intervalSeconds * 1000);
    return () => clearInterval(timeout);
  }, [intervalSeconds]);

  return null;
}

export const RefetchRouteInterval = memo(_RefetchRouteInterval);
