import { ECOSYSTEM_PROJECTS_URL } from 'app-commons';
import type { Project } from '~/types/ecosystem';
import { isCommitPinnedUrl, readCache, writeCache } from './persistentCache';

const FETCH_TIMEOUT_MS = 10_000;

export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json() as Promise<T>;
}

let projectsPromise: Promise<Project[]> | null = null;
let loadedProjects: Project[] | null = null;

export function peekEcosystemProjects() {
  return loadedProjects;
}

export function fetchEcosystemProjects(): Promise<Project[]> {
  const url = ECOSYSTEM_PROJECTS_URL;
  if (!url) return Promise.resolve([]);
  if (!projectsPromise && isCommitPinnedUrl(url)) {
    const cached = readCache<Project[]>(url)?.value;
    if (cached) {
      loadedProjects = cached;
      projectsPromise = Promise.resolve(cached);
    }
  }
  projectsPromise ??= fetchJson<Project[]>(url)
    .then((projects) => {
      loadedProjects = projects;
      if (isCommitPinnedUrl(url)) writeCache(url, projects);
      return projects;
    })
    .catch((error) => {
      projectsPromise = null;
      throw error;
    });
  return projectsPromise;
}
