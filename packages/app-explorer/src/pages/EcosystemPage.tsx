import { VStack } from '@fuels/ui';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EcosystemPage } from '~portal/systems/Ecosystem/pages/Ecosystem';
import { fetchProjects } from '../services/ecosystemService';

export function EcosystemPageWrapper() {
  const [searchParams] = useSearchParams();
  const _navigate = useNavigate();

  const search = searchParams.get('search');
  const tag = searchParams.get('tag');
  const liveOnlyParam = searchParams.get('liveOnly');
  const liveOnly = liveOnlyParam === null ? true : liveOnlyParam === 'on';

  const { data, isLoading, error } = useQuery({
    queryKey: ['ecosystem-projects', search, tag, liveOnly],
    queryFn: () => fetchProjects({ search, tag, liveOnly }),
    staleTime: 10 * 1000, // 10 seconds
  });

  if (isLoading) {
    return (
      <VStack gap="6" flexGrow="1" className="pb-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack gap="6" flexGrow="1" className="pb-20">
        <div className="text-center py-12">
          <div className="text-red-500">
            Error loading projects: {error.message}
          </div>
        </div>
      </VStack>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <EcosystemPage
      initialProjects={data.initialProjects}
      initialTags={data.initialTags}
      search={search || undefined}
      tag={tag || undefined}
      liveOnly={liveOnly}
    />
  );
}
