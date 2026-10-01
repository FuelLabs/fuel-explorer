import { IconSearch, IconX } from '@fuels/ui';
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
  const filters = [{ id: undefined, label: t('common.all') }].concat(
    sections.map((section) => ({
      id: section.id,
      label: t(`ecosystem.sections.${section.id}.eyebrow`),
    })),
  ) as { id?: string; label: string }[];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.isContentEditable ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement;
      if (event.key !== '/' || typing) return;
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
        <div className={classes.chips()}>
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
      'ml-4 shrink-0 text-[var(--fuel-element-low-em)] transition-colors duration-200 group-focus-within:text-[var(--fuel-primary)] motion-reduce:transition-none',
    input: [
      'h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-[13px] text-heading outline-none',
      'placeholder:text-[var(--fuel-element-low-em)] [&::-webkit-search-cancel-button]:hidden',
    ],
    clear: [
      'mr-3 grid size-7 shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0',
      'text-[var(--fuel-element-low-em)] transition-colors hover:text-heading focus-visible:text-heading focus-visible:outline-none',
    ],
    nav: 'flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden tablet:flex-[2]',
    chips: 'flex min-w-max items-stretch',
    chip: [
      'fuel-eyebrow h-12 grow cursor-pointer whitespace-nowrap px-4 text-[11px] tracking-[0.08em] tablet:h-11 tablet:px-5',
      'border-y-0 border-r-0 border-l border-solid border-[var(--fuel-line)]',
      'transition-colors duration-200 motion-reduce:transition-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--fuel-primary)]',
    ],
  },
  variants: {
    active: {
      true: {
        chip: 'bg-[var(--fuel-primary)] text-[var(--fuel-primary-foreground)]',
      },
      false: {
        chip: 'bg-[var(--fuel-background)] text-[var(--fuel-element-mid-em)] hover:bg-[var(--fuel-muted)] hover:text-heading',
      },
    },
    first: {
      true: { chip: 'border-l-0' },
    },
  },
});
