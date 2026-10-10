import { useSlidingIndicator } from '@fuels/ui';
import { useId, useRef } from 'react';
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
  const hintId = useId();

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

  // The active fill is one element that slides between items.
  const modeKey = viewModes.join('|');
  const indicatorRef = useSlidingIndicator<HTMLDivElement, HTMLSpanElement>(
    groupRef,
    '[aria-pressed="true"]',
    [selected, modeKey],
  );
  const showHint = Boolean(
    isSimpleDisabled && viewModes.includes(ViewModes.Simple),
  );

  return (
    <div className="flex flex-col items-start gap-1">
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
              aria-disabled={isDisabled || undefined}
              aria-describedby={isDisabled ? hintId : undefined}
              onClick={() => {
                if (!isDisabled) handleModeChange(viewMode);
              }}
              className={classes.item({
                active: isActive,
                disabled: Boolean(isDisabled),
                first: !index,
              })}
            >
              {t(`core.view_mode.${viewMode}`)}
            </button>
          );

          return (
            <span key={viewMode} className="flex">
              {item}
            </span>
          );
        })}
      </div>
      {showHint && (
        <span id={hintId} className="fuel-caption">
          {t('core.view_mode.simple_disabled')}
        </span>
      )}
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
      'fuel-eyebrow relative z-10 h-9 grow cursor-pointer whitespace-nowrap bg-transparent px-4',
      'border-y-0 border-r-0 border-l border-solid border-[var(--fuel-line)]',
      'transition-colors duration-200 motion-reduce:transition-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--fuel-focus)]',
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
