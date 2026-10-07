import { Tooltip } from '@fuels/ui';
import { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { ViewModes } from './constants';

type ViewModeProps = {
  viewModes?: ViewModes[];
  isSimpleDisabled?: boolean;
};

export function ViewMode({
  viewModes = [ViewModes.Simple, ViewModes.Advanced],
  isSimpleDisabled,
}: ViewModeProps) {
  const { t } = useTranslation();
  const { mode } = useParams<{ mode: ViewModes }>();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = styles();
  const groupRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  const handleModeChange = (newMode: string) => {
    if (newMode && newMode !== mode) {
      const currentPath = location.pathname;
      const basePath = currentPath.split('/').slice(0, -1).join('/');
      navigate(`${basePath}/${newMode}`);
    }
  };

  // Simple is disabled when it is unavailable, so a /simple route that falls
  // through to standard must select standard itself.
  const selected =
    isSimpleDisabled && mode === ViewModes.Simple ? ViewModes.Standard : mode;

  // The active fill is one element that slides between items. It is a 1px box
  // scaled to the item's width, so only transform animates.
  const modeKey = viewModes.join('|');
  // biome-ignore lint/correctness/useExhaustiveDependencies: modeKey tracks the item set
  useLayoutEffect(() => {
    const group = groupRef.current;
    const indicator = indicatorRef.current;
    if (!group || !indicator) return;

    function place(animate: boolean) {
      if (!group || !indicator) return;
      const item = group.querySelector<HTMLElement>('[aria-pressed="true"]');
      indicator.style.opacity = item ? '1' : '0';
      if (!item) return;
      // Skip the first placement and resizes, which should not travel.
      if (!animate) indicator.style.transition = 'none';
      const box = item.getBoundingClientRect();
      const x = box.left - group.getBoundingClientRect().left + item.clientLeft;
      indicator.style.transform = `translateX(${x}px) scaleX(${box.width - item.clientLeft})`;
      if (!animate) {
        void indicator.offsetWidth;
        indicator.style.transition = '';
      }
    }

    place(placed.current);
    placed.current = true;
    let width = group.offsetWidth;
    const observer = new ResizeObserver(() => {
      if (group.offsetWidth === width) return;
      width = group.offsetWidth;
      place(false);
    });
    observer.observe(group);
    return () => observer.disconnect();
  }, [selected, modeKey]);

  return (
    <div
      ref={groupRef}
      role="group"
      aria-label={t('core.view_mode.label')}
      className={classes.root()}
    >
      <span ref={indicatorRef} aria-hidden className={classes.indicator()} />
      {viewModes.map((viewMode, index) => {
        const isActive = viewMode === selected;
        const isDisabled = viewMode === ViewModes.Simple && isSimpleDisabled;
        const item = (
          <button
            key={viewMode}
            type="button"
            aria-pressed={isActive}
            disabled={isDisabled}
            onClick={() => handleModeChange(viewMode)}
            className={classes.item({
              active: isActive,
              disabled: Boolean(isDisabled),
              first: !index,
            })}
          >
            {t(`core.view_mode.${viewMode}`)}
          </button>
        );

        return isDisabled ? (
          <Tooltip key={viewMode} content={t('core.view_mode.simple_disabled')}>
            <span className="flex">{item}</span>
          </Tooltip>
        ) : (
          <span key={viewMode} className="flex">
            {item}
          </span>
        );
      })}
    </div>
  );
}

const styles = tv({
  slots: {
    root: 'relative flex shrink-0 items-stretch border border-[var(--fuel-line)] bg-[var(--fuel-background)]',
    indicator: [
      'pointer-events-none absolute top-0 left-0 h-full w-px origin-left bg-[var(--fuel-primary)] opacity-0',
      'transition-[transform,opacity] [transition-duration:300ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
    ],
    item: [
      'fuel-eyebrow relative z-10 h-9 grow cursor-pointer whitespace-nowrap bg-transparent px-4 text-[11px] tracking-[0.08em]',
      'border-y-0 border-r-0 border-l border-solid border-[var(--fuel-line)]',
      'transition-colors duration-200 motion-reduce:transition-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--fuel-primary)]',
    ],
  },
  variants: {
    active: {
      true: { item: 'text-[var(--fuel-primary-foreground)]' },
      false: {
        item: 'text-[var(--fuel-element-mid-em)] hover:bg-[var(--fuel-muted)] hover:text-heading',
      },
    },
    disabled: {
      true: { item: 'cursor-not-allowed opacity-50 hover:bg-transparent' },
    },
    first: {
      true: { item: 'border-l-0' },
    },
  },
});
