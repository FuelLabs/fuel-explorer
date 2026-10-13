import { useIsPresent } from 'framer-motion';
import { type ReactNode, useContext, useMemo, useRef } from 'react';
import {
  UNSAFE_LocationContext,
  UNSAFE_NavigationContext,
} from 'react-router-dom';

/**
 * A panel that is leaving (inside AnimatePresence) still re-renders when the
 * URL changes, so a tab strip or a redirect inside it would act on the new
 * route while it fades. This pins the panel's location to what it was while it
 * was current, and drops any navigation it attempts once it is leaving.
 *
 * It reads react-router's UNSAFE_LocationContext and UNSAFE_NavigationContext,
 * which are not public API. Both apps pin react-router-dom 6.26.1. Re-check the
 * context shapes before bumping to 7.
 */
export function PinLocation({ children }: { children: ReactNode }) {
  const present = useIsPresent();
  const context = useContext(UNSAFE_LocationContext);
  const navigation = useContext(UNSAFE_NavigationContext);
  const pinned = useRef(context.location);
  if (present) pinned.current = context.location;
  const inert = useMemo(
    () => ({
      ...navigation,
      navigator: {
        ...navigation.navigator,
        push: () => {},
        replace: () => {},
        go: () => {},
      },
    }),
    [navigation],
  );
  return (
    <UNSAFE_NavigationContext.Provider value={present ? navigation : inert}>
      <UNSAFE_LocationContext.Provider
        value={{ ...context, location: pinned.current }}
      >
        {children}
      </UNSAFE_LocationContext.Provider>
    </UNSAFE_NavigationContext.Provider>
  );
}
