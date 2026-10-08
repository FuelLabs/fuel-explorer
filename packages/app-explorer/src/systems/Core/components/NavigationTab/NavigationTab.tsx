import type { IconProps, TabsProps } from '@fuels/ui';
import { Fragment, useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
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
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);
  const active = value ?? defaultValue;

  // The indicator is one 1px element that slides between tabs. It is scaled
  // to the tab's width, so only transform animates.
  const itemKey = items.map((item) => item.value).join('|');
  // biome-ignore lint/correctness/useExhaustiveDependencies: itemKey tracks the tab set
  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    function place(animate: boolean) {
      if (!list || !indicator) return;
      const tab = list.querySelector<HTMLElement>('[data-active="true"]');
      indicator.style.opacity = tab ? '1' : '0';
      if (!tab) return;
      // Skip the first placement and resizes, which should not travel.
      if (!animate) indicator.style.transition = 'none';
      const box = tab.getBoundingClientRect();
      const x = box.left - list.getBoundingClientRect().left;
      indicator.style.transform = `translateX(${x}px) scaleX(${box.width})`;
      if (!animate) {
        void indicator.offsetWidth;
        indicator.style.transition = '';
      }
    }

    place(placed.current);
    placed.current = true;
    let width = list.offsetWidth;
    const observer = new ResizeObserver(() => {
      if (list.offsetWidth === width) return;
      width = list.offsetWidth;
      place(false);
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [active, itemKey]);

  return (
    <nav className={classes.root({ className })}>
      <div ref={listRef} className={classes.list()}>
        <span ref={indicatorRef} aria-hidden className={classes.indicator()} />
        {items.map((item) => {
          const isActive = item.value === active;
          const tabClass = classes.tab({ active: isActive });
          const tab = (
            <span
              aria-current={isActive ? 'page' : undefined}
              aria-disabled={item.disabled || undefined}
              data-active={isActive}
              className={tabClass}
            >
              {item.label}
            </span>
          );
          if (item.disabled) {
            return (
              <div key={item.value} className={classes.cell()}>
                {tab}
              </div>
            );
          }
          return (
            <Fragment key={item.value}>
              <div className={classes.cell()}>
                {renderTab ? (
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
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
}

const styles = tv({
  slots: {
    root: [
      'mb-5 max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      'max-tablet:[mask-image:linear-gradient(to_right,#000_calc(100%-40px),transparent)]',
    ],
    list: 'relative flex min-w-max border-b border-[var(--fuel-line)]',
    cell: [
      'flex',
      '[&>a]:flex [&>a]:no-underline focus-within:z-10',
      '[&>a:focus-visible]:outline-2 [&>a:focus-visible]:-outline-offset-2 [&>a:focus-visible]:outline-[var(--fuel-primary)]',
    ],
    button:
      'm-0 flex cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fuel-primary)]',
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
