import { useQuery } from '@tanstack/react-query';
import { ECOSYSTEM_PROJECTS_URL } from 'app-commons';
import type { Project } from '~portal/systems/Ecosystem/types';

export const useEcosystemProjects = () => {
  return useQuery({
    queryKey: ['fuel', 'ecosystem', 'projects', 'provider'],
    queryFn: async () => {
      if (!ECOSYSTEM_PROJECTS_URL) {
        throw new Error('ECOSYSTEM_PROJECTS_URL is not set');
      }

      return (await (
        await fetch(ECOSYSTEM_PROJECTS_URL)
      ).json()) as Array<Project>;
    },
    placeholderData: undefined,
    staleTime: 10000,
  });
};
