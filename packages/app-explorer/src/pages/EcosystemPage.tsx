import { VStack } from '@fuels/ui';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EcosystemFilterBar } from '~/systems/Ecosystem/components/EcosystemFilterBar';
import { EcosystemHero } from '~/systems/Ecosystem/components/EcosystemHero';
import { EcosystemSection } from '~/systems/Ecosystem/components/EcosystemSection';
import { EcosystemSectionSkeleton } from '~/systems/Ecosystem/components/EcosystemSectionSkeleton';
import { ECOSYSTEM_SECTIONS } from '~/systems/Ecosystem/constants';
import { groupProjects } from '~/systems/Ecosystem/utils/groupProjects';
import { fetchProjects } from '../services/ecosystemService';

export function EcosystemPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const activeSection = searchParams.get('section') ?? undefined;
  const liveOnly = searchParams.get('liveOnly') !== 'off';

  // Search and section filter on the client, so typing never refetches.
  const { data, isLoading, error } = useQuery({
    queryKey: ['ecosystem-projects', liveOnly],
    queryFn: () => fetchProjects({ liveOnly }),
    staleTime: 10 * 1000,
  });

  const groups = useMemo(() => {
    const all = groupProjects(data?.initialProjects ?? [], search.trim());
    return activeSection
      ? all.filter((group) => group.section.id === activeSection)
      : all;
  }, [data, search, activeSection]);

  function updateParam(key: string, value?: string) {
    setSearchParams(
      (params) => {
        if (value) params.set(key, value);
        else params.delete(key);
        return params;
      },
      { replace: true },
    );
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    updateParam('search', value || undefined);
  }

  return (
    <VStack gap="9" className="pt-10 pb-10">
      <EcosystemHero />
      <EcosystemFilterBar
        sections={ECOSYSTEM_SECTIONS}
        activeSection={activeSection}
        search={search}
        onSearchChange={handleSearchChange}
        onSectionChange={(section) => updateParam('section', section)}
      />
      {isLoading && <EcosystemSectionSkeleton />}
      {error && (
        <p className="m-0 text-[var(--red-11)]">
          Error loading projects: {error.message}
        </p>
      )}
      {data && groups.length === 0 && (
        <p className="m-0 text-[var(--fuel-element-low-em)]">
          No projects match your search.
        </p>
      )}
      {groups.map((group) => (
        <EcosystemSection key={group.section.id} {...group} />
      ))}
    </VStack>
  );
}
