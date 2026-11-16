import { useTranslation } from 'react-i18next';
import { SUITE_SECTION } from '../constants';
import type { EcosystemGroup } from '../utils/groupProjects';
import { EcosystemList } from './EcosystemList';

export function EcosystemSection({ section, projects }: EcosystemGroup) {
  const { t } = useTranslation();
  const headingId = `ecosystem-${section.id}`;

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-5">
      <div className="fuel-rise px-7">
        {section === SUITE_SECTION && (
          <p className="fuel-eyebrow m-0 mb-1 text-[var(--fuel-element-low-em)]">
            {t('ecosystem.quick_access')}
          </p>
        )}
        <h2
          id={headingId}
          className="m-0 font-medium text-heading text-[24px] leading-[32px]"
        >
          {t(`ecosystem.sections.${section.id}.title`)}
        </h2>
      </div>
      <EcosystemList projects={projects} />
    </section>
  );
}
