import type { Project } from '~/types/ecosystem';
import { ECOSYSTEM_SECTIONS, type EcosystemSection } from '../constants';

export type EcosystemGroup = {
  section: EcosystemSection;
  projects: Project[];
};

function matchesSearch(project: Project, search: string) {
  const term = search.toLowerCase();
  return (
    project.name.toLowerCase().includes(term) ||
    project.description?.toLowerCase().includes(term) ||
    project.tags?.some((tag) => tag.toLowerCase().includes(term))
  );
}

// Each project lands in the first section whose tags it carries, so it shows once.
export function groupProjects(
  projects: Project[],
  search: string,
): EcosystemGroup[] {
  const groups = ECOSYSTEM_SECTIONS.map((section) => ({
    section,
    projects: [] as Project[],
  }));
  const fallback = groups[groups.length - 1];

  for (const project of projects) {
    if (search && !matchesSearch(project, search)) continue;
    const group =
      groups.find(({ section }) =>
        section.tags.some((tag) => project.tags?.includes(tag)),
      ) ?? fallback;
    group.projects.push(project);
  }

  return groups.filter((group) => group.projects.length > 0);
}
