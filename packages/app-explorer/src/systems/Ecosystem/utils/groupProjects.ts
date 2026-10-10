import type { Project } from '~/types/ecosystem';
import {
  ECOSYSTEM_SECTIONS,
  type EcosystemSection,
  UNCATEGORIZED_SECTION,
} from '../constants';

export type EcosystemGroup = {
  section: EcosystemSection;
  projects: Project[];
};

function matchesSearch(project: Project, search: string) {
  const term = search.toLowerCase();
  return (
    project.name.toLowerCase().includes(term) ||
    project.tagline?.toLowerCase().includes(term) ||
    project.description?.toLowerCase().includes(term) ||
    project.tags?.some((tag) => tag.toLowerCase().includes(term))
  );
}

export function sectionForProject(project: Project): EcosystemSection {
  return (
    ECOSYSTEM_SECTIONS.find(
      (section) => section.category && section.category === project.category,
    ) ?? UNCATEGORIZED_SECTION
  );
}

export function isSuiteProject(project: Project) {
  return project.collection === 'suite';
}

export function isFlagshipProject(project: Project) {
  return !!project.isFlagship;
}

export function groupProjects(
  projects: Project[],
  search: string,
): EcosystemGroup[] {
  const groups = ECOSYSTEM_SECTIONS.map((section) => ({
    section,
    projects: [] as Project[],
  }));

  for (const project of projects) {
    if (search && !matchesSearch(project, search)) continue;
    const section = sectionForProject(project);
    groups.find((group) => group.section === section)?.projects.push(project);
  }

  return groups.filter((group) => group.projects.length > 0);
}
