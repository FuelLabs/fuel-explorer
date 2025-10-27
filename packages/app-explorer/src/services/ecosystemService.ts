import { ECOSYSTEM_PROJECTS_URL } from 'app-commons';
import type { Project } from '../types/ecosystem';

export interface FetchProjectsInput {
  search?: string | null;
  tag?: string | null;
  liveOnly?: boolean;
}

export interface FetchProjectsResult {
  initialProjects: Project[];
  initialTags: string[];
}

export async function fetchProjects(
  input: FetchProjectsInput,
): Promise<FetchProjectsResult> {
  const { search, tag, liveOnly } = input;
  const tagsSet = new Set<string>();

  if (!ECOSYSTEM_PROJECTS_URL) {
    throw new Error('ECOSYSTEM_PROJECTS_URL is not set');
  }

  try {
    let filteredProjects = (await (
      await fetch(ECOSYSTEM_PROJECTS_URL)
    ).json()) as Array<Project>;

    filteredProjects = filteredProjects.filter((p) => !p.hidden);

    for (const project of filteredProjects) {
      if (!project.tags?.length) continue;

      for (const tagItem of project.tags) {
        tagsSet.add(tagItem);
      }
    }

    const initialTags = Array.from(tagsSet).sort();

    if (search) {
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.name.toLowerCase().includes(search.toLowerCase()) ||
          project.description.toLowerCase().includes(search.toLowerCase()) ||
          project.url.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (tag) {
      filteredProjects = filteredProjects.filter((project) =>
        project.tags.includes(tag),
      );
    }

    if (liveOnly) {
      filteredProjects = filteredProjects.filter(
        (project) => project.isLiveMainnet,
      );
    }

    filteredProjects.sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) {
        return a.isFeatured ? -1 : 1;
      }

      if (a.isFuelSeason !== b.isFuelSeason) {
        return a.isFuelSeason ? -1 : 1;
      }

      if (a.isLiveMainnet !== b.isLiveMainnet) {
        return a.isLiveMainnet ? -1 : 1;
      }

      if (a.isLive !== b.isLive) {
        return a.isLive ? -1 : 1;
      }

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
    });

    return {
      initialProjects: filteredProjects,
      initialTags,
    };
  } catch (error) {
    console.error('Failed to fetch ecosystem projects:', error);
    throw new Error('Failed to fetch ecosystem projects');
  }
}
