import { useMemo } from 'react';
import { useEcosystemProjects } from '~portal/index';
import type { Project } from '~portal/systems/Ecosystem/types';

const sortProject = (a: Project, b: Project) => {
  const aPoints = a.points || Number.MAX_SAFE_INTEGER;
  const bPoints = b.points || Number.MAX_SAFE_INTEGER;
  if (aPoints !== bPoints) {
    return aPoints < bPoints ? -1 : 1;
  }

  const aOrder = a.order || Number.MAX_SAFE_INTEGER;
  const bOrder = b.order || Number.MAX_SAFE_INTEGER;
  if (aOrder !== bOrder) {
    return aOrder < bOrder ? -1 : 1;
  }

  // Alphabetical order
  return a.name.localeCompare(b.name);
};

export function useTopEcosystem() {
  const { data: ecosystemProjects } = useEcosystemProjects();
  return useMemo(() => {
    const totalProjects = ecosystemProjects?.length ?? 0;
    const activeProjects =
      ecosystemProjects?.filter((item) => item.isLiveMainnet === true).length ??
      0;
    const elementsWithImage =
      ecosystemProjects?.filter((item) => item.image) ?? [];
    const top3Projects = elementsWithImage
      .filter((element) => element.isFeatured && element.isLiveMainnet)
      .sort(sortProject)
      .slice(0, 3);
    return {
      totalProjects,
      activeProjects,
      top3Projects,
    };
  }, [ecosystemProjects]);
}
