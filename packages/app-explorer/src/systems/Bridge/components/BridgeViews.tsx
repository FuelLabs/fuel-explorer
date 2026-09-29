import {
  AnimatePresence,
  type BezierDefinition,
  type DOMKeyframesDefinition,
  type DynamicAnimationOptions,
  frame,
  motion,
  useAnimate,
  usePresence,
  useReducedMotion,
} from 'framer-motion';
import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import {
  UNSAFE_LocationContext,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

export type BridgeView = 'form' | 'history';

type BridgeViewsProps = {
  view: BridgeView;
  form: ReactNode;
  history: ReactNode;
};

// Rows print in as the scan line passes them, so each row's delay is its
// offset down the list scaled to the sweep.
const SCAN_S = 0.52;
const SPRING = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.8,
} as const;
const EASE_OUT: BezierDefinition = [0.22, 1, 0.36, 1];
const EASE_IN: BezierDefinition = [0.4, 0, 1, 1];
const PERSPECTIVE = [900, 900];

// transformPerspective animates at runtime but is missing from v11's types.
const PRINT_IN = {
  opacity: [0, 1],
  y: [-10, 0],
  rotateX: [-68, 0],
  transformPerspective: PERSPECTIVE,
  filter: ['blur(4px)', 'blur(0px)'],
} as DOMKeyframesDefinition;

const RISE_IN: DOMKeyframesDefinition = {
  opacity: [0, 1],
  y: [14, 0],
  scale: [0.985, 1],
  filter: ['blur(6px)', 'blur(0px)'],
};

const FOLD_OUT = {
  opacity: 0,
  y: -6,
  rotateX: 48,
  transformPerspective: PERSPECTIVE,
  filter: 'blur(4px)',
} as DOMKeyframesDefinition;

const LIFT_OUT: DOMKeyframesDefinition = {
  opacity: 0,
  y: -12,
  scale: 0.97,
  filter: 'blur(6px)',
};

// A value-specific transition replaces the root one, delay included.
function enterTransition(delay: number): DynamicAnimationOptions {
  return {
    ...SPRING,
    delay,
    opacity: { duration: 0.2, ease: 'linear', delay },
    filter: { duration: 0.32, ease: EASE_OUT, delay },
  };
}

function blocksOf(view: BridgeView, root: HTMLElement): HTMLElement[] {
  if (view === 'history') {
    const rows = root.querySelectorAll<HTMLElement>('.fuel-CardListItem');
    return rows.length ? [...rows] : ([...root.children] as HTMLElement[]);
  }
  return [...(root.firstElementChild?.children ?? [])] as HTMLElement[];
}

function prepare(el: HTMLElement) {
  el.style.opacity = '0';
  el.style.transformOrigin = '50% 0%';
}

// Inline filter and transform would trap fixed-position descendants. Framer
// writes its last frame after the animation resolves, so clear after render.
function settle(el: HTMLElement) {
  frame.postRender(() => {
    el.style.removeProperty('filter');
    el.style.removeProperty('transform');
    el.style.removeProperty('transform-origin');
    el.style.removeProperty('opacity');
    el.style.removeProperty('height');
    el.style.removeProperty('margin-bottom');
    el.style.removeProperty('padding-top');
    el.style.removeProperty('padding-bottom');
    el.style.removeProperty('min-height');
    el.style.removeProperty('overflow');
  });
}

// A row that joins a list already on screen opens its own space first, so
// the rows below slide down instead of jumping. The negative margin absorbs
// the list gap until the row has height. The collapsed size is written
// synchronously: framer applies the first keyframe a frame late, and that
// frame would paint the row at full height.
function grow(el: HTMLElement) {
  const style = getComputedStyle(el);
  const height = el.offsetHeight;
  const paddingTop = Number.parseFloat(style.paddingTop) || 0;
  const paddingBottom = Number.parseFloat(style.paddingBottom) || 0;
  const gap =
    Number.parseFloat(getComputedStyle(el.parentElement ?? el).rowGap) || 0;
  el.style.overflow = 'hidden';
  el.style.minHeight = '0px';
  el.style.height = '0px';
  el.style.paddingTop = '0px';
  el.style.paddingBottom = '0px';
  el.style.marginBottom = `${-gap}px`;
  return {
    keyframes: {
      height: [0, height],
      paddingTop: [0, paddingTop],
      paddingBottom: [0, paddingBottom],
      marginBottom: [-gap, 0],
    } as DOMKeyframesDefinition,
    options: { duration: 0.32, ease: EASE_OUT },
  };
}

type PanelViewProps = HTMLAttributes<HTMLDivElement> & {
  view: BridgeView;
  animateIn: boolean;
  children: ReactNode;
};

