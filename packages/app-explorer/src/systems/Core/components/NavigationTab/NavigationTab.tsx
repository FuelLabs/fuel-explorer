import type { IconProps, TabsProps } from '@fuels/ui';
import { useSlidingIndicator } from '@fuels/ui';
import {
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import type { KeyboardEvent, ReactElement, ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type TabItem = {
  /** Kept for callers; tabs are text only. */
  icon?: IconProps['icon'];
  value: string;
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

type NavigationTabsProps = TabsProps & {
  renderTab?: (children: ReactNode, item: TabItem) => ReactNode;
  items: TabItem[];
};

export function NavigationTab({
  items,
  className,
  renderTab,
  value,
  defaultValue,
  onValueChange,
}: NavigationTabsProps) {
  const classes = styles();
  const listRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = value ?? defaultValue;

  // The indicator is one 1px element that slides between tabs.
  const itemKey = items.map((item) => item.value).join('|');
  const indicatorRef = useSlidingIndicator<HTMLDivElement, HTMLSpanElement>(
    listRef,
    '[data-active="true"]',
    [active, itemKey],
  );

  // The row scrolls sideways when the tabs do not fit. Bring the active tab
  // into view, and fade the right edge only while there is more to scroll.
  // biome-ignore lint/correctness/useExhaustiveDependencies: the active tab and tab set move the scroll
  useLayoutEffect(() => {
    const root = rootRef.current;
    const tab = listRef.current?.querySelector<HTMLElement>(
      '[data-active="true"]',
    );
    if (!root || !tab) return;
    const rootBox = root.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    if (tabBox.left < rootBox.left || tabBox.right > rootBox.right) {
      root.scrollLeft +=
        tabBox.left - rootBox.left - (rootBox.width - tabBox.width) / 2;
    }
  }, [active, itemKey]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const update = () => {
      const more = root.scrollWidth - root.clientWidth - root.scrollLeft > 1;
      root.style.maskImage = more
        ? 'linear-gradient(to right, #000 calc(100% - 40px), transparent)'
        : '';
    };
    update();
    root.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(root);
    if (listRef.current) observer.observe(listRef.current);
    return () => {
      root.removeEventListener('scroll', update);
      observer.disconnect();
      root.style.maskImage = '';
    };
  }, []);

  // Arrow keys move and activate, matching the previous Radix tabs. A link
  // follows its route; a button still calls onValueChange.
  function onTabKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const key = event.key;
    if (
      key !== 'ArrowRight' &&
      key !== 'ArrowLeft' &&
      key !== 'Home' &&
      key !== 'End'
    ) {
      return;
    }
    const list = listRef.current;
    if (!list) return;
    const tabs = [
      ...list.querySelectorAll<HTMLElement>(
        '[role="tab"]:not([aria-disabled="true"])',
      ),
    ];
    const index = tabs.indexOf(event.currentTarget);
    if (index < 0 || tabs.length === 0) return;
    const next =
      key === 'Home'
        ? 0
        : key === 'End'
          ? tabs.length - 1
          : key === 'ArrowRight'
            ? (index + 1) % tabs.length
            : (index - 1 + tabs.length) % tabs.length;
    event.preventDefault();
    const tab = tabs[next];
    if (!tab || tab === event.currentTarget) return;
    tab.focus();
    tab.click();
  }

  function asTab(node: ReactNode, isActive: boolean, disabled?: boolean) {
    if (!isValidElement(node)) return node;
    return cloneElement(node as ReactElement<Record<string, unknown>>, {
      role: 'tab',
      'aria-selected': isActive,
      // A link to the current page. Buttons carry their state in aria-selected.
      'aria-current': isActive && node.type !== 'button' ? 'page' : undefined,
      'aria-disabled': disabled || undefined,
      tabIndex: disabled ? -1 : isActive ? 0 : -1,
      onKeyDown: onTabKeyDown,
    });
  }

  return (
    <div ref={rootRef} className={classes.root({ className })}>
      <div ref={listRef} role="tablist" className={classes.list()}>
        <span ref={indicatorRef} aria-hidden className={classes.indicator()} />
        {items.map((item) => {
          const isActive = item.value === active;
          const tabClass = classes.tab({ active: isActive });
          const tab = (
            <span data-active={isActive} className={tabClass}>
              {item.label}
            </span>
          );
          if (item.disabled) {
            return (
              <div key={item.value} className={classes.cell()}>
                {asTab(tab, isActive, true)}
              </div>
            );
          }
          return (
            <Fragment key={item.value}>
              <div className={classes.cell()}>
                {asTab(
                  renderTab ? (
                    renderTab(tab, item)
                  ) : (
                    <button
                      type="button"
                      className={classes.button()}
                      onClick={() => {
                        item.onClick?.();
                        onValueChange?.(item.value);
                      }}
                    >
                      {tab}
                    </button>
                  ),
                  isActive,
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

const styles = tv({
  slots: {
    root: [
      'mb-5 max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    ],
    list: 'relative flex min-w-max border-b border-[var(--fuel-line)]',
    cell: [
      'flex',
      '[&>a]:flex [&>a]:no-underline focus-within:z-10',
      '[&>a:focus-visible]:outline-2 [&>a:focus-visible]:-outline-offset-2 [&>a:focus-visible]:outline-[var(--fuel-focus)]',
    ],
    button:
      'm-0 flex cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fuel-focus)]',
    tab: [
      'fuel-label flex h-11 items-center whitespace-nowrap px-5',
      'aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-40',
      'transition-colors duration-200 motion-reduce:transition-none',
    ],
    indicator: [
      'pointer-events-none absolute bottom-[-1px] left-0 h-[2px] w-px origin-left bg-[var(--fuel-primary)] opacity-0',
      'transition-[transform,opacity] [transition-duration:300ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
    ],
  },
  variants: {
    active: {
      true: { tab: 'text-heading' },
      false: {
        tab: 'hover:bg-[var(--fuel-muted)] hover:text-heading',
      },
    },
  },
});
