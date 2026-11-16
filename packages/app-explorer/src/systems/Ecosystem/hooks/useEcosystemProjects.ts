import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '~/services/ecosystemService';

// Keeps the feed's order, which is curated per category.
export function useEcosystemProjects(liveOnly: boolean) {
  return useQuery({
    queryKey: ['ecosystem-projects', liveOnly, 'feed-order'],
    queryFn: () => fetchProjects({ liveOnly, sort: false }),
    staleTime: 10 * 1000,
  });
}