// popLayout passes an attribute that must reach the DOM node, which is how it
// takes the outgoing view out of the flow.
const PanelView = forwardRef<HTMLDivElement, PanelViewProps>(function PanelView(
  { view, animateIn, children, ...rest },
  ref,
) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [isPresent, safeToRemove] = usePresence();
  const reduce = useReducedMotion();
  // Must stay stable. A new callback each render makes React null the ref
  // before AnimatePresence reads it, and the outgoing view never pops out
  // of the flow, so it pushes the incoming view down.
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      (scope as { current: HTMLDivElement | null }).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [scope, ref],
  );

  useLayoutEffect(() => {
    if (!animateIn) return;
    const root = scope.current;
    if (reduce) {
      animate(root, { opacity: [0, 1] }, { duration: 0.16 });
      return;
    }
    const top = root.getBoundingClientRect().top;
    const height = root.offsetHeight || 1;
    blocksOf(view, root).forEach((el, index) => {
      prepare(el);
      const offset = (el.getBoundingClientRect().top - top) / height;
      const delay =
        view === 'history' ? 0.04 + offset * SCAN_S : 0.14 + index * 0.045;
      animate(el, view === 'history' ? PRINT_IN : RISE_IN, {
        ...enterTransition(delay),
      }).then(() => settle(el));
    });
  }, []);

  // The list scrolls without a scrollbar; an edge fades only while there is
  // more to scroll in that direction.
  useEffect(() => {
    if (view !== 'history') return;
    const el = scope.current;
    const update = () => {
      el.toggleAttribute('data-fade-top', el.scrollTop > 1);
      el.toggleAttribute(
        'data-fade-bottom',
        el.scrollTop + el.clientHeight < el.scrollHeight - 1,
      );
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(el);
    const mutations = new MutationObserver(update);
    mutations.observe(el, { childList: true, subtree: true });
    return () => {
      el.removeEventListener('scroll', update);
      resize.disconnect();
      mutations.disconnect();
    };
  }, []);

  // Rows that arrive later, from a background refresh, a slow fetch or
  // Show more, print in too.
  useEffect(() => {
    if (view !== 'history' || reduce) return;
    const root = scope.current;
    const seen = new WeakSet(
      root.querySelectorAll<HTMLElement>('.fuel-CardListItem'),
    );
    const observer = new MutationObserver(() => {
      const rows = [
        ...root.querySelectorAll<HTMLElement>('.fuel-CardListItem'),
      ];
      const joinsList = rows.some((el) => seen.has(el));
      const fresh = rows.filter((el) => !seen.has(el));
      fresh.forEach((el, index) => {
        seen.add(el);
        prepare(el);
        const delay = index * 0.045;
        const opening = joinsList ? grow(el) : null;
        Promise.all([
          opening &&
            animate(el, opening.keyframes, { ...opening.options, delay }),
          animate(el, PRINT_IN, {
            ...enterTransition(delay + (opening ? 0.12 : 0)),
          }),
        ]).then(() => settle(el));
      });
    });
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPresent) return;
    const root = scope.current;
    if (reduce) {
      animate(root, { opacity: 0 }, { duration: 0.12 }).then(safeToRemove);
      return;
    }
    // Bottom first, so the view folds up into the header.
    const blocks = blocksOf(view, root).reverse();
    Promise.all([
      ...blocks.map((el, index) => {
        el.style.transformOrigin = '50% 0%';
        return animate(el, view === 'history' ? FOLD_OUT : LIFT_OUT, {
          duration: 0.2,
          ease: EASE_IN,
          delay: Math.min(index * 0.02, 0.16),
        });
      }),
      animate(root, { opacity: 0 }, { duration: 0.16, delay: 0.14 }),
    ]).then(safeToRemove);
  }, [isPresent]);

  return (
    <div
      {...rest}
      className={
        view === 'history'
          ? 'fuel-scroll-fade min-h-0 flex-1 overflow-y-auto'
          : undefined
      }
      ref={setRef}
    >
      {children}
    </div>
  );
});

export function BridgeViews({ view, form, history }: BridgeViewsProps) {
  const reduce = useReducedMotion();
  const location = useLocation();
  const navigationType = useNavigationType();
  // Each view keeps the URL it rendered with. The outgoing form reads the new
  // URL otherwise, and useBridge redirects /bridge/history back to /bridge.
  const frozenLocation = useMemo(
    () => ({ location, navigationType }),
    [location, navigationType],
  );
  const lastView = useRef(view);
  const switches = useRef(0);
  if (lastView.current !== view) {
    lastView.current = view;
    switches.current += 1;
  }
  const hasSwitched = switches.current > 0;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <AnimatePresence mode="popLayout" initial={false}>
        <PanelView key={view} view={view} animateIn={hasSwitched}>
          <UNSAFE_LocationContext.Provider value={frozenLocation}>
            {view === 'history' ? history : form}
          </UNSAFE_LocationContext.Provider>
        </PanelView>
      </AnimatePresence>
      {hasSwitched && view === 'history' && !reduce && (
        <motion.div
          key={switches.current}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-10 h-px bg-[var(--fuel-brand-600)] shadow-[0_0_10px_1px_var(--fuel-brand-600)]"
          initial={{ top: '0%', opacity: 0 }}
          animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
          transition={{
            top: { duration: SCAN_S + 0.12, ease: 'linear' },
            opacity: { duration: SCAN_S + 0.12, times: [0, 0.08, 0.82, 1] },
          }}
        >
          <div className="absolute inset-x-0 bottom-px h-8 bg-gradient-to-b from-transparent to-[color-mix(in_srgb,var(--fuel-brand-600)_14%,transparent)]" />
        </motion.div>
      )}
    </div>
  );
}
