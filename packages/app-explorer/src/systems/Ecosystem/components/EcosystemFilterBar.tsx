import { IconSearch, IconX, useSlidingIndicator } from '@fuels/ui';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import type { EcosystemSection } from '../constants';

type EcosystemFilterBarProps = {
  sections: EcosystemSection[];
  activeSection?: string;
  search: string;
  onSearchChange: (search: string) => void;
  onSectionChange: (section?: string) => void;
};

export function EcosystemFilterBar({
  sections,
  activeSection,
  search,
  onSearchChange,
  onSectionChange,
}: EcosystemFilterBarProps) {
  const { t } = useTranslation();
  const classes = styles();
  const searchRef = useRef<HTMLInputElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const filters = [{ id: undefined, label: t('common.all') }].concat(
    sections.map((section) => ({
      id: section.id,
      label: t(`ecosystem.sections.${section.id}.eyebrow`),
    })),
  ) as { id?: string; label: string }[];

  // The active fill is one element that slides between chips, so a change of
  // section reads as movement.
  const filterKey = filters.map((filter) => filter.label).join('|');
  const indicatorRef = useSlidingIndicator<HTMLDivElement, HTMLSpanElement>(
    chipsRef,
    '[aria-pressed="true"]',
    [activeSection, filterKey],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== '/') return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      // Leave the key alone while typing, on any control, or over an open overlay.
      if (
        target?.isContentEditable ||
        target?.closest(
          'input, textarea, select, button, a, [role="button"], [role="menuitem"], [role="combobox"]',
        )
      )
        return;
      if (
        document.querySelector(
          '[role="dialog"], [role="alertdialog"], [role="menu"], [data-radix-popper-content-wrapper]',
        )
      )
        return;
      event.preventDefault();
      searchRef.current?.focus();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className={classes.root()}>
      <label className={classes.search()}>
        <IconSearch size={16} stroke={1.75} className={classes.searchIcon()} />
        <input
          ref={searchRef}
          type="search"
          value={search}
          placeholder={t('ecosystem.search_placeholder')}
          aria-label={t('common.search_projects_label')}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== 'Escape') return;
            onSearchChange('');
            e.currentTarget.blur();
          }}
          className={classes.input()}
        />
        {search && (
          <button
            type="button"
            aria-label={t('ecosystem.clear_search')}
            onClick={() => onSearchChange('')}
            className={classes.clear()}
          >
            <IconX size={16} stroke={1.75} />
          </button>
        )}
      </label>
      <nav
        aria-label={t('ecosystem.categories_label')}
        className={classes.nav()}
      >
        <div ref={chipsRef} className={classes.chips()}>
          <span
            ref={indicatorRef}
            aria-hidden
            className={classes.indicator()}
          />
          {filters.map((filter, index) => {
            const isActive = filter.id === activeSection;
            return (
              <button
                key={filter.label}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSectionChange(filter.id)}
                className={classes.chip({ active: isActive, first: !index })}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

const styles = tv({
  slots: {
    root: 'relative flex flex-col border border-[var(--fuel-line)] bg-[var(--fuel-background)] tablet:flex-row',
    search: [
      'group relative flex h-12 shrink-0 items-center tablet:h-11 tablet:w-[300px]',
      'border-b border-[var(--fuel-line)] tablet:border-r tablet:border-b-0',
    ],
    searchIcon:
      'ml-4 shrink-0 text-[var(--fuel-element-low-em)] transition-colors duration-200 group-focus-within:text-[var(--fuel-brand-text)] motion-reduce:transition-none',
    input: [
      'h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-[16px] tablet:text-[13px] text-heading outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fuel-focus)]',
      'placeholder:text-[var(--fuel-element-low-em)] [&::-webkit-search-cancel-button]:hidden',
    ],
    clear: [
      'fuel-hit relative mr-3 grid size-7 shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0',
      'fuel-appear text-[var(--fuel-element-low-em)] transition-colors hover:text-heading focus-visible:text-heading focus-visible:outline-2 focus-visible:outline-[var(--fuel-focus)]',
    ],
    nav: 'flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden tablet:flex-[2]',
    chips: 'relative flex min-w-max items-stretch',
    indicator: [
      'pointer-events-none absolute top-0 left-0 h-full w-px origin-left bg-[var(--fuel-primary)] opacity-0',
      'transition-[transform,opacity] [transition-duration:300ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
    ],
    chip: [
      'relative z-10',
      'fuel-eyebrow h-12 grow cursor-pointer whitespace-nowrap px-4 tablet:h-11 tablet:px-5',
      'border-y-0 border-r-0 border-l border-solid border-[var(--fuel-line)]',
      'transition-colors duration-200 motion-reduce:transition-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--fuel-focus)]',
    ],
  },
  variants: {
    active: {
      true: {
        chip: 'bg-transparent text-[var(--fuel-primary-foreground)]',
      },
      false: {
        chip: 'bg-transparent text-[var(--fuel-element-mid-em)] hover:bg-[var(--fuel-muted)] hover:text-heading',
      },
    },
    first: {
      true: { chip: 'border-l-0' },
      // Chips that arrive with the data fade in.
      false: { chip: 'fuel-appear' },
    },
  },
});
