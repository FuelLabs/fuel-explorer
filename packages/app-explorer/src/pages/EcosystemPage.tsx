import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { EcosystemFilterBar } from '~/systems/Ecosystem/components/EcosystemFilterBar';
import { EcosystemHero } from '~/systems/Ecosystem/components/EcosystemHero';
import { EcosystemList } from '~/systems/Ecosystem/components/EcosystemList';
import { EcosystemSection } from '~/systems/Ecosystem/components/EcosystemSection';
import { EcosystemSectionSkeleton } from '~/systems/Ecosystem/components/EcosystemSectionSkeleton';
import { EcosystemSpotlight } from '~/systems/Ecosystem/components/EcosystemSpotlight';
import { SUITE_SECTION } from '~/systems/Ecosystem/constants';
import { useEcosystemProjects } from '~/systems/Ecosystem/hooks/useEcosystemProjects';
import {
  groupProjects,
  isFlagshipProject,
  isSuiteProject,
} from '~/systems/Ecosystem/utils/groupProjects';

export function EcosystemPageWrapper() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const activeSection = searchParams.get('section') ?? undefined;
  const liveOnly = searchParams.get('liveOnly') !== 'off';
  const filtered = !!activeSection || !!search.trim();

  // Search and section filter on the client, so typing never refetches.
  const { data, isLoading, error } = useEcosystemProjects(liveOnly);

  const projects = useMemo(() => data?.initialProjects ?? [], [data]);
  const sectionsWithProjects = useMemo(
    () => groupProjects(projects, '').map((group) => group.section),
    [projects],
  );
  const groups = useMemo(() => {
    const all = groupProjects(projects, search.trim());
    return activeSection
      ? all.filter((group) => group.section.id === activeSection)
      : all;
  }, [projects, search, activeSection]);
  const spotlight = projects.find(isFlagshipProject);
  const suite = projects.filter(
    (project) => isSuiteProject(project) && project !== spotlight,
  );
  const matches = useMemo(
    () => groups.flatMap((group) => group.projects),
    [groups],
  );

  function updateParams(changes: Record<string, string | undefined>) {
    setSearchParams(
      (params) => {
        for (const [key, value] of Object.entries(changes)) {
          if (value) params.set(key, value);
          else params.delete(key);
        }
        return params;
      },
      { replace: true },
    );
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    updateParams({ search: value || undefined });
  }

  function showAll() {
    setSearch('');
    updateParams({ search: undefined, section: undefined });
  }

  return (
    <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 pb-16 tablet:gap-8 tablet:pb-20">
      <EcosystemHero />
      <div className="flex flex-col gap-10 px-4 tablet:gap-12 tablet:px-10 desktop:px-11">
        <EcosystemFilterBar
          sections={sectionsWithProjects}
          activeSection={activeSection}
          search={search}
          onSearchChange={handleSearchChange}
          onSectionChange={(section) => updateParams({ section })}
        />
        {isLoading && <EcosystemSectionSkeleton />}
        {error && (
          <p className="m-0 text-[var(--red-11)]">
            {t('ecosystem.load_error', { message: error.message })}
          </p>
        )}
        {data && filtered && (
          // Keyed by section so choosing another one re-enters the list. Typing
          // keeps the same section, so results never replay on a keystroke.
          <section key={activeSection} className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-7 text-[14px] text-[var(--fuel-element-low-em)]">
              <span>{t('ecosystem.app_count', { count: matches.length })}</span>
              <span aria-hidden>·</span>
              <button
                type="button"
                onClick={showAll}
                className="cursor-pointer border-0 bg-transparent p-0 text-[14px] text-[var(--fuel-element-mid-em)] underline underline-offset-4 hover:text-heading focus-visible:text-heading"
              >
                {t('ecosystem.show_all')}
              </button>
            </div>
            {matches.length > 0 ? (
              <EcosystemList projects={matches} stagger={!search.trim()} />
            ) : (
              <p className="m-0 fuel-appear border-y border-[var(--fuel-line)] py-16 text-center text-[14px] text-[var(--fuel-element-low-em)]">
                {t('ecosystem.no_results')}
              </p>
            )}
          </section>
        )}
        {data && !filtered && (
          <>
            {suite.length > 0 && (
              <EcosystemSection section={SUITE_SECTION} projects={suite} />
            )}
            {spotlight && <EcosystemSpotlight project={spotlight} />}
            {groups.map((group) => (
              <EcosystemSection key={group.section.id} {...group} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
