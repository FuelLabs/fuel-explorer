import { IconSearch } from '@fuels/ui';
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
  const filters = [{ id: undefined, label: t('common.all') }].concat(
    sections.map((section) => ({
      id: section.id,
      label: t(`ecosystem.sections.${section.id}.eyebrow`),
    })),
  ) as { id?: string; label: string }[];

  return (
    <div className={classes.root()}>
      <label className={classes.search()}>
        <IconSearch size={16} className="shrink-0" />
        <input
          type="search"
          value={search}
          placeholder={t('common.search_projects')}
          aria-label={t('common.search_projects_label')}
          onChange={(e) => onSearchChange(e.target.value)}
          className={classes.input()}
        />
      </label>
      {filters.map((filter) => {
        const isActive = filter.id === activeSection;
        return (
          <button
            key={filter.label}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSectionChange(filter.id)}
            className={classes.chip({ active: isActive })}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

const styles = tv({
  slots: {
    root: [
      'flex overflow-x-auto',
      'border-t border-l border-[var(--fuel-line)]',
      '[&>*]:border-r [&>*]:border-b [&>*]:border-[var(--fuel-line)]',
    ],
    search: [
      'flex min-w-[180px] flex-1 items-center gap-2 px-4',
      'text-[var(--fuel-element-low-em)] bg-[var(--fuel-background)]',
      'focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--fuel-element-high-em)]',
    ],
    input:
      'h-12 w-full min-w-0 border-0 bg-transparent p-0 text-[15px] text-heading outline-none placeholder:text-[var(--fuel-element-low-em)]',
    chip: [
      'fuel-eyebrow h-12 shrink-0 cursor-pointer whitespace-nowrap px-5',
      'bg-[var(--fuel-background)] text-[var(--fuel-element-mid-em)]',
      'transition-colors duration-300 hover:bg-[var(--fuel-muted)] hover:text-heading',
      'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fuel-element-high-em)]',
    ],
  },
  variants: {
    active: {
      true: {
        chip: 'bg-[var(--fuel-secondary)] text-[var(--fuel-secondary-foreground)] hover:bg-[var(--fuel-secondary-hover)] hover:text-[var(--fuel-secondary-foreground)]',
      },
    },
  },
});
