import { VStack } from '@fuels/ui';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  EcosystemTags,
  ProjectList,
} from '~portal/systems/Ecosystem/components';
import { EcosystemHeader } from '~portal/systems/Ecosystem/components/EcosystemHeader/EcosystemHeader';
import type { Project } from '~portal/systems/Ecosystem/types';

interface EcosystemProps {
  initialProjects: Project[];
  initialTags: string[];
  search?: string;
  tag?: string;
  liveOnly?: boolean;
}

export function EcosystemPage({
  initialProjects,
  initialTags,
}: EcosystemProps) {
  const [searchParams] = useSearchParams();

  // Get current params from URL for initial state
  const urlSearch = searchParams.get('search');
  const tag = searchParams.get('tag');
  const liveOnlyParam = searchParams.get('liveOnly');
  const liveOnly = liveOnlyParam === 'true';

  // Local search state for instant filtering (no URL dependency)
  const [localSearch, setLocalSearch] = useState(urlSearch || '');

  // Filter projects client-side based on local state and URL params
  const filteredProjects = useMemo(() => {
    let filtered = initialProjects;

    // Filter by search term (use local search for instant results)
    if (localSearch) {
      const searchLower = localSearch.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchLower) ||
          project.description?.toLowerCase().includes(searchLower) ||
          project.tags?.some((t) => t.toLowerCase().includes(searchLower)),
      );
    }

    // Filter by tag
    if (tag) {
      filtered = filtered.filter((project) => project.tags?.includes(tag));
    }

    // Filter by live status
    if (liveOnly) {
      filtered = filtered.filter((project) => project.isLive === true);
    }

    return filtered;
  }, [initialProjects, localSearch, tag, liveOnly]);

  const handleSearchChange = (search: string) => {
    setLocalSearch(search);
  };

  return (
    <VStack gap="6" flexGrow="1" className="pb-20">
      <EcosystemHeader
        search={urlSearch || undefined}
        liveOnly={liveOnly}
        onSearchChange={handleSearchChange}
      />
      <EcosystemTags tags={initialTags} activeTag={tag || undefined} />
      <ProjectList
        projects={filteredProjects}
        emptyText={
          localSearch?.length ? 'No results found for your search.' : undefined
        }
      />
    </VStack>
  );
}
