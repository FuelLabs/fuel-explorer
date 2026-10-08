import {
  AnimatePresence,
  type AnimationPlaybackControls,
  animate,
  motion,
  useIsPresent,
  useReducedMotion,
} from 'framer-motion';
import {
  type ReactNode,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  UNSAFE_LocationContext,
  UNSAFE_NavigationContext,
} from 'react-router-dom';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN = [0.4, 0, 1, 1] as const;

const HEIGHT_SECONDS = 0.5;
const ENTER_SECONDS = 0.55;
const EXIT_SECONDS = 0.2;

type Motion = { direction: 1 | -1; travel: number; reduced: boolean };

// Panels travel toward the side the user moved to. With no travel (inside a
// GridFrame, whose joints are measured and would drift off a moving panel) the
// new panel is uncovered by a wipe instead.
const variants = {
  enter: ({ direction, travel, reduced }: Motion) => {
    if (reduced) return { opacity: 0 };
    if (travel) return { opacity: 0, x: travel * direction };
    return {
      opacity: 0,
      clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
    };
  },
  center: ({ travel, reduced }: Motion) => ({
    opacity: 1,
    ...(!reduced && travel ? { x: 0 } : {}),
    ...(!reduced && !travel ? { clipPath: 'inset(0 0 0 0)' } : {}),
    transition: {
      duration: reduced ? 0.15 : ENTER_SECONDS,
      ease: EASE_OUT,
      opacity: { duration: reduced ? 0.15 : ENTER_SECONDS * 0.6 },
    },
  }),
  exit: ({ direction, travel, reduced }: Motion) => ({
    opacity: 0,
    ...(!reduced && travel ? { x: -travel * direction * 0.5 } : {}),
    ...(!reduced ? { filter: 'blur(4px)' } : {}),
    transition: { duration: reduced ? 0.1 : EXIT_SECONDS, ease: EASE_IN },
  }),
};

/**
 * A panel that is leaving still re-renders when the URL changes, so a tab
 * strip or lane check inside it would flip to the new state while it fades.
 * Pin its location to what it was while it was current, and drop any
 * navigation it attempts: a lazy page that finishes loading mid-exit would
 * otherwise redirect the user back into the lane they just left.
 */
function PinLocation({ children }: { children: ReactNode }) {
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

export type TabTransitionProps = {
  /** Identifies the panel. A new value plays the transition. */
  panel: string;
  /** Position among the sibling panels. Decides which way the panels travel. */
  order: number;
  /** Pixels the panels slide. Leave at 0 to use a wipe. */
  travel?: number;
  className?: string;
  panelClassName?: string;
  children: ReactNode;
};

/**
 * Swaps the panel for the active tab. The old panel leaves the flow at once, so
 * the new one lays out at its real size, and the container height glides from
 * the old size to the new one. Content below moves with it instead of jumping.
 */
export function TabTransition({
  panel,
  order,
  travel = 0,
  className,
  panelClassName,
  children,
}: TabTransitionProps) {
  const reduced = useReducedMotion() ?? false;
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const measured = useRef<number>();
  const shown = useRef<number>();
  const gliding = useRef<AnimationPlaybackControls>();
  const mounted = useRef(false);

  const [position, setPosition] = useState({ order, direction: 1 as 1 | -1 });
  if (position.order !== order) {
    setPosition({ order, direction: order > position.order ? 1 : -1 });
  }

  const glide = (to: number) => {
    const el = outer.current;
    if (!el) return;
    gliding.current?.stop();
    const from = shown.current ?? to;
    el.style.overflow = 'clip';
    // Room for focus rings and shadows at the edges while it clips.
    el.style.overflowClipMargin = '12px';
    gliding.current = animate(from, to, {
      duration: HEIGHT_SECONDS,
      ease: EASE_OUT,
      onUpdate: (value) => {
        shown.current = value;
        el.style.height = `${value}px`;
      },
      onComplete: () => {
        gliding.current = undefined;
        shown.current = undefined;
        el.style.height = '';
        el.style.overflow = '';
        el.style.overflowClipMargin = '';
      },
    });
  };

  // Content can still resize while the glide runs (data arriving), so the
  // glide re-aims at the latest height.
  // biome-ignore lint/correctness/useExhaustiveDependencies: glide only reads refs
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      measured.current = el.offsetHeight;
      if (gliding.current) glide(el.offsetHeight);
    });
    observer.observe(el);
    measured.current = el.offsetHeight;
    return () => {
      observer.disconnect();
      gliding.current?.stop();
    };
  }, []);

  // Runs after the DOM holds the new panel and before paint, while
  // `measured` still holds the height of the old one.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs once per panel
  useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const el = inner.current;
    if (!el || reduced) return;
    const to = el.offsetHeight;
    if (!gliding.current) shown.current = measured.current;
    measured.current = to;
    if (shown.current === undefined || shown.current === to) return;
    glide(to);
  }, [panel]);

  const custom: Motion = { direction: position.direction, travel, reduced };

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="relative flow-root">
        <AnimatePresence mode="popLayout" initial={false} custom={custom}>
          <motion.div
            key={panel}
            custom={custom}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className={panelClassName}
          >
            <PinLocation>{children}</PinLocation>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
