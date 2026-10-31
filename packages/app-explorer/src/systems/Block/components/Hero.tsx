import { IconChevronRight } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Hero() {
  const { t } = useTranslation();
  return (
    <PageTitle
      title={t('block.blocks_title')}
      subtitle={
        <nav
          aria-label={t('block.breadcrumb_label')}
          className="flex items-center gap-1 text-[14px] text-[var(--fuel-element-low-em)]"
        >
          <Link
            to="/"
            className="text-[var(--fuel-element-low-em)] no-underline transition-colors duration-150 hover:text-heading motion-reduce:transition-none"
          >
            {t('block.breadcrumb_home')}
          </Link>
          <IconChevronRight size={16} aria-hidden />
          <span className="text-heading">
            {t('block.breadcrumb_all_blocks')}
          </span>
        </nav>
      }
    />
  );
}
